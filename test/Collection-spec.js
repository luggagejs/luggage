import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import Collection from '../src/Collection';
import FilteredCollection from '../src/FilteredCollection';

global.Dropbox = Dropbox;

describe('Collection', () => {
  var collection, client, quotes;

  beforeEach(() => {
    quotes = ['test quote'];

    client = new Dropbox.Client();
    client.files['quotes.json'] = JSON.stringify(quotes);

    collection = new Collection('quotes', client);
  });

  it('should be an event emitter', () => {
    expect(collection).to.respondTo('on');
    expect(collection).to.respondTo('removeListener');
    expect(collection).to.respondTo('emit');
  });

  describe('Collection#create', () => {
    it('creates empty collection', (done) => {
      collection = new Collection('newcollection', client);

      collection.create().then(() => {
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
        expect(client.files).to.have.property('nonexistent.json')
        expect(data).to.deep.equal([]);
        done();
      }).catch(done);
    });
  });

  describe('Collection#where', () => {
    it('returns instance of FilteredCollection', () => {
      expect(collection.where(() => true)).to.be.instanceof(FilteredCollection);
    });
  });
});
