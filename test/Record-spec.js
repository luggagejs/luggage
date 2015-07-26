import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import Record from '../src/Record';

global.Dropbox = Dropbox;

describe('Record', () => {
  var record, client, quotes;

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
  });

  describe('Record#read', () => {
    it('returns record as a Promise', (done) => {
      record = new Record('quotes', client, { quote: 'get' });

      record.read().then((data) => {
        expect(data).to.deep.equal({ quote: 'get', author: 'John Doe' });
        done();
      }).catch(done);
    });
  });
});
