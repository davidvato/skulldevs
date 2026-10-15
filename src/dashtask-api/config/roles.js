/**
 * Catálogo de roles de la metodología SAFe.
 * Los nombres/definiciones son editables por el Admin y se guardan en la
 * colección `roles`. Este módulo expone una vista dinámica (Proxy) para que
 * cualquier `ROLES[id]` refleje siempre los valores vigentes.
 */
import { RoleModel } from '../models/RoleModel.js';
import { ROLE_DEFAULTS, ROLE_ORDER, seedRoles } from './roleDefaults.js';

export { ROLE_DEFAULTS, ROLE_ORDER, seedRoles };

const fallback = (id) => ({ id, label: id, short: id, icon: '👤', color: '#6366f1', level: '' });

/** Devuelve la definición vigente de un rol (o un fallback mínimo). */
export const getRole = (id) => RoleModel.resolve(id) || fallback(id);

/** Lista de roles vigentes. */
export const roleList = () => RoleModel.all();

/** Vista de solo lectura dinámica: `ROLES[id]` y `Object.values(ROLES)`. */
export const ROLES = new Proxy(
  {},
  {
    get: (_target, key) => (typeof key === 'string' ? RoleModel.resolve(key) || undefined : undefined),
    has: (_target, key) => (typeof key === 'string' ? Boolean(RoleModel.resolve(key)) : false),
    ownKeys: () => RoleModel.order(),
    getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
  }
);
