/* global Dropbox */

import equal from "deep-equal";
import Filterable from "./traits/Filterable";

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
            resolve(JSON.parse(data));
            break;
          case Dropbox.ApiError.NOT_FOUND:
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
          resolve(data);
        }
      });
    });
  }

  updateRecord(record, transform) {
    return Promise.all([record.read(), this.read()]).then(([record, data]) => {
      var recordIndex = data.findIndex(r => equal(r, record));
      return [recordIndex, record, data];
    }).then(([recordIndex, record, data]) => {
      data[recordIndex] = transform.call(null, Object.assign({}, record));
      return data;
    }).then(data => this.write(data));
  }

  deleteRecord(record) {
    return Promise.all([record.read(), this.read()]).then(([record, data]) => {
      var recordIndex = data.findIndex(r => equal(r, record));
      data.splice(recordIndex, 1);
      return data;
    }).then(data => this.write(data));
  }
}

export default Collection;
