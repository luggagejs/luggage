import Readable from './Readable';

class Filterable extends Readable {
  filters = []

  constructor(name, client, filters) {
    super(name, client);

    if (filters) this.filters = this.filters.concat(filters);
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

export default Filterable;
