import db from './Database.js';
import { nextId, now } from '../utils/id.js';

/**
 * MODELO: comentarios de una tarea.
 * Conversación por tarea con menciones (@usuario) y adjuntos (archivos).
 * Los adjuntos se guardan como data-URL (base64) porque la BD vive en memoria
 * y en el despliegue serverless no hay disco donde subirlos.
 */
const col = () => db.collection('taskComments');

export const CommentModel = {
  all: () => col().all(),
  findById: (id) => col().findById(id),
  findByTask: (taskId) => col().find((c) => String(c.taskId) === String(taskId)),

  /** Comentarios que mencionan a un usuario (excluye sus propios comentarios). */
  mentionsFor: (userId) =>
    col().find(
      (c) => String(c.authorId) !== String(userId)
        && (c.mentions || []).includes(String(userId))
    ),

  create(payload) {
    const id = nextId(col().all(), 'CMT', 4);
    const doc = {
      id,
      taskId: payload.taskId || '',
      taskTitle: payload.taskTitle || '',
      authorId: payload.authorId || '',
      authorName: payload.authorName || '',
      authorRole: payload.authorRole || '',
      text: payload.text || '',
      mentions: payload.mentions || [],
      mentionNames: payload.mentionNames || [],
      attachments: payload.attachments || [],
      seenBy: [],
      edited: false,
      editedAt: '',
      createdAt: now(),
    };
    return col().insert(doc);
  },

  update(id, patch) {
    const current = col().findById(id);
    if (!current) return null;
    return col().update(id, { ...current, ...patch, edited: true, editedAt: now() });
  },

  markSeen(id, userId) {
    const current = col().findById(id);
    if (!current) return null;
    const seenBy = current.seenBy || [];
    if (seenBy.includes(String(userId))) return current;
    return col().update(id, { seenBy: [...seenBy, String(userId)] });
  },

  remove: (id) => col().remove(id),
};
