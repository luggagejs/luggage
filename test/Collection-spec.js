import { expect } from 'chai';
import Dropbox from './support/Dummybox';
import Collection from '../src/Collection';
import Record from '../src/Record';
import FilteredCollection from '../src/FilteredCollection';

global.Dropbox = Dropbox;

describe('Collection', () => {
  var collection, client;

  beforeEach(() => {
    client = new Dropbox.Client();
    collection = new Collection('quotes', client);
  });

  describe('Collection#where', () => {
    it('returns instance of FilteredCollection', () => {
      expect(collection.where(() => true)).to.be.instanceof(FilteredCollection);
    });
  });

  describe('Collection#find', () => {
    it('returns instance of Record', () => {
      expect(collection.find({id: 42})).to.be.instanceof(Record);
    });
  });
});
