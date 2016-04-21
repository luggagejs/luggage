import { expect } from 'chai';
import Dropbox from './support/Dummybox';

import Luggage from '../src/Luggage';
import DropboxBackend from '../src/backends/DropboxV1Backend';
import Collection from '../src/Collection';

global.Dropbox = Dropbox;

describe('Luggage', () => {
  var store;

  beforeEach(() => {
    var client = new Dropbox.Client({
      key: 'blah blah blah mr. Freeman'
    });

    store = new Luggage(new DropboxBackend(client));
  })

  describe('Luggage#collection', () => {
    it('returns Collection instance', () => {
      expect(store.collection('test')).to.be.instanceof(Collection);
    })
  })
});
