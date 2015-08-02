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

class FilteredCollection extends Filterable {
  constructor(collection, filter) {
    super();

    this.collection = collection;
    this.filter = filter;
  }

  read() {
    return this.collection.read().then((data) => {
      return data.filter(this.filter);
    });
  }

  updateRecord(record, transform) {
    return this.collection.updateRecord(record, transform);
  }

  deleteRecord(record) {
    return this.collection.deleteRecord(record);
  }
}

export default Filterable;
