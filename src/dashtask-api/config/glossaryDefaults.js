/**
 * Contenido por defecto del Glosario (editable por el Admin).
 * La estructura se conserva (ids, tonos y roles) para que las etiquetas de
 * rol dentro del glosario sigan reflejando los cambios del catálogo de roles.
 */
export function glossaryDefaults() {
  return {
    headings: {
      intakes: {
        title: '1 · Intakes — los campos',
        intro:
          'Un intake es una solicitud que entra al sistema antes del backlog: se revisa su completitud (revisión primaria), se enriquece en el Grooming / Backlog Review con perspectivas y estimaciones por rol y, si procede, se prioriza y se compromete en un PI.',
      },
      classes: {
        title: '1b · Clases de servicio — para qué sirve cada una y por qué su color',
        intro: '',
      },
      kanban: {
        title: '2a · Tablero Kanban y Backlog normal — para qué sirve cada uno',
        intro:
          'El Backlog normal y el tablero Kanban son la misma cola, vista en dos estados: mientras la tarea está "en backlog" es trabajo priorizado y descompuesto que aún no se comprometió a un sprint; el tablero la lleva desde que el equipo la toma hasta que se libera el valor.',
      },
      phases: {
        title: '2b · Fases, para qué sirven y cómo se pasa de una a otra',
        intro:
          'Cada etapa tiene un checklist. Clic en el "✓" de cada ítem (lo marca el rol dueño) y cuando el checklist de la etapa está al 100% se habilita el avance. Todo movimiento queda en la bitácora de la tarea.',
      },
      responsibilities: {
        title: '2c · Quién es responsable de qué',
        intro:
          'Cada ítem del checklist pertenece a un rol (dueño). El Team Lead y el Tech Lead pueden marcar los ítems developer por delegación, y el Admin o un usuario con permiso global puede marcar cualquiera. El dashboard te dice qué ítems puedes cerrar ahora ("Me toca intervenir").',
      },
      businessValue: {
        title: '3 · Valor de negocio (BV) y el objetivo',
        intro: '',
      },
    },
    classes: [
      { value: 'Standard', tone: 'gray', label: 'Trabajo normal', why: 'No tiene urgencia especial por sí solo: se ordena contra los demás por WSJF. El gris simboliza el flujo estándar y neutral del equipo.' },
      { value: 'Fixed Date', tone: 'warn', label: 'Fecha comprometida', why: 'Tiene una fecha límite firme (lanzamiento, normativa, ventana de mercado). Si llega tarde, el valor se pierde. El naranja avisa "cuidado con el plazo".' },
      { value: 'Intangible', tone: 'info', label: 'Habilitador / técnico', why: 'Trabajo técnico o de arquitectura (enablers, deuda técnica) cuyo valor es indirecto y difícil de medir en dinero. El azul indica información/técnico, no entrega directa al cliente.' },
      { value: 'Expedite', tone: 'danger', label: 'Emergencia', why: 'Pase de atención de máxima prioridad: se adelanta a todo lo demás porque su retraso es crítico. El rojo marca el sentido de urgencia y de "bandeja especial".' },
    ],
    kanban: [
      { id: 'backlog', title: 'Backlog normal', wip: 'sin límite', note: 'Priorizada por WSJF y descompuesta en historias; aún no entra a un sprint.' },
      { id: 'in_progress', title: 'Work in Progress', wip: '5', note: 'El equipo la implementa. Es el "carril" donde se hace el trabajo.' },
      { id: 'qa', title: 'QA', wip: '5', note: 'Build desplegado a QA, pruebas y criterios de aceptación verificados.' },
      { id: 'uat', title: 'Staging Review / UAT', wip: '4', note: 'El negocio prueba en staging y aprueba la liberación.' },
      { id: 'release', title: 'Release', wip: 'sin límite', note: 'Se libera, se documenta en Release Notes / System Demo y se confirma el valor.' },
      { id: 'blocked', title: 'Bloqueado (excepción)', wip: 'excepción', note: 'No es una etapa del flujo: es una tarjeta detenida que vuelve a su etapa cuando se destraba.' },
    ],
    stages: [
      {
        id: 'backlog', title: 'Backlog normal', output: 'Priorizada y lista para el sprint',
        items: [
          { k: 'backlog-pm', label: 'Priorizada por WSJF en el Program Backlog', role: 'product_manager' },
          { k: 'backlog-po', label: 'Descompuesta en historias de usuario', role: 'product_owner' },
          { k: 'backlog-rte', label: 'Impacto en la capacidad del ART evaluado', role: 'rte' },
        ],
      },
      {
        id: 'in_progress', title: 'Work in Progress', output: 'Incremento implementado',
        items: [
          { k: 'wip-dev', label: 'Implementación completada y commiteada', role: 'developer' },
          { k: 'wip-tests', label: 'Pruebas unitarias en verde', role: 'developer' },
          { k: 'wip-arch', label: 'Guardrails técnicos respetados', role: 'system_architect' },
        ],
      },
      {
        id: 'qa', title: 'QA', output: 'Incremento verificado',
        items: [
          { k: 'qa-deploy', label: 'Build desplegado al ambiente de QA', role: 'developer' },
          { k: 'qa-ac', label: 'Criterios de aceptación validados', role: 'product_owner' },
          { k: 'qa-nfr', label: 'Revisión no funcional (seguridad / performance)', role: 'system_architect' },
        ],
      },
      {
        id: 'uat', title: 'Staging Review / UAT', output: 'Validación de negocio en staging',
        items: [
          { k: 'uat-po', label: 'Casos UAT ejecutados por el equipo', role: 'product_owner' },
          { k: 'uat-bo', label: 'Validación de negocio (UAT) aprobada', role: 'business_owner' },
          { k: 'uat-pm', label: 'Alcance confirmado para liberación', role: 'product_manager' },
        ],
      },
      {
        id: 'release', title: 'Release', output: 'Valor liberado y demostrado',
        items: [
          { k: 'rel-rte', label: 'Incluida en Release Notes / System Demo', role: 'rte' },
          { k: 'rel-arch', label: 'Checklist de despliegue a producción firmado', role: 'system_architect' },
          { k: 'rel-bo', label: 'Valor de negocio confirmado', role: 'business_owner' },
        ],
      },
    ],
    moveRules: [
      { title: '➡ Avanzar', text: 'Solo se puede pasar a la siguiente etapa cuando la etapa actual está 100% completada. Si falta un ítem, el sistema lo indica (error 422 con los pendientes).' },
      { title: '⬅ Retroceder (regresión)', text: 'Se permite devolver una tarea a una etapa anterior (ej. QA → WIP) para corregir. Queda registrado en la bitácora con persona y motivo.' },
      { title: '⛔ Bloquear / desbloquear', text: 'Es una excepción, no una etapa real: se pide un motivo y al desbloquear la tarjeta vuelve a la etapa en la que estaba.' },
      { title: '🚧 Límites WIP', text: 'No se puede mover una tarjeta a una columna que ya alcanzó su límite (WIP por columna). El tablero avisa "WIP excedido".' },
      { title: '👤 ¿Quién mueve la tarjeta?', text: 'Cualquier rol puede arrastrar el estado desde la tarjeta. Pero solo el rol dueño de cada ítem puede marcar el checklist, salvo delegación.' },
    ],
  };
}
