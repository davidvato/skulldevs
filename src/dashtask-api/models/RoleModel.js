import db from './Database.js';

/** MODELO: catálogo de roles SAFe (editable por el Admin desde "Equipo & Roles"). */
const col = () => db.collection('roles');

const EDITABLE = ['label', 'short', 'level', 'icon', 'color', 'responsibilities'];

export const RoleModel = {
  /** Todos los roles, ordenados por su `order` de catálogo. */
  all: () => col().all().slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  resolve: (id) => col().findById(id) || null,
  order: () => RoleModel.all().map((r) => r.id),

  /** Actualiza los campos editables de un rol (nombre, sigla, nivel, icono, color, responsabilidades). */
  update(id, patch = {}) {
    const role = col().findById(id);
    if (!role) return null;
    const next = {};
    for (const key of EDITABLE) {
      if (patch[key] === undefined) continue;
      if (key === 'responsibilities') {
        const list = Array.isArray(patch.responsibilities)
          ? patch.responsibilities
          : String(patch.responsibilities).split('\n');
        next.responsibilities = list.map((x) => String(x).trim()).filter(Boolean);
      } else if (key === 'label') {
        const label = String(patch.label).trim();
        if (!label) throw new Error('El nombre del rol es obligatorio.');
        next.label = label;
      } else {
        next[key] = String(patch[key]).trim();
      }
    }
    // Si cambian el nombre y no la sigla, refresca la sigla vacía.
    if (next.label && next.short === '') next.short = next.label;
    return col().update(id, next);
  },
};
