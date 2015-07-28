import Readable from './traits/Readable';
import FilteredCollection from './FilteredCollection';
import Record from './Record';

class Collection extends Readable {
  where(filter) {
    return new FilteredCollection(this.name, this.client, filter);
  }

  find(filter) {
    return new Record(this.name, this.client, filter);
  }
}

export default Collection
