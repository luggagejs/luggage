import { expect } from 'chai';

import Dropbox from './support/Dummybox';
import DropboxBackend from '../src/backends/DropboxBackend';
import Collection from '../src/Collection';
import Filterable from '../src/traits/Filterable';

global.Dropbox = Dropbox;

describe('Collection', () => {
  var collection, backend, quotes, client;

  beforeEach(() => {
    quotes = ['test quote'];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);

    backend = new DropboxBackend(client);

    collection = new Collection('quotes', backend);
  });

  describe('Collection#write', () => {
    it('writes empty collection', (done) => {
      collection = new Collection('newcollection', backend);

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
      collection = new Collection('nonexistent', backend);

      collection.read().then((data) => {
        expect(data).to.deep.equal([]);
        done();
      }).catch(done);
    });
  });

  describe('Collection#add', () => {
    var newRecord;

    beforeEach(() => {
      newRecord = { 'new article': 'indeed' };
    });

    it('adds new record to new collection', (done) => {
      collection = new Collection('nonexistent', backend);

      collection.add(newRecord).then(() => {
        var fileData = JSON.parse(client.files['nonexistent.json']);
        expect(fileData).to.include(newRecord);
        done();
      }).catch(done);
    });

    it('adds new record to existing collection', (done) => {
      collection.add(newRecord).then(() => {
        var fileData = JSON.parse(client.files['quotes.json']);
        expect(fileData).to.include(newRecord);
        done();
      }).catch(done);
    });

    it('returns a Promise with newly added record', (done) => {
      collection.add(newRecord).then(([record, data]) => {
        expect(record).to.deep.equal(newRecord);
        expect(data).to.include(record);
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
        { quote: 'get', author: 'unknown' },
        { quote: 'get', author: 'John Doe' },
        { book: 'Hey you', author: 'John Doe' },
        { bla: 'blah blah blah mr. Freeman' },
      ];

      client = new Dropbox.Client();
      client.files['quotes.json'] = JSON.stringify(quotes);

      backend = new DropboxBackend(client);

      collection = new Collection('quotes', backend);
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

    describe('Filterable#find', () => {
      it('returns undefined if nothing was found', (done) => {
        collection.find({id: 42}).read().then((data) => {
          expect(data).to.be.undefined;
          done();
        }).catch(done);
      });

      it('returns a record data if was found', (done) => {
        collection.find({book: 'Hey you'}).read().then((data) => {
          expect(data).to.deep.equal({ book: 'Hey you', author: 'John Doe' });
          done();
        }).catch(done);
      });

      it('works on already filtered collection', (done) => {
        collection
          .where({quote: 'get'})
          .find({author: 'John Doe'})
          .read()
          .then((data) => {
            expect(data).to.deep.equal({ quote: 'get', author: 'John Doe' });
            done();
          }).catch(done);
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

      describe('Filterable as EventEmitter', () => {
        it('emits data event after collection read', (done) => {
          var onlyQuotes = collection.where(filters.onlyQuotes);

          onlyQuotes.on('data', (data) => {
            expect(data.length).to.equal(3);
            done();
          });

          onlyQuotes.read();
        });

        it('emits with correct payload when chained', (done) => {
          var johnsQuotes = collection
            .where(filters.onlyQuotes)
            .and(filters.authorJohn);

          johnsQuotes.on('data', (data) => {
            expect(data).to.deep.equal([
              { quote: 'get', author: 'John Doe' },
              { quote: 'get it done', author: 'John Doe' }
            ]);
            done();
          })

          collection.add({ quote: 'get it done', author: 'John Doe' });
        });
      })
    });
  });

  describe('Collection as EventEmitter', () => {
    it('emits data event after collection read', (done) => {
      collection.on('data', () => done());
      collection.read();
    });

    it('adds data payload to data event', (done) => {
      collection.on('data', (data) => {
        expect(data).to.deep.equal(quotes);
        done();
      });
      collection.read();
    });

    it('emits data event after collection write', (done) => {
      collection.on('data', (data) => {
        expect(data).to.deep.equal(['somedata']);
        done();
      });
      collection.write(['somedata']);
    });
  });
});
