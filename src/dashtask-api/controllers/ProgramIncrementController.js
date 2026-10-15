import { ProgramIncrementModel } from '../models/ProgramIncrementModel.js';
import { ProgramIncrementService } from '../services/ProgramIncrementService.js';

/** CONTROLADOR: Program Increments (medición de iteraciones + voto de confianza). */
export const ProgramIncrementController = {
  list(req, res) {
    return res.json({ programIncrements: ProgramIncrementService.list() });
  },

  get(req, res) {
    const pi = ProgramIncrementService.detail(req.params.id);
    if (!pi) return res.status(404).json({ error: 'Program Increment no encontrado.' });
    return res.json(pi);
  },

  /** Registra (o reemplaza) el voto de confianza del usuario para una fase. */
  vote(req, res) {
    const { phase = 'planning', value, comment = '' } = req.body || {};
    const pi = ProgramIncrementModel.findById(req.params.id);
    if (!pi) return res.status(404).json({ error: 'Program Increment no encontrado.' });
    const num = Number(value);
    if (!Number.isFinite(num) || num < 1 || num > 5) {
      return res.status(400).json({ error: 'El voto debe ser un valor entre 1 y 5.' });
    }
    ProgramIncrementModel.castVote(pi.id, {
      phase,
      userId: req.user.id,
      userName: req.user.name,
      role: req.user.role,
      value: num,
      comment,
    });
    return res.json(ProgramIncrementService.detail(pi.id));
  },
};
