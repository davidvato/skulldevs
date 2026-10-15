import db from './Database.js';
import { glossaryDefaults } from '../config/glossaryDefaults.js';

/** MODELO: contenido del Glosario (documento único editable por el Admin). */
const col = () => db.collection('glossary');
const ID = 'default';
const ARRAYS = ['kanban', 'stages', 'classes', 'moveRules'];

export const GlossaryModel = {
  get() {
    const doc = col().findById(ID);
    return doc || { id: ID, ...glossaryDefaults() };
  },

  /** Mezcla el contenido recibido sobre el vigente (títulos, textos y tablas). */
  update(patch = {}) {
    const current = GlossaryModel.get();
    const next = { id: ID };

    if (patch.headings && typeof patch.headings === 'object') {
      next.headings = { ...current.headings };
      Object.entries(patch.headings).forEach(([key, value]) => {
        const base = current.headings[key] || { title: '', intro: '' };
        next.headings[key] = {
          title: value?.title !== undefined ? String(value.title) : base.title,
          intro: value?.intro !== undefined ? String(value.intro) : base.intro,
        };
      });
    } else {
      next.headings = current.headings;
    }

    ARRAYS.forEach((key) => {
      next[key] = Array.isArray(patch[key]) ? patch[key] : current[key];
    });

    return col().findById(ID) ? col().update(ID, next) : col().insert(next);
  },
};
