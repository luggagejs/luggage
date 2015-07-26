import BaseCollection from './BaseCollection';

class FilteredCollection extends BaseCollection {
  filters = []

  constructor(name, client, filters) {
    super(name, client);

    if (filters) this.filters = this.filters.concat(filters);
  }

  where(filter) {
    return new FilteredCollection(this.name, this.client, this.filters.concat(filter))
  }

  read() {
    return super.read().then((data) => {
      return this.filters.reduce((res, filter) => {
        return res.filter(filter);
      }, data);
    });
  }
}

export default FilteredCollection;
