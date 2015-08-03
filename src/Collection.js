/* global Dropbox */

import equal from "deep-equal";
import {EventEmitter} from "events";
import {DATA_EVENT} from "./constants/events";
import Filterable from "./traits/Filterable";
import compose from "./lib/compose";

@compose(EventEmitter.prototype)
class Collection extends Filterable {
  constructor(name, client) {
    super();

    this.client = client;
    this.name = name;
  }

  get fileName() {
    return `${this.name}.json`;
  }

  read() {
    return new Promise((resolve, reject) => {
      this.client.readFile(this.fileName, (error, data) => {
        switch (error) {
          case undefined:
          case null:
            this.emit(DATA_EVENT, JSON.parse(data));
            resolve(JSON.parse(data));
            break;
          case Dropbox.ApiError.NOT_FOUND:
            this.emit(DATA_EVENT, []);
            resolve([]);
            break;
          default:
            reject(error);
        }
      });
    });
  }

  write(data=[]) {
    return new Promise((resolve, reject) => {
      this.client.writeFile(this.fileName, JSON.stringify(data), (error, stat) => {
        if (error) {
          reject(error);
        } else {
          this.emit(DATA_EVENT, data);
          resolve(data);
        }
      });
    });
  }

  add(newRecord) {
    return (
      this.read()
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
