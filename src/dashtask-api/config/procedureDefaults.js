/**
 * Procedimientos / plantillas de checklist (estilo Obsidian).
 * Una plantilla es una lista markdown de casillas; cada línea puede anotar el
 * rol dueño (`@rol`) y la etapa del flujo (`#etapa`). El texto se guarda como
 * ítems estructurados para poder mezclarse en el checklist de cada tarea.
 */

export const STAGE_IDS = ['backlog', 'in_progress', 'qa', 'uat', 'release'];
export const DEFAULT_ROLE = 'developer';
export const DEFAULT_STAGE = 'in_progress';

/** Convierte markdown (`- [ ] texto @rol #etapa`) en ítems estructurados. */
export function parseMarkdown(markdown) {
  const items = [];
  String(markdown || '')
    .split(/\r?\n/)
    .forEach((line) => {
      const m = line.match(/^\s*[-*+]\s*\[[ xX]\]\s*(.+?)\s*$/);
      if (!m) return;
      let text = m[1];

      let stage = '';
      const stageMatch = text.match(/(?:^|\s)#([a-z_]+)\s*$/i);
      if (stageMatch && STAGE_IDS.includes(stageMatch[1])) {
        stage = stageMatch[1];
        text = text.slice(0, stageMatch.index).trim();
      }

      let role = '';
      const roleMatch = text.match(/(?:^|\s)@([a-z_]+)\s*$/i);
      if (roleMatch) {
        role = roleMatch[1];
        text = text.slice(0, roleMatch.index).trim();
      }

      if (!text) return;
      items.push({ label: text, role: role || DEFAULT_ROLE, stage: stage || DEFAULT_STAGE });
    });
  return items;
}

/** Serializa ítems estructurados a markdown (omite anotaciones por defecto). */
export function toMarkdown(items = []) {
  return items
    .map((i) => {
      let line = `- [ ] ${i.label}`;
      if (i.role && i.role !== DEFAULT_ROLE) line += ` @${i.role}`;
      if (i.stage && i.stage !== DEFAULT_STAGE) line += ` #${i.stage}`;
      return line;
    })
    .join('\n');
}

/** Procedimientos de ejemplo para el seed (entorno de demo). */
export function procedureDefaults() {
  const created = '2026-01-03T09:00:00Z';
  return [
    {
      id: 'PRC-001',
      name: 'Definición de Done — historia de usuario',
      description: 'Validaciones mínimas que toda historia cumple antes de liberarse.',
      items: parseMarkdown([
        '- [ ] Criterios de aceptación escritos y validados @product_owner #backlog',
        '- [ ] Estimación en Story Points consensuada @developer #backlog',
        '- [ ] Desarrollo implementado y commiteado @developer #in_progress',
        '- [ ] Pruebas unitarias en verde @developer #in_progress',
        '- [ ] Pruebas funcionales ejecutadas en QA @product_owner #qa',
        '- [ ] Pruebas de seguridad / NFR @system_architect #qa',
        '- [ ] Aprobación de negocio (UAT) @business_owner #uat',
        '- [ ] Publicada en Release Notes @rte #release',
      ].join('\n')),
      createdAt: created,
      updatedAt: created,
      updatedBy: 'Valeria Fuentes',
    },
    {
      id: 'PRC-002',
      name: 'Alta de nuevo servicio backend',
      description: 'Procedimiento técnico para exponer un servicio nuevo.',
      items: parseMarkdown([
        '- [ ] Contrato de API y versionado definidos @system_architect #backlog',
        '- [ ] Endpoint implementado @developer #in_progress',
        '- [ ] Autenticación y autorización @developer #in_progress',
        '- [ ] Observabilidad (logs, métricas, alertas) @developer #in_progress',
        '- [ ] Pruebas de carga @developer #qa',
        '- [ ] Runbook y documentación @system_architect #release',
      ].join('\n')),
      createdAt: created,
      updatedAt: created,
      updatedBy: 'Daniela Ríos',
    },
  ];
}
