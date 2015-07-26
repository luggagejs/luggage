import BaseCollection from './BaseCollection';
import FilteredCollection from './FilteredCollection';

class Collection extends BaseCollection {
  where(filter) {
    return new FilteredCollection(this.name, this.client, filter);
  }
}

export default Collection
