import { lens } from 'lorgnette'
import Collection from '../Collection'

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
    return this.getInstance(name)
      .write([])
      .then(() => this.writeMeta(lens.prop(metaProperties.collectionsList, []).last(), name))
      .then(() => this.getInstance(name))
  }

  delete(name) {
    return this.getList()
      .then(names => names.filter(n => n !== name))
      .then(names => this.writeMeta(lens.prop(metaProperties.collectionsList), names))
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
    return this.collectionsBackend.readMetaInfo()
      .then(data => propertyLens.set(data, value))
      .then(this.collectionsBackend.writeMetaInfo)
  }

  readMeta(propertyLens, defaultValue) {
    return this.collectionsBackend.readMetaInfo()
      .then(data => propertyLens.get(data).getOr(defaultValue))
  }
}

export default Collections
