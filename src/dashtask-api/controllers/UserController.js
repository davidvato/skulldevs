import { UserModel } from '../models/UserModel.js';
import { RoleModel } from '../models/RoleModel.js';
import { getRole, roleList } from '../config/roles.js';
import { nextId } from '../utils/id.js';
import { DEMO_PASSWORD } from '../config/paths.js';

const initials = (name = '') => name
  .split(' ')
  .map((w) => w[0])
  .filter(Boolean)
  .slice(0, 2)
  .join('')
  .toUpperCase();

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function requireRole(role) {
  if (!role || !RoleModel.resolve(role)) throw new Error('Rol inválido.');
}

/** CONTROLADOR: Usuario */
export const UserController = {
  list: (req, res) => {
    let users = UserModel.all();
    const { role, team } = req.query;
    if (role) users = users.filter((u) => u.role === role);
    if (team) users = users.filter((u) => u.team === team);
    return res.json({ users });
  },

  get: (req, res) => {
    const user = UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    return res.json({ user: { ...user, roleMeta: getRole(user.role) } });
  },

  roles: (_req, res) => res.json({ roles: roleList() }),

  /** Alta de usuario (solo Admin). Por defecto usa la contraseña demo. */
  create: (req, res) => {
    try {
      const { name, email, role, title = '', team = '', password } = req.body || {};
      const cleanName = String(name || '').trim();
      if (!cleanName) throw new Error('El nombre es obligatorio.');
      const mail = String(email || '').trim().toLowerCase();
      if (!EMAIL_RE.test(mail)) throw new Error('Email inválido.');
      if (UserModel.findByEmail(mail)) throw new Error('Ya existe un usuario con ese email.');
      requireRole(role);

      const created = UserModel.create({
        id: nextId(UserModel.raw(), 'USR'),
        name: cleanName,
        email: mail,
        password: password ? String(password) : DEMO_PASSWORD,
        role,
        title: String(req.body.title || '').trim(),
        team: String(team || '').trim(),
        valueStream: '',
        avatar: initials(name),
        active: true,
        createdAt: new Date().toISOString(),
      });
      return res.status(201).json({ user: { ...create_sanitize(created), roleMeta: getRole(created.role) } });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  update: (req, res) => {
    try {
      const target = UserModel.findById(req.params.id);
      if (!target) return res.status(404).json({ error: 'Usuario no encontrado.' });
      const { name, email, role, title, team, password, active } = req.body || {};
      const patch = {};
      if (name !== undefined) {
        const v = String(name).trim();
        if (!v) throw new Error('El nombre es obligatorio.');
        patch.name = v;
        patch.avatar = initials(v);
      }
      if (email !== undefined) {
        const v = String(email).trim().toLowerCase();
        if (!EMAIL_RE.test(v)) throw new Error('Email inválido.');
        const other = UserModel.findByEmail(v);
        if (other && other.id !== target.id) throw new Error('Ya existe un usuario con ese email.');
        patch.email = v;
      }
      if (role !== undefined) {
        requireRole(role);
        patch.role = role;
      }
      if (title !== undefined) patch.title = String(title).trim();
      if (team !== undefined) patch.team = String(team).trim();
      if (active !== undefined) patch.active = !!active;
      if (password) patch.password = String(password);
      const user = UserModel.update(target.id, patch);
      return res.json({ user: { ...create_sanitize(user), roleMeta: getRole(user.role) } });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
};

// El modelo ya devuelve usuarios sin contraseña; helper por claridad.
function create_sanitize(user) {
  const { password, ...rest } = user || {};
  return rest;
}
