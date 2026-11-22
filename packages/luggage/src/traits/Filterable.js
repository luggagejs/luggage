import Emitter from '../lib/emitter.js'
import derived from '../lib/derived.js'
import Record from '../Record.js'

function wrapFilter(filter) {
  if (typeof filter === 'function') {
    return filter
  }

  // Object.keys() of a number or a string would make a filter that matches every item
  // (or the wrong ones): find(3) would update the first record
  if (filter === null || typeof filter !== 'object' || Array.isArray(filter)) {
    throw new TypeError(
      `A filter must be a function or an object like { id: 1 }, got ${Array.isArray(filter) ? 'array' : String(filter)}`
    )
  }

  return (item) => {
    return Object.keys(filter).every((k) => filter[k] === item[k])
  }
}

class Filterable extends Emitter {
  where(filter) {
    return new FilteredCollection(this, wrapFilter(filter))
  }

  and(filter) {
    return this.where(filter)
  }

  find(filter) {
    return new Record(this.where(filter))
  }
}

class FilteredCollection extends derived(Filterable) {
  constructor(collection, filter) {
    super()

    this.collection = collection
    this.filter = filter
  }

  get source() {
    return this.collection
  }

  transformData(data) {
    return data.filter(this.filter)
  }

  matches(item) {
    return this.collection.matches(item) && this.filter(item)
  }

  read() {
    return this.collection.read().then((data) => {
      return data.filter(this.filter)
    })
  }

  updateRecord(record, transform) {
    return this.collection.updateRecord(record, transform)
  }

  deleteRecord(record) {
    return this.collection.deleteRecord(record)
  }
}

export default Filterable
