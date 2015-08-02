import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import Record from '../src/Record';
import Collection from '../src/Collection';

global.Dropbox = Dropbox;

describe('Record', () => {
  var collection, client, quotes;

  beforeEach(() => {
    quotes = [
      { quote: 'hey' },
      { quote: 'you', author: 'unknown' },
      { quote: 'get', author: 'John Doe' },
      { book: 'Hey you', author: 'John Doe' },
      { bla: 'blah blah blah mr. Freeman' }
    ];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);

    collection = new Collection('quotes', client);
  });

  describe('Record#read', () => {
    it('returns record as a Promise', (done) => {
      var record = collection.find({ quote: 'get' });

      record.read().then((data) => {
        expect(data).to.deep.equal({ quote: 'get', author: 'John Doe' });
        done();
      }).catch(done);
    });
  });

  describe('Record#update', () => {
    var record, updatePromise;

    beforeEach(() => {
      record = collection.find({ quote: 'get' });

      updatePromise = record.update((r) => {
        r.quote = 'get it done';
        return r;
      });
    });

    it('writes new data to json file', (done) => {
      updatePromise.then(() => {
        var fileData = JSON.parse(client.files['quotes.json']);
        var fileRecord = fileData.find(({quote}) => quote === 'get it done');

        expect(fileRecord).to.deep.equal({ quote: 'get it done', author: 'John Doe' })
        done();
      }).catch(done);
    });

    it('returns Promise with new data', (done) => {
      updatePromise.then((data) => {
        expect(data).to.include({ quote: 'get it done', author: 'John Doe' });
        expect(data).not.to.include({ quote: 'get', author: 'John Doe' });
        done();
      }).catch(done);
    });

    it('takes an object as part of an update', (done) => {
      record.update({
        quote: 'get it done',
        famous: true
      }).then((data) => {
        expect(data).to.include({
          quote: 'get it done',
          author: 'John Doe',
          famous: true
        });
        expect(data).not.to.include({ quote: 'get', author: 'John Doe' });
        done();
      }).catch(done);
    });
  });
});
