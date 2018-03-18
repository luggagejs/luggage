import equal from 'deep-equal'
import { EventEmitter } from 'events'
import events from './constants/events'
import Filterable from './traits/Filterable'
import compose from './lib/compose'

@compose(EventEmitter.prototype)
class Collection extends Filterable {
  constructor(name, backend) {
    super()

    this.backend = backend.collection(name)
    this.name = name
  }

  read() {
    return this.backend.read().then(this.dataChanged.bind(this))
  }

  write(data = []) {
    return this.backend.write(data).then(this.dataChanged.bind(this))
  }

  dataChanged(data) {
    this.emit(events.DATA_EVENT, data)
    return data
  }

  add(newRecord) {
    return (
      this.backend.read()
      .then((data) => {
        data.push(newRecord)
        return Promise.all([newRecord, this.write(data)])
      })
    )
  }

  updateRecord(record, transform) {
    return (
      Promise.all([record.read(), this.read()])
      .then(([r, data]) => {
        const recordIndex = data.findIndex(rr => equal(rr, r))
        return [recordIndex, record, data]
      })
      .then(([recordIndex, r, data]) => {
        let newRecord = transform.call(null, Object.assign({}, r))
        data[recordIndex] = newRecord
        return Promise.all([newRecord, r, this.write(data)])
      })
    )
  }

  deleteRecord(record) {
    return (
      Promise.all([record.read(), this.read()])
      .then(([r, data]) => {
        let recordIndex = data.findIndex(rr => equal(rr, r))
        data.splice(recordIndex, 1)
        return Promise.all([r, this.write(data)])
      })
    )
  }
}

export default Collection
