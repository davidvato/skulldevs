import { GlossaryModel } from '../models/GlossaryModel.js';

/** CONTROLADOR: Glosario (lectura para todos; edición solo Admin). */
export const GlossaryController = {
  get: (_req, res) => res.json({ glossary: GlossaryModel.get() }),

  update: (req, res) => {
    try {
      const glossary = GlossaryModel.update(req.body || {});
      return res.json({ glossary });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
};
