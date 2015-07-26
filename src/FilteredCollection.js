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

  wrapFilter(filter) {
    if (typeof filter === 'function') return filter;

    return (item) => {
      return Object.keys(filter).every((k) => filter[k] === item[k])
    }
  }

  read() {
    return super.read().then((data) => {
      return this.filters.reduce((res, filter) => {
        return res.filter(this.wrapFilter(filter));
      }, data);
    });
  }
}

export default FilteredCollection;
