import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import Collection from '../src/Collection';
import Record from '../src/Record';
import Filterable from '../src/traits/Filterable';

global.Dropbox = Dropbox;

describe('Collection', () => {
  var collection, client;

  beforeEach(() => {
    client = new Dropbox.Client();
    collection = new Collection('quotes', client);
  });

  describe('Collection#where', () => {
    it('returns instance of Filterable', () => {
      expect(collection.where(() => true)).to.be.instanceof(Filterable);
    });
  });

  describe('Collection#find', () => {
    it('returns single record', (done) => {
      collection.find({id: 42}).read().then((data) => {
        expect(data).to.be.undefined;
        done();
      })
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

});
