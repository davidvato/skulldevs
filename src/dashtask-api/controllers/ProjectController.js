import { ProjectModel } from '../models/ProjectModel.js';
import { buildTree, projectDetail } from '../services/HierarchyService.js';
import { nextId } from '../utils/id.js';

/** CONTROLADOR: Proyectos (nivel portafolio) */
export const ProjectController = {
  /** Lista plana de proyectos con m�tricas. */
  list: (_req, res) => {
    const { projects, unassigned } = buildTree();
    return res.json({
      projects: projects.map(summarize),
      unassignedCount: unassigned.length,
    });
  },

  /** �?rbol completo Proyecto ��� �?pica ��� Tarea. */
  tree: (_req, res) => res.json(buildTree()),

  get: (req, res) => {
    const project = projectDetail(req.params.id);
    if (!project) return res.status(404).json({ error: 'Proyecto no encontrado.' });
    return res.json({ project });
  },

  /**
   * Crea un proyecto del portafolio para alojar �?picas (p. ej. desde un intake
   * del backlog del PI que todav�a no tiene proyecto).
   */
  create: (req, res) => {
    const payload = req.body || {};
    const name = String(payload.name || '').trim();
    if (!name) return res.status(400).json({ error: 'El nombre del proyecto es obligatorio.' });

    const code = String(payload.code || '').trim().toUpperCase() || deriveCode(name);
    const project = ProjectModel.create({
      id: nextId(ProjectModel.all(), 'PRJ'),
      name,
      code,
      status: payload.status || 'In Progress',
      valueStream: String(payload.valueStream || '').trim(),
      owner: payload.owner || '',
      ownerRole: payload.ownerRole || 'business_owner',
      productManager: payload.productManager || '',
      productManagerId: payload.productManagerId || '',
      description: payload.description || '',
      probability: payload.probality || payload.probability || 'Media',
      startDate: payload.startDate || '',
      targetDate: payload.targetDate || '',
      sprintConfig: payload.sprintConfig || { cadence: 'biweekly', startDay: 3, spPerDay: 1 },
      createdAt: new Date().toISOString(),
    });
    return res.status(201).json({ project });
  },
};

/** C�digo corto del proyecto: iniciales de las palabras (p. ej. "Portal Nuevo" => PN). */
function deriveCode(name) {
  const words = String(name).replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return 'PRJ';
  const initials = words.map((w) => w[0]).join('').slice(0, 4).toUpperCase();
  return initials || 'PRJ';
}

function summarize(p) {
  const { epics, orphanTasks, progress, ...rest } = p;
  return { ...rest, epicCount: epics.length, progress };
}
