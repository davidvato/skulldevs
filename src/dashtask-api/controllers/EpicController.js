import { EpicModel } from '../models/EpicModel.js';
import { ProjectModel } from '../models/ProjectModel.js';
import { epicDetail } from '../services/HierarchyService.js';
import { nextId } from '../utils/id.js';

/** CONTROLADOR: Épicas */
export const EpicController = {
  list: (req, res) => {
    let epics = EpicModel.all();
    if (req.query.projectId) epics = epics.filter((e) => e.projectId === req.query.projectId);
    return res.json({ epics });
  },

  get: (req, res) => {
    const epic = epicDetail(req.params.id);
    if (!epic) return res.status(404).json({ error: 'Épica no encontrada.' });
    return res.json({ epic });
  },

  /**
   * Crea una épica a partir de un intake autorizado del backlog del PI:
   * queda ligada al proyecto y al intake, lista para que el equipo haga el
   * desglose en tareas e historias de usuario.
   */
  create: (req, res) => {
    const payload = req.body || {};
    const name = String(payload.name || payload.title || '').trim();
    if (!name) return res.status(400).json({ error: 'El nombre de la épica es obligatorio.' });
    const project = ProjectModel.findById(payload.projectId);
    if (!project) return res.status(400).json({ error: 'El proyecto indicado no existe (projectId obligatorio).' });

    const epic = EpicModel.create({
      id: nextId(EpicModel.all(), 'EPC'),
      projectId: project.id,
      name,
      description: payload.description || '',
      owner: payload.owner || project.productManager || '',
      ownerRole: payload.ownerRole || 'epic_owner',
      status: payload.status || 'Analyzing',
      businessValue: payload.businessValue ?? 7,
      wsjf: payload.wsjf ?? null,
      intakeId: payload.intakeId || '',
      pi: payload.pi || '',
      valueStream: payload.valueStream || project.valueStream || '',
      acceptanceCriteria: payload.acceptanceCriteria || [],
      labels: payload.labels || [],
      leanCanvas: payload.leanCanvas || {},
      createdAt: new Date().toISOString(),
    });
    return res.status(201).json({ epic });
  },
};
