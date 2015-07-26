import Filterable from './traits/Filterable';

class FilteredCollection extends Filterable {
  where(filter) {
    return new FilteredCollection(this.name, this.client, this.filters.concat(filter))
  }
}

export default FilteredCollection;
