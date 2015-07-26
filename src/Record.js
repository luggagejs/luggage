import Filterable from './traits/Filterable';

class Record extends Filterable {
  read() {
    return super.read().then((data) => {
      return data[0];
    });
  }
}

export default Record;
