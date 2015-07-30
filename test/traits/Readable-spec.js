import { expect } from 'chai';
import Dropbox from '../support/Dummybox';
import Readable from '../../src/traits/Readable';

global.Dropbox = Dropbox;

describe('Readable', () => {
  var collection, client, quotes;

  beforeEach(() => {
    quotes = ['test quote'];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);

    collection = new Readable('quotes', client);
  });

  it('should be an event emitter', () => {
    expect(collection).to.respondTo('on');
    expect(collection).to.respondTo('removeListener');
    expect(collection).to.respondTo('emit');
  });

  describe('Readable#read', () => {
    it('returns an array Promise', (done) => {
      collection.read().then((data) => {
        expect(data).to.deep.equal(quotes);
        done();
      }).catch(done);
    });

    it('creates empty collection if not exists', (done) => {
      collection = new Readable('nonexistent', client);

      collection.read().then((data) => {
        expect(data).to.deep.equal([]);
        done();
      }).catch(done);
    });
  });
});
