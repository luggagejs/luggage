import { expect } from 'chai';
import Dropbox from './support/Dummybox';
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
});
