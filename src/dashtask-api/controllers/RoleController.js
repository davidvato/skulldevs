import { RoleModel } from '../models/RoleModel.js';

/** CONTROLADOR: catálogo de roles (editable por el Admin). */
export const RoleController = {
  list: (_req, res) => res.json({ roles: RoleModel.all() }),

  update: (req, res) => {
    try {
      const role = RoleModel.update(req.params.id, req.body || {});
      if (!role) return res.status(404).json({ error: 'Rol no encontrado.' });
      return res.json({ role });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
};
