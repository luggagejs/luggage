/* global Dropbox */

import equal from "deep-equal";
import {EventEmitter} from "events";
import {DATA_EVENT} from "./constants/events";
import Filterable from "./traits/Filterable";
import compose from "./lib/compose";

@compose(EventEmitter.prototype)
class Collection extends Filterable {
  constructor(name, backend) {
    super();

    this.backend = backend.collection(name);
    this.name = name;
  }

  read() {
    return this.backend.read().then(this.dataChanged.bind(this));
  }

  write(data=[]) {
    return this.backend.write(data).then(this.dataChanged.bind(this));
  }

  dataChanged(data) {
    this.emit(DATA_EVENT, data);
    return data;
  }

  add(newRecord) {
    return (
      this.backend.read()
      .then((data) => {
        data.push(newRecord);
        return Promise.all([newRecord, this.write(data)]);
      })
    );
  }

  updateRecord(record, transform) {
    return (
      Promise.all([record.read(), this.read()])
      .then(([record, data]) => {
        var recordIndex = data.findIndex(r => equal(r, record));
        return [recordIndex, record, data];
      })
      .then(([recordIndex, record, data]) => {
        var newRecord = transform.call(null, Object.assign({}, record));
        data[recordIndex] = newRecord;
        return Promise.all([newRecord, record, this.write(data)]);
      })
    );
  }

  deleteRecord(record) {
    return (
      Promise.all([record.read(), this.read()])
      .then(([record, data]) => {
        var recordIndex = data.findIndex(r => equal(r, record));
        data.splice(recordIndex, 1);
        return [record, this.write(data)];
      })
    );
  }
}

export default Collection;
