import { expect } from 'chai';
import Dropbox from './support/Dummybox';

import Luggage from '../src/Luggage';
import Collection from '../src/Collection';

global.Dropbox = Dropbox;

describe('Luggage', () => {
  var client, store;

  beforeEach(() => {
    client = new Dropbox.Client({
      key: 'blah blah blah mr. Freeman'
    });

    store = new Luggage(client);
  })

  describe('Luggage#collection', () => {
    it('returns Collection instance', () => {
      expect(store.collection('test')).to.be.instanceof(Collection);
    })
  })
});
