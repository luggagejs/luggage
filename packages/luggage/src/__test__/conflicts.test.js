/* eslint max-nested-callbacks: 0 */
import DummyBackend from '../backends/DummyBackend.js'
import { Luggage, ConflictError } from '../index.js'

describe('protection from concurrent changes', () => {
  let backend
  let luggage
  const file = () => backend.collection('quotes')

  beforeEach(() => {
    backend = new DummyBackend('quotes', [{ quote: 'a' }], { collectionsList: ['x'] }, { revisions: true })
    luggage = new Luggage(backend)
  })

  // Simulates a change made on another device right after the collection was read
  const changeAfterNextRead = (target, method, change) => {
    const original = target[method]

    target[method] = (...args) => original.apply(target, args).then(result => {

      target[method] = original
      return change().then(() => result)
    })
  }

  it('writes the collection with the revision it was read at', async () => {
    await luggage.collection('quotes').add({ quote: 'b' })
    expect(await file().read()).toEqual({ data: [{ quote: 'a' }, { quote: 'b' }], rev: '1' })
  })

  ;[
    ['add', collection => collection.add({ quote: 'mine' })],
    ['update', collection => collection.find({ quote: 'a' }).update({ quote: 'mine' })],
    ['delete', collection => collection.find({ quote: 'a' }).delete()]
  ].forEach(([name, operation]) => {
    it(`rejects ${name} with ConflictError and keeps the other change`, async () => {
      changeAfterNextRead(file(), 'read', () => file().write([{ quote: 'a' }, { quote: 'theirs' }]))

      await expect(operation(luggage.collection('quotes'))).rejects.toBeInstanceOf(ConflictError)
      expect((await file().read()).data).toEqual([{ quote: 'a' }, { quote: 'theirs' }])
    })
  })

  it('rejects add to a new collection if somebody created the file meanwhile', async () => {
    const created = backend.collection('new')
    changeAfterNextRead(created, 'read', () => created.write([{ quote: 'theirs' }]))

    await expect(luggage.collection('new').add({ quote: 'mine' })).rejects.toBeInstanceOf(ConflictError)
    expect((await created.read()).data).toEqual([{ quote: 'theirs' }])
  })

  it('does not retry a conflicting operation', async () => {
    changeAfterNextRead(file(), 'read', () => file().write([{ quote: 'theirs' }]))
    await expect(luggage.collection('quotes').add({ quote: 'mine' })).rejects.toBeInstanceOf(ConflictError)

    expect((await file().read()).rev).toEqual('1')
  })

  it('rejects a meta change with ConflictError and keeps the other change', async () => {
    const meta = backend.collections('quotes')
    changeAfterNextRead(meta, 'readMetaInfo', () => meta.writeMetaInfo({ collectionsList: ['x', 'theirs'] }))

    await expect(luggage.collections('quotes').create('mine')).rejects.toBeInstanceOf(ConflictError)
    expect((await meta.readMetaInfo()).data).toEqual({ collectionsList: ['x', 'theirs'] })
  })

  it('does not overwrite a collection file created while creating it', async () => {
    const created = backend.collection('quotes/new')
    changeAfterNextRead(created, 'read', () => created.write([{ quote: 'theirs' }]))

    await expect(luggage.collections('quotes').create('new')).rejects.toBeInstanceOf(ConflictError)
    expect((await created.read()).data).toEqual([{ quote: 'theirs' }])
  })

  it('Collection#write overwrites the file whatever it contains', async () => {
    await file().write([{ quote: 'theirs' }])
    await luggage.collection('quotes').write([{ quote: 'mine' }])

    expect((await file().read()).data).toEqual([{ quote: 'mine' }])
  })

  describe('a backend without revisions (custom backend of luggage 2)', () => {
    it('keeps working', async () => {
      let stored = [{ quote: 'a' }]
      const custom = {
        collection: () => ({
          read: () => Promise.resolve(stored.slice()),
          write: data => {
            stored = data
            return Promise.resolve(data)
          },
          delete: () => Promise.resolve()
        })
      }
      const quotes = new Luggage(custom).collection('quotes')

      await Promise.all([quotes.add({ quote: 'b' }), quotes.find({ quote: 'a' }).update({ quote: 'A' })])
      expect(stored).toEqual([{ quote: 'A' }, { quote: 'b' }])
    })
  })
})
