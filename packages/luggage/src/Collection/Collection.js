import events from '../constants/events.js'
import Filterable from '../traits/Filterable.js'
import enqueue from '../lib/queue.js'
import { readSnapshot } from '../lib/storage.js'
import { RecordNotFoundError } from '../lib/errors.js'

class Collection extends Filterable {
  constructor(name, backend) {
    super()

    this.storage = backend
    this.backend = backend.collection(name)
    this.name = name
  }

  // Changes of one collection file run one after another
  enqueue(operation) {
    return enqueue(this.storage, `collection:${this.name}`, operation)
  }

  matches() {
    return true
  }

  readSnapshot() {
    return readSnapshot(this.backend, () => this.backend.read())
  }

  read() {
    return this.readSnapshot().then(({ data }) => this.dataChanged(data))
  }

  // Replaces the whole file, whatever it contains now
  write(data = []) {
    return this.enqueue(() => this.writeNow(data))
  }

  // rev is the revision the data was read at. A backend that supports
  // revisions rejects with ConflictError if the file has changed since.
  writeNow(data, rev) {
    return this.backend.write(data, { rev }).then(() => this.dataChanged(data))
  }

  dataChanged(data) {
    this.emit(events.DATA_EVENT, data)
    return data
  }

  add(newRecord) {
    return this.enqueue(() => (
      this.readSnapshot()
        .then(({ data, rev }) => {
          data.push(newRecord)
          return Promise.all([newRecord, this.writeNow(data, rev)])
        })
    ))
  }

  findRecordIndex(record, data) {
    const recordIndex = data.findIndex(item => record.matches(item))

    if (recordIndex === -1) {
      throw new RecordNotFoundError(this.name)
    }

    return recordIndex
  }

  updateRecord(record, transform) {
    return this.enqueue(() => (
      this.readSnapshot()
        .then(({ data, rev }) => {
          this.dataChanged(data)
          const recordIndex = this.findRecordIndex(record, data)
          const oldRecord = data[recordIndex]
          const newRecord = transform.call(null, Object.assign({}, oldRecord))
          const newData = data.slice()
          newData[recordIndex] = newRecord
          return Promise.all([newRecord, oldRecord, this.writeNow(newData, rev)])
        })
    ))
  }

  deleteRecord(record) {
    return this.enqueue(() => (
      this.readSnapshot()
        .then(({ data, rev }) => {
          this.dataChanged(data)
          const recordIndex = this.findRecordIndex(record, data)
          const oldRecord = data[recordIndex]
          const newData = data.filter((_, index) => index !== recordIndex)
          return Promise.all([oldRecord, this.writeNow(newData, rev)])
        })
    ))
  }

  delete() {
    return this.enqueue(() => this.backend.delete())
  }
}

export default Collection
