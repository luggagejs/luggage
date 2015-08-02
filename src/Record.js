class Record {
  constructor(collection) {
    this.collection = collection;
  }

  read() {
    return this.collection.read().then((data) => {
      return data[0];
    });
  }
}

export default Record;
