import db from './Database.js';
import { nextId, now } from '../utils/id.js';
import { buildChecklist, STAGE_IDS, nextStage, stageIndex, computeWsjf, priorityFromWsjf } from '../config/taskFlow.js';
import { SettingsModel } from './SettingsModel.js';

/** MODELO: Task (tarjeta del tablero Kanban / backlog) */
const col = () => db.collection('tasks');

// Columnas del Kanban (perspectiva Project Manager). `blocked` es una excepción.
export const KANBAN_COLUMNS = [
  { id: 'backlog', title: 'Backlog normal', wip: null },
  { id: 'in_progress', title: 'Work in Progress', wip: 5 },
  { id: 'qa', title: 'QA', wip: 5 },
  { id: 'uat', title: 'Staging Review / UAT', wip: 4 },
  { id: 'release', title: 'Release', wip: null },
  { id: 'done', title: 'Done', wip: null },
  { id: 'blocked', title: 'Bloqueado (excepción)', wip: null, exception: true },
];

function withChecklist(status, doneKeys) {
  return buildChecklist(status, doneKeys);
}

/**
 * Recalcula WSJF y la prioridad derivada a partir de las entradas de Costo del
 * retraso (wsjfInput) y del Tamaño (Story Points). Si la tarea aún no tiene
 * entradas de WSJF, mantiene el wsjf guardado y solo re-deriva la prioridad.
 */
function deriveFromWsjf(task) {
  const input = task.wsjfInput;
  const hasInput = input && ['userValue', 'timeValue', 'riskValue']
    .some((k) => input[k] != null && input[k] !== '');
  if (hasInput) {
    const wsjf = computeWsjf({
      userValue: input.userValue,
      timeValue: input.timeValue,
      riskValue: input.riskValue,
      jobSize: task.storyPoints,
    });
    return { wsjf, priority: priorityFromWsjf(wsjf) };
  }
  if (task.wsjf != null && task.wsjf !== '') {
    const priority = priorityFromWsjf(task.wsjf);
    return priority ? { priority } : {};
  }
  return {};
}

