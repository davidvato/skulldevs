import { ProcedureModel } from '../models/ProcedureModel.js';

/** CONTROLADOR: Procedimientos / plantillas de checklist. */
export const ProcedureController = {
  list: (_req, res) => res.json({ procedures: ProcedureModel.all() }),

  get: (req, res) => {
    const procedure = ProcedureModel.findById(req.params.id);
    if (!procedure) return res.status(404).json({ error: 'Procedimiento no encontrado.' });
    return res.json({ procedure });
  },

  create: (req, res) => {
    try {
      const procedure = ProcedureModel.create({ ...(req.body || {}), updatedBy: req.user.name });
      return res.status(201).json({ procedure });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  update: (req, res) => {
    try {
      const procedure = ProcedureModel.update(req.params.id, { ...(req.body || {}), updatedBy: req.user.name });
      if (!procedure) return res.status(404).json({ error: 'Procedimiento no encontrado.' });
      return res.json({ procedure });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  remove: (req, res) => {
    const ok = ProcedureModel.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Procedimiento no encontrado.' });
    return res.status(204).end();
  },
};
