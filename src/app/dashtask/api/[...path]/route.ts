/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthController } from '@/dashtask-api/controllers/AuthController.js';
import { UserController } from '@/dashtask-api/controllers/UserController.js';
import { IntakeController } from '@/dashtask-api/controllers/IntakeController.js';
import { TaskController } from '@/dashtask-api/controllers/TaskController.js';
import { SprintController } from '@/dashtask-api/controllers/SprintController.js';
import { CalendarController } from '@/dashtask-api/controllers/CalendarController.js';
import { CeremonyController } from '@/dashtask-api/controllers/CeremonyController.js';
import { ChangeController } from '@/dashtask-api/controllers/ChangeController.js';
import { ProjectController } from '@/dashtask-api/controllers/ProjectController.js';
import { EpicController } from '@/dashtask-api/controllers/EpicController.js';
import { DashboardController } from '@/dashtask-api/controllers/DashboardController.js';
import { TimelineController } from '@/dashtask-api/controllers/TimelineController.js';
import { ResourceController } from '@/dashtask-api/controllers/ResourceController.js';
import { AdminController } from '@/dashtask-api/controllers/AdminController.js';
import { TeamController } from '@/dashtask-api/controllers/TeamController.js';
import { auth, allowRoles } from '@/dashtask-api/middleware/auth.js';

type Fn = (req: any, res: any, next?: (err?: unknown) => void) => unknown;

const requireRoles = (...roles: string[]): Fn => allowRoles(...roles) as Fn;

const routes: [string, string, ...Fn[]][] = [
  ['POST', '/auth/login', AuthController.login],
  ['GET', '/auth/me', auth as Fn, AuthController.me],
  ['GET', '/auth/catalog', AuthController.catalog],

  ['GET', '/admin/health', AdminController.health],
  ['POST', '/admin/reset', AdminController.reset],
  ['GET', '/admin/permissions', auth as Fn, requireRoles('admin'), AdminController.permissions],
  ['PUT', '/admin/permissions/:userId', auth as Fn, requireRoles('admin'), AdminController.upsertPermission],
  ['DELETE', '/admin/permissions/:userId', auth as Fn, requireRoles('admin'), AdminController.removePermission],
  ['GET', '/admin/teams', auth as Fn, requireRoles('admin'), TeamController.list],
  ['POST', '/admin/teams', auth as Fn, requireRoles('admin'), TeamController.create],
  ['PATCH', '/admin/teams/:id', auth as Fn, requireRoles('admin'), TeamController.update],
  ['DELETE', '/admin/teams/:id', auth as Fn, requireRoles('admin'), TeamController.remove],
  ['PUT', '/admin/users/:id/team', auth as Fn, requireRoles('admin'), TeamController.setUserTeam],

  ['GET', '/users', auth as Fn, UserController.list],
  ['GET', '/users/roles', auth as Fn, UserController.roles],
  ['GET', '/users/:id', auth as Fn, UserController.get],

  ['GET', '/intakes', auth as Fn, IntakeController.list],
  ['POST', '/intakes', auth as Fn, IntakeController.create],
  ['GET', '/intakes/:id', auth as Fn, IntakeController.get],
  ['PATCH', '/intakes/:id', auth as Fn, IntakeController.update],
  ['POST', '/intakes/:id/reschedule', auth as Fn, IntakeController.reschedule],
  ['POST', '/intakes/:id/triage', auth as Fn, IntakeController.triage],
  ['POST', '/intakes/:id/perspective', auth as Fn, IntakeController.perspective],
  ['POST', '/intakes/:id/estimate', auth as Fn, IntakeController.estimate],
  ['POST', '/intakes/:id/requirements', auth as Fn, IntakeController.addRequirement],
  ['PATCH', '/intakes/:id/requirements/:key/meta', auth as Fn, IntakeController.updateRequirement],
  ['PATCH', '/intakes/:id/requirements/:key', auth as Fn, IntakeController.setRequirement],
  ['DELETE', '/intakes/:id/requirements/:key', auth as Fn, IntakeController.removeRequirement],
  ['DELETE', '/intakes/:id', auth as Fn, IntakeController.remove],

  ['GET', '/tasks', auth as Fn, TaskController.list],
  ['GET', '/tasks/board', auth as Fn, TaskController.board],
  ['POST', '/tasks', auth as Fn, TaskController.create],
  ['GET', '/tasks/:id', auth as Fn, TaskController.get],
  ['PATCH', '/tasks/:id', auth as Fn, TaskController.update],
  ['POST', '/tasks/:id/reschedule', auth as Fn, TaskController.reschedule],
  ['POST', '/tasks/:id/move', auth as Fn, TaskController.move],
  ['POST', '/tasks/:id/advance', auth as Fn, TaskController.advance],
  ['POST', '/tasks/:id/checklist/:key', auth as Fn, TaskController.checklist],
  ['POST', '/tasks/:id/sprint', auth as Fn, TaskController.assignSprint],
  ['DELETE', '/tasks/:id', auth as Fn, TaskController.remove],

  ['GET', '/ceremonies', auth as Fn, CeremonyController.list],
  ['GET', '/ceremonies/role/:role', auth as Fn, CeremonyController.forRole],

  ['GET', '/dashboard/:role', auth as Fn, DashboardController.forRole],

  ['GET', '/projects', auth as Fn, ProjectController.list],
  ['GET', '/projects/tree', auth as Fn, ProjectController.tree],
  ['GET', '/projects/:id', auth as Fn, ProjectController.get],

  ['GET', '/epics', auth as Fn, EpicController.list],
  ['GET', '/epics/:id', auth as Fn, EpicController.get],

  ['GET', '/sprints', auth as Fn, SprintController.list],
  ['GET', '/sprints/cadences', auth as Fn, SprintController.cadences],
  ['POST', '/sprints', auth as Fn, SprintController.create],
  ['GET', '/sprints/:id', auth as Fn, SprintController.get],
  ['PATCH', '/sprints/:id', auth as Fn, SprintController.update],
  ['POST', '/sprints/:id/assign', auth as Fn, SprintController.assign],
  ['POST', '/sprints/:id/carryover', auth as Fn, SprintController.carryover],
  ['DELETE', '/sprints/:id', auth as Fn, SprintController.remove],

  ['GET', '/calendar', auth as Fn, CalendarController.month],
  ['GET', '/timeline', auth as Fn, TimelineController.get],

  ['GET', '/resources', auth as Fn, ResourceController.list],
  ['GET', '/resources/candidates', auth as Fn, ResourceController.candidates],
  ['POST', '/resources', auth as Fn, ResourceController.add],
  ['PATCH', '/resources/:id', auth as Fn, ResourceController.update],
  ['DELETE', '/resources/:id', auth as Fn, ResourceController.remove],

  ['GET', '/changes', auth as Fn, requireRoles(...(ChangeController.viewRoles as string[])), ChangeController.list],
  ['POST', '/changes/:id/decide', auth as Fn, requireRoles('lpm', 'business_owner', 'epic_owner', 'rte', 'admin'), ChangeController.decide],
];

