/**
 * SERVICE: medición de Program Increments.
 * Traduce las tareas del ART (campos `pi` + `iteration`) a la medida de
 * ejecución de cada iteración del PI: comprometido vs. completado, puntos y
 * velocidad; y agrega el voto de confianza (planificación y revisión).
 */
import { ProgramIncrementModel } from '../models/ProgramIncrementModel.js';
import { TaskModel } from '../models/TaskModel.js';
import { addDays, diffDays } from '../utils/dates.js';

/** Particiona el período del PI en sus iteraciones (equitativo, igual que el Gantt). */
export function iterationRanges(pi) {
  const iters = pi.iterations?.length ? pi.iterations : ['Iter 1'];
  const total = Math.max(1, diffDays(pi.startDate, pi.endDate));
  const chunk = Math.floor(total / iters.length);
  return iters.map((name, i) => {
    const start = addDays(pi.startDate, i * chunk);
    const end = i === iters.length - 1 ? pi.endDate : addDays(start, Math.max(0, chunk - 1));
    return { name, index: i, start, end };
  });
}

function stateFor({ start, end }, now) {
  if (now > end) return 'completed';
  if (now < start) return 'planned';
  return 'current';
}

function summarizeTasks(tasks) {
  const totalPoints = tasks.reduce((s, t) => s + (Number(t.storyPoints) || 0), 0);
  const doneTasks = tasks.filter((t) => t.status === 'release');
  const completedPoints = doneTasks.reduce((s, t) => s + (Number(t.storyPoints) || 0), 0);
  return {
    tasks: tasks.length,
    completed: doneTasks.length,
    totalPoints,
    completedPoints,
    progressPct: tasks.length ? Math.round((doneTasks.length / tasks.length) * 100) : 0,
  };
}

const brief = (t) => ({
  id: t.id,
  title: t.title,
  status: t.status,
  storyPoints: t.storyPoints ?? null,
  priority: t.priority ?? null,
  projectId: t.projectId ?? null,
});

export const ProgramIncrementService = {
  /** Lista de PIs con su medición de iteraciones y voto de confianza. */
  list() {
    const tasks = TaskModel.all();
    return ProgramIncrementModel.all()
      .sort((a, b) => String(b.startDate || '').localeCompare(String(a.startDate || '')))
      .map((pi) => ProgramIncrementService._measure(pi, tasks));
  },

  /** Detalle de un PI: iteraciones enriquecidas, métricas, voto y objetivos. */
  detail(id) {
    const pi = ProgramIncrementModel.findById(id);
    if (!pi) return null;
    return ProgramIncrementService._measure(pi, TaskModel.all(), true);
  },

  /** `full` incluye el desglose de tareas y los votos individuales. */
  _measure(pi, allTasks, full = false) {
    const now = new Date().toISOString().slice(0, 10);
    const piTasks = allTasks.filter((t) => t.pi === pi.id);
    const byIteration = new Map();
    piTasks.forEach((t) => {
      const key = t.iteration || 'Sin iteración';
      if (!byIteration.has(key)) byIteration.set(key, []);
      byIteration.get(key).push(t);
    });

    const ranges = iterationRanges(pi);
    const known = new Set(ranges.map((r) => r.name));
    // Iteraciones declaradas en el PI (con o sin tareas) + bolsas no declaradas.
    const labels = [
      ...ranges.map((r) => r.name),
      ...[...byIteration.keys()].filter((k) => !known.has(k)),
    ];

    const iterations = labels.map((name) => {
      const range = ranges.find((r) => r.name === name) || { name, start: pi.startDate, end: pi.endDate };
      const tasks = (byIteration.get(name) || []).slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
      const declared = known.has(name);
      const metrics = summarizeTasks(tasks);
      return {
        name,
        start: range.start,
        end: range.end,
        declared,
        state: declared ? stateFor(range, now) : 'unplanned',
        ...metrics,
        velocity: metrics.completedPoints,
        ...(full ? { taskList: tasks.map(brief) } : {}),
      };
    });

    const totals = summarizeTasks(piTasks);
    const withTasks = iterations.filter((i) => i.tasks > 0);
    const confidence = ProgramIncrementModel.confidence(pi.id);

    return {
      id: pi.id,
      name: pi.name,
      status: pi.status,
      startDate: pi.startDate,
      endDate: pi.endDate,
      iterationNames: pi.iterations || [],
      objectives: pi.objectives || [],
      risks: pi.risks || [],
      iterations,
      totals: {
        iterations: ranges.length,
        ...totals,
        avgVelocity: withTasks.length
          ? Math.round((withTasks.reduce((s, i) => s + i.velocity, 0) / withTasks.length) * 10) / 10
          : 0,
      },
      confidence: full
        ? confidence
        : { planning: { summary: confidence.planning.summary }, review: { summary: confidence.review.summary } },
    };
  },
};

export { summarizeTasks };
