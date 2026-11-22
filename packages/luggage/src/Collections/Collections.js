import Collection from '../Collection/index.js'
import enqueue from '../lib/queue.js'
import { readSnapshot } from '../lib/storage.js'
import { CollectionExistsError } from '../lib/errors.js'

export const metaProperties = {
  collectionsList: 'collectionsList'
}

const { collectionsList } = metaProperties

class Collections {
  constructor(name, backend) {
    this.backend = backend
    this.collectionsBackend = backend.collections(name)
    this.name = name
  }

  getList() {
    return this.readMetaProperty(collectionsList, [])
  }

  getInstance(name) {
    const collectionName = `${this.name}/${name}`
    return new Collection(collectionName, this.backend)
  }

  getInstances() {
    return this.getList()
      .then(names => names.map(this.getInstance.bind(this)))
  }

  create(name) {
    return this.updateMeta(meta => {
      const names = meta[collectionsList] || []

      if (names.includes(name)) {
        throw new CollectionExistsError(`${this.name}/${name}`)
      }

      const instance = this.getInstance(name)

      // A file can exist without being listed in meta: keep its data.
      // A new file is written with the revision it was read at, so a file
      // created by somebody else in the meantime is not overwritten.
      return instance.enqueue(() => instance.readSnapshot().then(({ data, rev }) => (
        data.length > 0 ? data : instance.writeNow([], rev)
      )))
        .then(() => ({ ...meta, [collectionsList]: [...names, name] }))
    }).then(() => this.getInstance(name))
  }

  // The file goes first: if deleting it fails, the collection stays listed.
  // Otherwise create() would find the unlisted file and keep its records.
  delete(name) {
    return this.getInstance(name).delete()
      .then(() => this.updateMeta(meta => ({
        ...meta,
        [collectionsList]: (meta[collectionsList] || []).filter(n => n !== name)
      })))
      .then(() => this.getInstance(name))
  }

  readMetaProperty(name, defaultValue) {
    return this.readMeta().then(({ data }) => (
      typeof data[name] === 'undefined' ? defaultValue : data[name]
    ))
  }

  writeMetaProperty(name, value) {
    return this.updateMeta(meta => ({ ...meta, [name]: value }))
  }

  readMeta() {
    return readSnapshot(this.collectionsBackend, () => this.collectionsBackend.readMetaInfo())
      .then(({ data, rev }) => ({ data: data || {}, rev }))
  }

  // Reads meta, changes it and writes it back with the revision it was read at.
  // Changes of one meta file run one after another.
  updateMeta(change) {
    return enqueue(this.backend, `meta:${this.name}`, () => (
      this.readMeta()
        .then(({ data, rev }) => Promise.resolve(change(data)).then(newData => (
          this.collectionsBackend.writeMetaInfo(newData, { rev }).then(() => newData)
        )))
    ))
  }
}

export default Collections
