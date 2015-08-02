function wrapTransform(transform) {
  if (typeof transform === "function") {
    return transform;
  }

  return (record) => {
    return Object.assign({}, record, transform);
  };
}

class Record {
  constructor(collection) {
    this.collection = collection;
  }

  read() {
    return this.collection.read().then((data) => {
      return data[0];
    });
  }

  update(transform) {
    return this.collection.updateRecord(this, wrapTransform(transform));
  }
}

export default Record;
