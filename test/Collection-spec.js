import { expect } from 'chai';
import Collection from '../src/Collection';

describe('Collection', () => {
  var store;

  beforeEach(() => {
    store = new Collection();
  });

  it('should be an event emitter', () => {
    expect(store).to.respondTo('on');
    expect(store).to.respondTo('removeListener');
    expect(store).to.respondTo('emit');
  });
});
