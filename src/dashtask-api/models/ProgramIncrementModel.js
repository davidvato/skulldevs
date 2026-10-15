import db from './Database.js';

/** MODELO: Program Increment (PI) */
const col = () => db.collection('programIncrements');
const votesCol = () => db.collection('confidenceVotes');

/** Fases del voto de confianza (SAFe): en la planificación y en la revisión/I&A. */
export const CONFIDENCE_PHASES = ['planning', 'review'];

const nextVoteId = () => `CV-${String(votesCol().all().length + 1).padStart(4, '0')}`;

const clampVote = (value) => Math.max(1, Math.min(5, Math.round(Number(value) || 0)));

/** Resumen (n, mín, máx, promedio) de un conjunto de votos. */
export function summarizeVotes(votes = []) {
  if (!votes.length) return { count: 0, min: null, max: null, avg: null };
  const values = votes.map((v) => Number(v.value));
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return { count: values.length, min: Math.min(...values), max: Math.max(...values), avg: Math.round(avg * 10) / 10 };
}

export const ProgramIncrementModel = {
  all: () => col().all(),
  current: () => col().findOne((pi) => pi.status === 'In Progress') || col().all()[0] || null,
  findById: (id) => col().findById(id),
  update: (id, patch) => col().update(id, patch),

  /** Votos de confianza de un PI (opcionalmente filtrados por fase). */
  votes: (piId, phase = null) => votesCol().all()
    .filter((v) => v.piId === piId && (!phase || v.phase === phase))
    .sort((a, b) => String(a.at).localeCompare(String(b.at))),

  /** Resumen por fase (planificación y revisión) + listado de votos. */
  confidence: (piId) => {
    const byPhase = (phase) => ProgramIncrementModel.votes(piId, phase);
    const planning = byPhase('planning');
    const review = byPhase('review');
    return {
      planning: { summary: summarizeVotes(planning), votes: planning },
      review: { summary: summarizeVotes(review), votes: review },
    };
  },

  /**
   * Registra (o actualiza) el "fist of five" de una persona para una fase.
   * Mantiene sincronizado el KPI histórico `confidenceVote` del PI con la
   * fase de planificación (que es la que alimenta el dashboard).
   */
  castVote: (piId, { phase = 'planning', userId, userName = '', role = '', value, comment = '' }) => {
    const payload = {
      piId,
      phase: CONFIDENCE_PHASES.includes(phase) ? phase : 'planning',
      userId,
      userName,
      role,
      value: clampVote(value),
      comment: String(comment || '').slice(0, 280),
      at: new Date().toISOString(),
    };
    const existing = votesCol().find((v) => v.piId === piId && v.phase === payload.phase && v.userId === userId)[0];
    const vote = existing ? votesCol().update(existing.id, payload) : votesCol().insert({ id: nextVoteId(), ...payload });

    if (payload.phase === 'planning') {
      const s = summarizeVotes(ProgramIncrementModel.votes(piId, 'planning'));
      col().update(piId, { confidenceVote: { min: s.min, max: s.max, avg: s.avg } });
    }
    return vote;
  },
};
