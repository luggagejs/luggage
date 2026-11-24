// In-memory backend for tests. It behaves like a file storage:
// reads return a copy of the stored data and writes replace it.
// With { revisions: true } it also checks revisions like Dropbox does.
import { ConflictError } from '../lib/errors.js'

const copy = data => (typeof data === 'undefined' ? data : JSON.parse(JSON.stringify(data)))

class DummyFile {
  constructor(path, content, revisions) {
    this.path = path
    this.content = content
    this.supportsRevisions = revisions
    this.revision = 0
  }

  get exists() {
    return typeof this.content !== 'undefined'
  }

  get rev() {
    return this.exists ? String(this.revision) : null
  }

  readFile(defaultValue) {
    const data = this.exists ? copy(this.content) : defaultValue
    return Promise.resolve(this.supportsRevisions ? { data, rev: this.rev } : data)
  }

  writeFile(data, { rev } = {}) {
    if (this.supportsRevisions && typeof rev !== 'undefined' && rev !== this.rev) {
      return Promise.reject(new ConflictError(this.path))
    }

    this.content = copy(data)
    this.revision += 1
    return Promise.resolve(data)
  }
}

class DummyBackendCollection extends DummyFile {
  get data() {
    return this.content
  }

  set data(data) {
    this.content = data
  }

  read() {
    return this.readFile([])
  }

  write(data, options) {
    return this.writeFile(data, options)
  }

  delete() {
    this.content = undefined
    return Promise.resolve([])
  }
}

class DummyBackendCollections extends DummyFile {
  get metaInfo() {
    return this.content
  }

  set metaInfo(metaInfo) {
    this.content = metaInfo
  }

  readMetaInfo = () => this.readFile({})

  writeMetaInfo = (data, options) => this.writeFile(data, options)
}

export default class DummyBackend {
  constructor(name, data, metaInfo, { revisions = false } = {}) {
    this.revisions = revisions
    this.collectionMock = {}
    this.collectionsMock = {}

    if (typeof name !== 'undefined') {
      this.collectionMock[name] = new DummyBackendCollection(`/${name}.json`, data, revisions)
      this.collectionsMock[name] = new DummyBackendCollections(`/${name}/.meta.json`, metaInfo, revisions)
    }
  }

  collection(name) {
    if (!Object.hasOwn(this.collectionMock, name)) {
      this.collectionMock[name] = new DummyBackendCollection(`/${name}.json`, undefined, this.revisions)
    }
    return this.collectionMock[name]
  }

  collections(name) {
    if (!Object.hasOwn(this.collectionsMock, name)) {
      this.collectionsMock[name] = new DummyBackendCollections(`/${name}/.meta.json`, undefined, this.revisions)
    }
    return this.collectionsMock[name]
  }
}

export { DummyBackend }