export const TaskModel = {
  all: () => col().all(),
  findById: (id) => col().findById(id),
  findByStatus: (status) => col().find((x) => x.status === status),
  findByAssignee: (assigneeId) => col().find((x) => x.assigneeId === assigneeId),
  findByProject: (projectId) => col().find((x) => x.projectId === projectId),
  findByEpic: (epicId) => col().find((x) => x.epicId === epicId),
  findBySprint: (sprintId) => col().find((x) => x.sprintId === sprintId),

  create: (payload) => {
    const id = nextId(col().all(), 'TSK');
    const status = payload.status || 'backlog';
    const storyPoints = payload.storyPoints ?? null;
    const wsjfInput = payload.wsjfInput || null;
    let wsjf = payload.wsjf ?? null;
    let priority = payload.priority || 'Media';
    if (wsjfInput) {
      wsjf = computeWsjf({ ...wsjfInput, jobSize: storyPoints });
      priority = priorityFromWsjf(wsjf) || priority;
    } else if (wsjf != null) {
      priority = priorityFromWsjf(wsjf) || priority;
    }
    const doc = {
      id,
      title: payload.title || 'Sin título',
      description: payload.description || '',
      type: payload.type || 'Story',
      status,
      class: payload.class || 'Standard',
      priority,
      wsjf,
      wsjfInput,
      storyPoints,
      assigneeId: payload.assigneeId || '',
      assignee: payload.assignee || '',
      reporterId: payload.reporterId || '',
      team: payload.team || 'Nébula',
      valueStream: payload.valueStream || 'Cliente Digital',
      projectId: payload.projectId || null,
      epicId: payload.epicId || null,
      sprintId: payload.sprintId || null,
      pi: payload.pi || '',
      iteration: payload.iteration || '',
      level: payload.level || 'team',
      ac: payload.ac || [],
      userStories: payload.userStories || [],
      checklist: payload.checklist || withChecklist(status),
      dependencies: payload.dependencies || [],
      labels: payload.labels || [],
      blockedReason: payload.blockedReason || '',
      previousStatus: '',
      auditLog: payload.auditLog || [],
      createdAt: now(),
      updatedAt: now(),
      dueDate: payload.dueDate || '',
    };
    return col().insert(doc);
  },

  update: (id, patch) => {
    const current = col().findById(id);
    if (!current) return null;
    const merged = { ...current, ...patch };
    const derived = deriveFromWsjf(merged);
    return col().update(id, { ...patch, ...derived, updatedAt: now() });
  },
  move: (id, status, extra = {}) => col().update(id, { status, ...extra, updatedAt: now() }),
  remove: (id) => col().remove(id),

  /** Marca/desmarca un ítem del checklist de una tarea y registra la bitácora. */
  setChecklistItem: (id, key, { done, note, attachment, byRole, byName }) => {
    const task = col().findById(id);
    if (!task) return null;
    const currentItem = (task.checklist || []).find((item) => item.key === key);
    if (!currentItem) return null;
    const nextDone = done !== undefined ? done : !currentItem.done;
    const checklist = (task.checklist || []).map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        done: nextDone,
        doneBy: !nextDone ? '' : `${byName || ''}${byRole ? ` (${byRole})` : ''}`.trim(),
        doneAt: !nextDone ? '' : now(),
        note: note !== undefined ? note : item.note,
        attachment: attachment !== undefined ? attachment : item.attachment,
      };
    });
    const auditLog = TaskModel._auditEntry(task, {
      type: 'checklist',
      key,
      stage: currentItem.stage,
      action: nextDone ? 'done' : 'reopened',
      actor: `${byName || ''}${byRole ? ` (${byRole})` : ''}`.trim(),
      role: byRole || currentItem.role,
      note: note !== undefined ? String(note) : currentItem.note,
    });
    return col().update(id, { checklist, auditLog, updatedAt: now() });
  },

  /** Agrega una entrada a la bitácora de la tarea (fecha/hora, persona y detalle). */
  audit: (id, entry) => {
    const task = col().findById(id);
    if (!task) return null;
    const auditLog = TaskModel._auditEntry(task, entry);
    return col().update(id, { auditLog, updatedAt: now() });
  },

  _auditEntry: (task, entry) => {
    const prev = task.auditLog || [];
    let n = prev.reduce((acc, e) => {
      const m = String(e.id || '').match(/L(\d+)$/);
      return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
    }, 0);
    n += 1;
    const final = {
      id: `L${String(n).padStart(3, '0')}`,
      at: now(),
      type: entry.type || 'note',
      key: entry.key || '',
      stage: entry.stage || '',
      action: entry.action || '',
      actor: entry.actor || '',
      role: entry.role || '',
      from: entry.from || '',
      to: entry.to || '',
      note: entry.note || '',
    };
    return [...prev, final];
  },

  /** ¿La etapa actual de la tarea está completa? (`done` no tiene checklist: siempre completa) */
  stageCompletion: (task) => {
    const items = (task.checklist || []).filter((i) => i.stage === task.status);
    const done = items.filter((i) => i.done).length;
    const complete = task.status === 'done' || (items.length > 0 && done === items.length);
    return { total: items.length, done, complete, items };
  },

  board: () => {
    const all = col().all();
    const wipLimits = SettingsModel.getWipLimits();
    return KANBAN_COLUMNS.map((c) => {
      const wip = c.wip == null ? null : (wipLimits[c.id] ?? c.wip);
      const count = all.filter((t) => t.status === c.id).length;
      return {
        ...c,
        wip,
        count,
        items: all.filter((t) => t.status === c.id),
        overWip: wip != null && count > wip,
      };
    });
  },

  /** Límite WIP efectivo (configurable) de una columna; null = sin límite. */
  wipFor: (columnId) => {
    const column = KANBAN_COLUMNS.find((c) => c.id === columnId);
    if (!column || column.wip == null) return null;
    const limits = SettingsModel.getWipLimits();
    return limits[columnId] ?? column.wip;
  },
};

/** Utilidades de flujo reexportadas para los controladores. */
export { STAGE_IDS, nextStage, stageIndex };