function matchRoute(method: string, pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  for (const [routeMethod, pattern, ...handlers] of routes) {
    if (routeMethod !== method) continue;
    const patParts = pattern.split('/').filter(Boolean);
    if (patParts.length !== parts.length) continue;
    const params: Record<string, string> = {};
    let ok = true;
    for (let i = 0; i < patParts.length; i++) {
      const p = patParts[i];
      if (p.startsWith(':')) params[p.slice(1)] = decodeURIComponent(parts[i]);
      else if (p !== parts[i]) { ok = false; break; }
    }
    if (ok) return { handlers, params };
  }
  return null;
}

function createReq(request: Request, url: URL, params: Record<string, string>, body: unknown) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });
  return {
    method: request.method,
    url: url.pathname.replace(/^\/dashtask\/api/, '') + url.search,
    originalUrl: url.pathname + url.search,
    headers,
    params,
    query: Object.fromEntries(url.searchParams.entries()),
    body,
  } as any;
}

function createRes() {
  const res: any = {
    statusCode: 200,
    _headers: {} as Record<string, string>,
    _body: undefined as string | undefined,
    _ended: false,
    setHeader(k: string, v: unknown) { res._headers[String(k).toLowerCase()] = String(v); },
    getHeader(k: string) { return res._headers[String(k).toLowerCase()]; },
    removeHeader(k: string) { delete res._headers[String(k).toLowerCase()]; },
    status(code: number) { res.statusCode = code; return res; },
    json(obj: unknown) {
      res._headers['content-type'] = 'application/json; charset=utf-8';
      res._body = JSON.stringify(obj);
      res._ended = true;
      return res;
    },
    send(payload: unknown) {
      if (payload === undefined || payload === null) { res._ended = true; return res; }
      if (typeof payload === 'object') return res.json(payload);
      res._body = String(payload);
      res._ended = true;
      return res;
    },
    end(chunk?: unknown) {
      if (chunk !== undefined && chunk !== null) res._body = typeof chunk === 'string' ? chunk : String(chunk);
      res._ended = true;
      return res;
    },
  };
  return res;
}

function runChain(handlers: Fn[], req: any, res: any) {
  let idx = 0;
  function next(err?: unknown) {
    if (err) throw err;
    if (res._ended) return;
    const handler = handlers[idx++];
    if (!handler) return;
    handler(req, res, next);
  }
  next();
}

async function handle(request: Request, paramsPromise: Promise<{ path?: string[] }>) {
  const { path = [] } = await paramsPromise;
  const url = new URL(request.url);
  const pathname = '/' + path.join('/');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  const matched = matchRoute(request.method, pathname);
  const res = createRes();

  try {
    let body: unknown;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const text = await request.text();
      if (text) {
        try { body = JSON.parse(text); } catch { body = undefined; }
      }
    }
    const req = createReq(request, url, matched?.params ?? {}, body);
    if (!matched) {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    } else {
      runChain(matched.handlers, req, res);
      if (!res._ended) {
        res.status(404).json({ error: 'Ruta no encontrada.' });
      }
    }
  } catch (err) {
    console.error('[dashtask-api]', err);
    res.statusCode = 500;
    res._headers['content-type'] = 'application/json; charset=utf-8';
    res._body = JSON.stringify({ error: 'Error interno del servidor.' });
  }

  const headers = new Headers();
  for (const [k, v] of Object.entries(res._headers as Record<string, string>)) headers.set(k, v);
  return new Response(res._body ?? null, { status: res.statusCode, headers });
}

export async function GET(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return handle(request, ctx.params);
}
export async function POST(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return handle(request, ctx.params);
}
export async function PATCH(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return handle(request, ctx.params);
}
export async function PUT(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return handle(request, ctx.params);
}
export async function DELETE(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return handle(request, ctx.params);
}
export async function OPTIONS() {
  return new Response(null, { status: 204 });
}
