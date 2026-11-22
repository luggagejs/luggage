/* eslint max-nested-callbacks: 0 */
import { jest } from '@jest/globals'
import DummyBackend from '../backends/DummyBackend.js'
import { Luggage } from '../index.js'

describe('data events', () => {
  let collection

  beforeEach(() => {
    collection = new Luggage(new DummyBackend('quotes', [{ quote: 'a', author: 'x' }])).collection('quotes')
  })

  it('where() and find() without listeners do not subscribe to the collection', () => {
    collection.where({ author: 'x' })
    collection.find({ quote: 'a' })
    collection.where({ author: 'x' }).find({ quote: 'a' })

    expect(collection.listenerCount('data')).toEqual(0)
  })

  it('a listener subscribes, off() unsubscribes', async () => {
    const record = collection.find({ quote: 'a' })
    const listener = jest.fn()

    record.on('data', listener)
    expect(collection.listenerCount('data')).toEqual(1)

    await collection.read()
    expect(listener).toHaveBeenCalledWith({ quote: 'a', author: 'x' })

    record.off('data', listener)
    expect(collection.listenerCount('data')).toEqual(0)
  })

  it('dispose() unsubscribes the whole chain', () => {
    const filtered = collection.where({ author: 'x' })
    const record = filtered.find({ quote: 'a' })
    record.on('data', () => null)
    record.on('data', () => null)

    record.dispose()
    expect(filtered.listenerCount('data')).toEqual(0)
    expect(collection.listenerCount('data')).toEqual(0)
  })

  it('once() listens to one event', async () => {
    const filtered = collection.where({ author: 'x' })
    const listener = jest.fn()
    filtered.once('data', listener)

    await collection.read()
    await collection.read()
    expect(listener).toHaveBeenCalledTimes(1)
    expect(collection.listenerCount('data')).toEqual(0)
  })

  it('off() without a listener throws and removes nothing, like Node EventEmitter', () => {
    const listener = jest.fn()
    const onceListener = jest.fn()
    collection.on('data', listener).once('data', onceListener)

    expect(() => collection.off('data')).toThrow(TypeError)
    expect(collection.listenerCount('data')).toEqual(2)
  })

  it('off() without a listener keeps a derived collection subscribed to its source', () => {
    const filtered = collection.where({ author: 'x' })
    filtered.on('data', () => null)

    expect(() => filtered.off('data')).toThrow(TypeError)
    expect(collection.listenerCount('data')).toEqual(1)
  })

  it('removeListener() is an alias of off()', () => {
    const listener = () => null
    collection.on('data', listener).removeListener('data', listener)
    expect(collection.listenerCount('data')).toEqual(0)
  })
})
