import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import BaseCollection from '../src/BaseCollection';
import FilteredCollection from '../src/FilteredCollection';

global.Dropbox = Dropbox;

describe('BaseCollection', () => {
  var collection, client, quotes;

  beforeEach(() => {
    quotes = ['test quote'];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);

    collection = new BaseCollection('quotes', client);
  });

  it('should be an event emitter', () => {
    expect(collection).to.respondTo('on');
    expect(collection).to.respondTo('removeListener');
    expect(collection).to.respondTo('emit');
  });

  describe('BaseCollection#create', () => {
    it('creates empty collection', (done) => {
      collection = new BaseCollection('newcollection', client);

      collection.create().then(() => {
        expect(client.files).to.have.property('newcollection.json')
        done();
      }).catch(done);
    });
  });

  describe('BaseCollection#read', () => {
    it('returns an array Promise', (done) => {
      collection.read().then((data) => {
        expect(data).to.deep.equal(quotes);
        done();
      }).catch(done);
    });

    it('creates empty collection if not exists', (done) => {
      collection = new BaseCollection('nonexistent', client);

      collection.read().then((data) => {
        expect(client.files).to.have.property('nonexistent.json')
        expect(data).to.deep.equal([]);
        done();
      }).catch(done);
    });
  });
});
