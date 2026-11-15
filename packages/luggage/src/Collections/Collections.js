import { lens } from 'lorgnette'
import Collection from '../Collection'
import enqueue from '../lib/queue'
import { collectionExistsError } from '../lib/errors'

export const metaProperties = {
  collectionsList: 'collectionsList'
}

class Collections {
  constructor(name, backend) {
    this.backend = backend
    this.collectionsBackend = backend.collections(name)
    this.name = name
  }

  getList() {
    return this.readMetaProperty(metaProperties.collectionsList, [])
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
      const names = meta[metaProperties.collectionsList] || []

      if (names.includes(name)) {
        throw collectionExistsError(`${this.name}/${name}`)
      }

      const instance = this.getInstance(name)

      // A file can exist without being listed in meta: keep its data
      return instance.read()
        .then(data => (data.length > 0 ? data : instance.write([])))
        .then(() => ({ ...meta, [metaProperties.collectionsList]: [...names, name] }))
    }).then(() => this.getInstance(name))
  }

  delete(name) {
    return this.updateMeta(meta => {
      const names = meta[metaProperties.collectionsList] || []
      return { ...meta, [metaProperties.collectionsList]: names.filter(n => n !== name) }
    })
      .then(() => this.getInstance(name).delete())
      .then(() => this.getInstance(name))
  }

  readMetaProperty(name, defaultValue) {
    return this.readMeta(lens.prop(name), defaultValue)
  }

  writeMetaProperty(name, value) {
    return this.writeMeta(lens.prop(name), value)
  }

  writeMeta(propertyLens, value) {
    return this.updateMeta(data => propertyLens.set(data, value))
  }

  // Reads meta, changes it and writes it back. Changes of one meta file run one after another.
  updateMeta(change) {
    return enqueue(this.backend, `meta:${this.name}`, () => (
      this.collectionsBackend.readMetaInfo()
        .then(data => change(data || {}))
        .then(this.collectionsBackend.writeMetaInfo)
    ))
  }

  readMeta(propertyLens, defaultValue) {
    return this.collectionsBackend.readMetaInfo()
      .then(data => propertyLens.get(data).getOr(defaultValue))
  }
}

export default Collections
