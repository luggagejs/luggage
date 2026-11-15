import Emitter from './lib/emitter.js'
import derived from './lib/derived.js'

function wrapTransform(transform) {
  if (typeof transform === 'function') {
    return transform
  }

  return (record) => {
    return Object.assign({}, record, transform)
  }
}

class Record extends derived(Emitter) {
  constructor(collection) {
    super()
    this.collection = collection
  }

  get source() {
    return this.collection
  }

  transformData(data) {
    return data[0]
  }

  matches(item) {
    return this.collection.matches(item)
  }

  read() {
    return this.collection.read().then((data) => {
      return data[0]
    })
  }

  update(transform) {
    return this.collection.updateRecord(this, wrapTransform(transform))
  }

  delete() {
    return this.collection.deleteRecord(this)
  }
}

export default Record
