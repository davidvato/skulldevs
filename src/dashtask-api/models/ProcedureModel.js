import db from './Database.js';
import { nextId, now } from '../utils/id.js';
import { parseMarkdown, toMarkdown } from '../config/procedureDefaults.js';

/** MODELO: Procedimiento / plantilla de checklist (editable en markdown).
 * Los ítems se guardan estructurados; el markdown se regenera al leer/guardar. */
const col = () => db.collection('procedures');

function withMarkdown(p) {
  return { ...p, markdown: toMarkdown(p.items || []) };
}

/**
 * Normaliza los ítems conservando las claves de los que ya existían (mismo texto)
 * para no perder el estado "hecho" en las tareas vinculadas.
 */
function normalizeItems(id, items, previous = []) {
  const prevByLabel = new Map((previous || []).map((i) => [i.label, i.key]));
  return items.map((it, idx) => ({
    key: prevByLabel.get(it.label) || `p:${id}:${idx + 1}`,
    label: it.label,
    role: it.role,
    stage: it.stage,
  }));
}

export const ProcedureModel = {
  all: () => col().all().map(withMarkdown),
  findById: (id) => {
    const p = col().findById(id);
    return p ? withMarkdown(p) : null;
  },
  raw: (id) => col().findById(id),

  create(payload = {}) {
    const name = String(payload.name || '').trim();
    if (!name) throw new Error('El nombre del procedimiento es obligatorio.');
    if (col().findOne((p) => p.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(`Ya existe un procedimiento llamado "${name}".`);
    }
    const id = nextId(col().all(), 'PRC');
    const items = normalizeItems(id, parseMarkdown(payload.markdown));
    const doc = {
      id,
      name,
      description: String(payload.description || ''),
      items,
      createdAt: now(),
      updatedAt: now(),
      updatedBy: payload.updatedBy || '',
    };
    return withMarkdown(col().insert(doc));
  },

  update(id, patch = {}) {
    const p = col().findById(id);
    if (!p) return null;
    const name = patch.name !== undefined ? String(patch.name).trim() : p.name;
    if (!name) throw new Error('El nombre del procedimiento es obligatorio.');
    if (name !== p.name && col().findOne((x) => x.id !== id && x.name.toLowerCase() === name.toLowerCase())) {
      throw new Error(`Ya existe un procedimiento llamado "${name}".`);
    }
    const items = patch.markdown !== undefined
      ? normalizeItems(id, parseMarkdown(patch.markdown), p.items)
      : p.items;
    return withMarkdown(col().update(id, {
      name,
      description: patch.description !== undefined ? String(patch.description) : p.description,
      items,
      updatedAt: now(),
      updatedBy: patch.updatedBy !== undefined ? patch.updatedBy : p.updatedBy,
    }));
  },

  remove: (id) => col().remove(id),

  /** Ítems de un procedimiento listos para mezclar en el checklist de una tarea. */
  itemsFor(id) {
    const p = col().findById(id);
    return p && Array.isArray(p.items) ? p.items.map((i) => ({ ...i })) : [];
  },
};
