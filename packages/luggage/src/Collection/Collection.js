import { EventEmitter } from 'events'
import events from '../constants/events'
import Filterable from '../traits/Filterable'
import compose from '../lib/compose'
import enqueue from '../lib/queue'
import { recordNotFoundError } from '../lib/errors'

@compose(EventEmitter.prototype)
class Collection extends Filterable {
  constructor(name, backend) {
    super()

    this.storage = backend
    this.backend = backend.collection(name)
    this.name = name
  }

  enqueue(operation) {
    return enqueue(this.storage, `collection:${this.name}`, operation)
  }

  matches() {
    return true
  }

  read() {
    return this.backend.read().then(this.dataChanged.bind(this))
  }

  write(data = []) {
    return this.enqueue(() => this.writeNow(data))
  }

  writeNow(data) {
    return this.backend.write(data).then(this.dataChanged.bind(this))
  }

  dataChanged(data) {
    this.emit(events.DATA_EVENT, data)
    return data
  }

  add(newRecord) {
    return this.enqueue(() => (
      this.backend.read()
        .then(data => {
          data.push(newRecord)
          return Promise.all([newRecord, this.writeNow(data)])
        })
    ))
  }

  findRecordIndex(record, data) {
    const recordIndex = data.findIndex(item => record.matches(item))

    if (recordIndex === -1) {
      throw recordNotFoundError(this.name)
    }

    return recordIndex
  }

  updateRecord(record, transform) {
    return this.enqueue(() => (
      this.read()
        .then(data => {
          const recordIndex = this.findRecordIndex(record, data)
          const oldRecord = data[recordIndex]
          const newRecord = transform.call(null, Object.assign({}, oldRecord))
          data[recordIndex] = newRecord
          return Promise.all([newRecord, oldRecord, this.writeNow(data)])
        })
    ))
  }

  deleteRecord(record) {
    return this.enqueue(() => (
      this.read()
        .then(data => {
          const recordIndex = this.findRecordIndex(record, data)
          const [oldRecord] = data.splice(recordIndex, 1)
          return Promise.all([oldRecord, this.writeNow(data)])
        })
    ))
  }

  delete() {
    return this.enqueue(() => this.backend.delete())
  }
}

export default Collection
