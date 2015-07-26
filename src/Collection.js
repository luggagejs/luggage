import BaseCollection from './BaseCollection';
import FilteredCollection from './FilteredCollection';

class Collection extends BaseCollection {
  create() {
    return new Promise((resolve, reject) => {
      this.client.writeFile(this.fileName, JSON.stringify([]), (error, stat) => {
        error ? reject(error) : resolve(stat);
      });
    })
  }

  where(filter) {
    return new FilteredCollection(this.name, this.client, filter);
  }
}

export default Collection
