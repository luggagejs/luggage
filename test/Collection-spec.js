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

  describe('Collection#where', () => {
    it('returns instance of FilteredCollection', () => {
      expect(collection.where(() => true)).to.be.instanceof(FilteredCollection);
    });
  });
});
