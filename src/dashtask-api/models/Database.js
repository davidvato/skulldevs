import { buildSeed, SEED_VERSION } from '../data/seedData.js';

/**
 * MODELO base de datos (adaptado a entorno serverless / Vercel).
 * Persistencia en memoria sobre el seed. No escribe en disco.
 * Expone una API tipo "colección".
 */
class Database {
  constructor() {
    this.data = this._load();
  }

  _load() {
    const seed = buildSeed();
    seed.schemaVersion = SEED_VERSION;
    return seed;
  }

  _persist() {
    // No-op: la base vive en memoria (demo serverless).
  }

  seed() {
    this.data = this._load();
    return this.data;
  }

  collection(name) {
    if (!this.data[name]) this.data[name] = [];
    const ref = () => this.data[name];
    return {
      all: () => [...ref()],
      find: (predicate) => ref().filter(predicate),
      findOne: (predicate) => ref().find(predicate),
      findById: (id) => ref().find((doc) => doc.id === id),
      insert: (doc) => {
        ref().push(doc);
        this._persist();
        return doc;
      },
      update: (id, patch) => {
        const idx = ref().findIndex((doc) => doc.id === id);
        if (idx === -1) return null;
        ref()[idx] = { ...ref()[idx], ...patch };
        this._persist();
        return ref()[idx];
      },
      remove: (id) => {
        const idx = ref().findIndex((doc) => doc.id === id);
        if (idx === -1) return false;
        ref().splice(idx, 1);
        this._persist();
        return true;
      },
      count: () => ref().length,
    };
  }
}

export default new Database();
