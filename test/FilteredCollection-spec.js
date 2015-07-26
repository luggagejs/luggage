import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import FilteredCollection from '../src/FilteredCollection';

global.Dropbox = Dropbox;

describe('FilteredCollection', () => {
  const filters = {
    onlyQuotes(item) { return 'quote' in item },
    authorJohn(item) { return item['author'] === 'John Doe' }
  };

  var collection, client, quotes;

  beforeEach(() => {
    quotes = [
      { quote: 'hey' },
      { quote: 'you', author: 'unknown' },
      { quote: 'get', author: 'John Doe' },
      { book: 'Hey you', author: 'John Doe' },
      { bla: 'blah blah blah mr. Freeman' },
    ];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);
  });

  describe('FilteredCollection#constructor', () => {
    it('takes a filter as a param', () => {
      collection = new FilteredCollection('quotes', client, filters.onlyQuotes)
      expect(collection.filters).to.deep.equal([filters.onlyQuotes]);
    });

    it('takes an array of filters as a param', () => {
      collection = new FilteredCollection('quotes', client, [filters.onlyQuotes])
      expect(collection.filters).to.deep.equal([filters.onlyQuotes]);
    });
  })

  describe('FilteredCollection#where', () => {
    it('returns a new FilteredCollection instance', () => {
      collection = new FilteredCollection('quotes', client)
      var onlyWithQuotes = collection.where(filters.onlyQuotes);

      expect(onlyWithQuotes).to.not.equal(collection);
      expect(onlyWithQuotes).to.be.instanceof(FilteredCollection);
    });

    it('adds a filter to filters prop', () => {
      collection = new FilteredCollection('quotes', client)
      var onlyWithQuotes = collection.where(filters.onlyQuotes);
      expect(onlyWithQuotes.filters).to.deep.equal([filters.onlyQuotes]);
    });

    it('returns a FilteredCollection instance with old filters and new one', () => {
      collection = new FilteredCollection('quotes', client, filters.onlyQuotes);
      var onlyJohnsQuotes = collection.where(filters.authorJohn);
      expect(onlyJohnsQuotes.filters).to.deep.equal([filters.onlyQuotes, filters.authorJohn]);
    });
  });

  describe('FilteredCollection#read', () => {
    it('returns a Promise with filtered data', (done) => {
      collection = new FilteredCollection('quotes', client, [filters.onlyQuotes, filters.authorJohn]);

      collection.read().then((data) => {
        expect(data).to.deep.equal([{ quote: 'get', author: 'John Doe' }]);
        done();
      }).catch(done);
    });
  })
})
