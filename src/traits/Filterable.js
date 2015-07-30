import Readable from './Readable';

function wrapFilter(filter) {
  if (typeof filter === 'function') return filter;

  return (item) => {
    return Object.keys(filter).every((k) => filter[k] === item[k])
  }
}

class Filterable {
  where(filter) {
    return new FilteredCollection(this, wrapFilter(filter));
  }

  find(filter) {
    return new Record(this.where(filter));
  }
}

class FilteredCollection extends Filterable {
  constructor(collection, filter) {
    this.collection = collection;
    this.filter = filter;
  }

  read() {
    return this.collection.read().then((data) => {
      return data.filter(this.filter);
    });
  }
}

class Record {
  constructor(collection) {
    this.collection = collection;
  }

  read() {
    return this.colleciton.read().then((data) => {
      return data[0];
    });
  }
}

export default Filterable;
