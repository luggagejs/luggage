import {EventEmitter} from "events";
import {DATA_EVENT} from "./constants/events";
import compose from "./lib/compose";

function wrapTransform(transform) {
  if (typeof transform === "function") {
    return transform;
  }

  return (record) => {
    return Object.assign({}, record, transform);
  };
}

@compose(EventEmitter.prototype)
class Record {
  constructor(collection) {
    this.collection = collection;
    this.collection.on(DATA_EVENT, this.dataChanged.bind(this));
  }

  read() {
    return this.collection.read().then((data) => {
      return data[0];
    });
  }

  update(transform) {
    return this.collection.updateRecord(this, wrapTransform(transform));
  }

  delete() {
    return this.collection.deleteRecord(this);
  }

  dataChanged(data) {
    this.emit(DATA_EVENT, data[0]);
  }
}

export default Record;
