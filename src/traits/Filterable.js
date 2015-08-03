import {EventEmitter} from "events";
import {DATA_EVENT} from "../constants/events";
import delegate from "../lib/delegate";
import compose from "../lib/compose";
import Record from "../Record";

function wrapFilter(filter) {
  if (typeof filter === "function") {
    return filter;
  }

  return (item) => {
    return Object.keys(filter).every((k) => filter[k] === item[k]);
  };
}

class Filterable {
  where(filter) {
    return new FilteredCollection(this, wrapFilter(filter));
  }

  and(filter) {
    return this.where(filter);
  }

  find(filter) {
    return new Record(this.where(filter));
  }
}

@compose(EventEmitter.prototype)
class FilteredCollection extends Filterable {
  constructor(collection, filter) {
    super();

    this.collection = collection;
    this.filter = filter;

    this.collection.on(DATA_EVENT, this.dataChanged.bind(this));

    delegate(this, "updateRecord", this.collection);
    delegate(this, "deleteRecord", this.collection);
  }

  read() {
    return this.collection.read().then((data) => {
      return data.filter(this.filter);
    });
  }

  dataChanged(data) {
    this.emit(DATA_EVENT, data.filter(this.filter));
  }
}

export default Filterable;
