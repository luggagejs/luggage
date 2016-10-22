import { expect } from 'chai';

import Luggage from '../src/Luggage';
import DropboxBackend from '../src/backends/DropboxBackend';
import Collection from '../src/Collection';

describe('Luggage', () => {
  var store;

  beforeEach(() => {
    store = new Luggage(new DropboxBackend('test', 'test'));
  })

  describe('Luggage#collection', () => {
    it('returns Collection instance', () => {
      expect(store.collection('test')).to.be.instanceof(Collection);
    })
  })
});
