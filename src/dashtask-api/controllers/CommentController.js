import { CommentModel } from '../models/CommentModel.js';
import { TaskModel } from '../models/TaskModel.js';
import { UserModel } from '../models/UserModel.js';
import { now } from '../utils/id.js';

/** CONTROLADOR: comentarios de tarea (con menciones y adjuntos). */

const MAX_TEXT = 4000;
const MAX_FILES = 5;
// Límites en longitud de la data-URL (base64 influye ~33% el peso real):
// ~1 MB por archivo y ~2.4 MB por comentario, por debajo del límite del runtime.
const MAX_FILE_DATA = 1_400_000;
const MAX_TOTAL_DATA = 3_200_000;
const DATA_URL_RE = /^data:([^;,]+);base64,/;

// Tipos que se pueden adjuntar (imágenes y documentos de trabajo).
const ALLOWED_MIME = new Set([
  'application/pdf', 'application/json', 'application/zip',
  'application/x-zip-compressed', 'application/octet-stream',
  'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/csv', 'text/markdown',
]);

function typeAllowed(mime) {
  const m = String(mime || '').toLowerCase();
  return m.startsWith('image/') || ALLOWED_MIME.has(m);
}

/** Bytes aproximados de una data-URL base64. */
function b64Bytes(dataUrl) {
  const idx = dataUrl.indexOf(',');
  if (idx < 0) return 0;
  const b64 = dataUrl.slice(idx + 1);
  const pad = b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((b64.length * 3) / 4) - pad);
}

/**
 * Detecta las menciones @Nombre Completo en el texto, devolviendo id y nombre.
 * Los spans se resuelven de forma no solapada (el más a la izquierda gana y,
 * a igual posición, gana el más largo) para que "@Ana" no capture "@Ana García".
 */
function extractMentions(text, users) {
  const lower = String(text || '').toLowerCase();
  if (!lower.includes('@')) return { ids: [], names: [] };
  const hits = [];
  for (const u of users || []) {
    const name = String(u?.name || '').trim();
    if (!name) continue;
    const handle = `@${name}`.toLowerCase();
    let from = 0;
    let at = lower.indexOf(handle, from);
    while (at !== -1) {
      const prev = at === 0 ? '' : lower[at - 1];
      if (!/[a-z0-9]/.test(prev)) hits.push({ start: at, end: at + handle.length, id: u.id, name });
      from = at + handle.length;
      at = lower.indexOf(handle, from);
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const ids = [];
  const names = [];
  const seen = new Set();
  let cursor = -1;
  for (const h of hits) {
    if (h.start < cursor) continue;
    cursor = h.end;
    if (seen.has(h.id)) continue;
    seen.add(h.id);
    ids.push(h.id);
    names.push(h.name);
  }
  return { ids, names };
}

function sanitizeAttachments(raw) {
  if (raw == null) return { ok: true, value: [] };
  if (!Array.isArray(raw)) return { ok: false, error: 'Adjuntos inválidos.' };
  if (raw.length > MAX_FILES) return { ok: false, error: `Máximo ${MAX_FILES} archivos por comentario.` };
  const out = [];
  let total = 0;
  for (const item of raw) {
    const name = String(item?.name || 'archivo').slice(0, 160);
    const data = String(item?.data || '');
    const match = DATA_URL_RE.exec(data);
    if (!match) return { ok: false, error: `Adjunto inválido: ${name}.` };
    if (!typeAllowed(match[1])) return { ok: false, error: `Tipo de archivo no permitido: ${match[1]}.` };
    if (data.length > MAX_FILE_DATA) {
      return { ok: false, error: `"${name}" supera el límite de ~1 MB por archivo.` };
    }
    total += data.length;
    if (total > MAX_TOTAL_DATA) {
      return { ok: false, error: 'Los adjuntos superan el límite de ~2.4 MB en total por comentario.' };
    }
    out.push({
      name,
      size: Number(item?.size) > 0 ? Number(item.size) : b64Bytes(data),
      type: match[1],
      data,
    });
  }
  return { ok: true, value: out };
}

function canModify(comment, user) {
  return String(comment.authorId) === String(user.id) || user.role === 'admin';
}

/** Enriquece un comentario con el título vigente de su tarea. */
function withTask(comment) {
  const task = TaskModel.findById(comment.taskId);
  return { ...comment, taskTitle: task ? task.title : comment.taskTitle, taskExists: !!task };
}

export const CommentController = {
  /** Comentarios de una tarea (orden cronológico). */
  list: (req, res) => {
    const task = TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });
    const comments = CommentModel.findByTask(task.id)
      .slice()
      .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
    return res.json({ comments, total: comments.length });
  },

  /** Publica un comentario con menciones y adjuntos. */
  create: (req, res) => {
    const task = TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });

    const text = String(req.body?.text || '').trim().slice(0, MAX_TEXT);
    const files = sanitizeAttachments(req.body?.attachments);
    if (!files.ok) return res.status(400).json({ error: files.error });
    if (!text && files.value.length === 0) {
      return res.status(400).json({ error: 'Escribe un comentario o adjunta al menos un archivo.' });
    }

    const { ids, names } = extractMentions(text, UserModel.all());
    const doc = CommentModel.create({
      taskId: task.id,
      taskTitle: task.title,
      authorId: req.user.id,
      authorName: req.user.name,
      authorRole: req.user.role,
      text,
      mentions: ids,
      mentionNames: names,
      attachments: files.value,
    });
    return res.status(201).json({ comment: doc });
  },

  /** Edita un comentario propio (o cualquiera si eres Admin). */
  update: (req, res) => {
    const comment = CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado.' });
    if (!canModify(comment, req.user)) {
      return res.status(403).json({ error: 'Solo el autor (o el Admin) puede editar este comentario.' });
    }

    const patch = {};
    if (typeof req.body?.text === 'string') {
      patch.text = String(req.body.text).trim().slice(0, MAX_TEXT);
      const { ids, names } = extractMentions(patch.text, UserModel.all());
      patch.mentions = ids;
      patch.mentionNames = names;
    }
    if (req.body?.attachments !== undefined) {
      const files = sanitizeAttachments(req.body.attachments);
      if (!files.ok) return res.status(400).json({ error: files.error });
      patch.attachments = files.value;
    }
    if (!patch.text && !patch.attachments?.length) {
      return res.status(400).json({ error: 'Un comentario no puede quedar vacío.' });
    }

    const updated = CommentModel.update(comment.id, patch);
    return res.json({ comment: updated });
  },

  /** Elimina un comentario propio (o cualquiera si eres Admin). */
  remove: (req, res) => {
    const comment = CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado.' });
    if (!canModify(comment, req.user)) {
      return res.status(403).json({ error: 'Solo el autor (o el Admin) puede eliminar este comentario.' });
    }
    CommentModel.remove(comment.id);
    return res.status(204).end();
  },

  /** Menciones recibidas por este usuario, con estado de lectura. */
  mentions: (req, res) => {
    const list = CommentModel.mentionsFor(req.user.id)
      .map(withTask)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .map((c) => ({ ...c, unread: !(c.seenBy || []).includes(String(req.user.id)) }));
    return res.json({ mentions: list, unread: list.filter((c) => c.unread).length });
  },

  /** Marca todas las menciones recibidas como leídas. */
  markRead: (req, res) => {
    const list = CommentModel.mentionsFor(req.user.id);
    list.forEach((c) => CommentModel.markSeen(c.id, req.user.id));
    return res.json({ marked: list.length, at: now() });
  },
};
