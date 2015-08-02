import { expect } from 'chai';

import Dropbox from './support/Dummybox';
import Collection from '../src/Collection';
import Filterable from '../src/traits/Filterable';

global.Dropbox = Dropbox;

describe('Collection', () => {
  var collection, client, quotes;

  beforeEach(() => {
    quotes = ['test quote'];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);

    collection = new Collection('quotes', client);
  });

  describe('Collection#find', () => {
    it('returns undefined if nothing was found', (done) => {
      collection.find({id: 42}).read().then((data) => {
        expect(data).to.be.undefined;
        done();
      }).catch(done);
    });

    it('returns a record data if was found', (done) => {
      collection.find(quote => quote.match(/test/)).read().then((data) => {
        expect(data).to.equal('test quote');
        done();
      }).catch(done);
    });
  });

  describe('Collection#write', () => {
    it('writes empty collection', (done) => {
      collection = new Collection('newcollection', client);

      collection.write().then(() => {
        expect(client.files).to.have.property('newcollection.json')
        done();
      }).catch(done);
    });
  });

  describe('Collection#read', () => {
    it('returns an array Promise', (done) => {
      collection.read().then((data) => {
        expect(data).to.deep.equal(quotes);
        done();
      }).catch(done);
    });

    it('creates empty collection if not exists', (done) => {
      collection = new Collection('nonexistent', client);

      collection.read().then((data) => {
        expect(data).to.deep.equal([]);
        done();
      }).catch(done);
    });
  });

  describe('Collection as Filterable', () => {
    const filters = {
      onlyQuotes(item) { return 'quote' in item },
      authorJohn(item) { return item['author'] === 'John Doe' },
      authorJohnObject: { author: 'John Doe' }
    };

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

      collection = new Collection('quotes', client)
    });

    describe('Filterable#where', () => {
      it('returns a new Filterable instance', () => {
        var onlyWithQuotes = collection.where(filters.onlyQuotes);

        expect(onlyWithQuotes).to.not.equal(collection);
        expect(onlyWithQuotes).to.be.instanceof(Filterable);
      });

      it('adds a filter to filters prop', () => {
        var onlyWithQuotes = collection.where(filters.onlyQuotes);
        expect(onlyWithQuotes.filter).to.deep.equal(filters.onlyQuotes);
      });

      it('converts object filters to functions', () => {
        var onlyJohnsQuotes = collection.where(filters.authorJohnObject);
        expect(onlyJohnsQuotes.filter).to.be.a('function')
      });
    });

    describe('Filterable#read', () => {
      it('returns a Promise with filtered data', (done) => {
        collection
          .where(filters.onlyQuotes)
          .and(filters.authorJohn)
          .read()
          .then((data) => {
            expect(data).to.deep.equal([{ quote: 'get', author: 'John Doe' }]);
            done();
          }).catch(done);
      });

      it('uses objects as filters', (done) => {
        var onlyJohnsQuotes = collection.where(filters.authorJohnObject);

        onlyJohnsQuotes.read().then((data) => {
          expect(data).to.deep.equal([
            { quote: 'get', author: 'John Doe' },
            { book: 'Hey you', author: 'John Doe' }
          ]);
          done();
        }).catch(done);
      });
    });
  })
});
