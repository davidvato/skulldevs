import { gzipSync, gunzipSync } from 'node:zlib';
import db from '../models/Database.js';

const KEY = process.env.DASHTASK_DB_KEY || 'dashtask:db:v1';
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvEnabled = Boolean(REDIS_URL && REDIS_TOKEN);

async function command(args) {
  const response = await fetch(REDIS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`KV ${response.status} ${detail.slice(0, 160)}`);
  }
  return response.json();
}

let ready = false;
let hydration = null;

export function ensureHydrated() {
  if (!kvEnabled) return Promise.resolve();
  if (ready) return Promise.resolve();
  if (!hydration) {
    hydration = (async () => {
      try {
        const out = await command(['GET', KEY]);
        const value = out && typeof out.result === 'string' ? out.result : '';
        if (value) {
          const raw = gunzipSync(Buffer.from(value, 'base64')).toString('utf8');
          db.restore(JSON.parse(raw));
        }
        ready = true;
        console.log(`[dashtask-kv] hidratado (${value ? 'snapshot recuperado' : 'kv vacio'})`);
      } catch (err) {
        console.error('[dashtask-kv] hidratacion fallida:', err);
        hydration = null;
      }
    })();
  }
  return hydration;
}

export async function persist() {
  if (!kvEnabled || !ready || !db.dirty) return;
  try {
    const payload = gzipSync(Buffer.from(JSON.stringify(db.snapshot()), 'utf8')).toString('base64');
    await command(['SET', KEY, payload]);
    db.dirty = false;
  } catch (err) {
    console.error('[dashtask-kv] persistencia fallida:', err);
  }
}
