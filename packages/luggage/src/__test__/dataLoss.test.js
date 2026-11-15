/* eslint max-nested-callbacks: 0 */

import DummyBackend from '../backends/DummyBackend'
import Collection from '../Collection'
import Collections, { metaProperties } from '../Collections'

const { collectionsList } = metaProperties

describe('protection from data loss', () => {
  let backend
  let collection
  const stored = () => backend.collection('quotes').read()

  beforeEach(() => {
    backend = new DummyBackend('quotes', [
      { quote: 'a' },
      { quote: 'b' },
      { quote: 'c' }
    ])
    collection = new Collection('quotes', backend)
  })

  describe('a record that is not in the file', () => {
    it('is not deleted in place of the last record', async () => {
      await expect(collection.find({ quote: 'missing' }).delete()).rejects.toThrow()
      expect(await stored()).toEqual([{ quote: 'a' }, { quote: 'b' }, { quote: 'c' }])
    })

    it('rejects update instead of silently dropping the change', async () => {
      await expect(collection.find({ quote: 'missing' }).update({ x: 1 })).rejects.toThrow()
      expect(await stored()).toEqual([{ quote: 'a' }, { quote: 'b' }, { quote: 'c' }])
    })

    it('rejects delete when the record was removed by somebody else', async () => {
      const record = collection.find({ quote: 'c' })
      await backend.collection('quotes').write([{ quote: 'a' }, { quote: 'b' }])

      await expect(record.delete()).rejects.toThrow()
      expect(await stored()).toEqual([{ quote: 'a' }, { quote: 'b' }])
    })
  })

  describe('finding a record', () => {
    it('reads the file once per update', async () => {
      const read = jest.spyOn(backend.collection('quotes'), 'read')
      await collection.find({ quote: 'b' }).update({ x: 1 })

      expect(read).toHaveBeenCalledTimes(1)
    })

    it('reads the file once per delete', async () => {
      const read = jest.spyOn(backend.collection('quotes'), 'read')
      await collection.find({ quote: 'b' }).delete()

      expect(read).toHaveBeenCalledTimes(1)
    })

    it('uses the whole where/find chain', async () => {
      await backend.collection('quotes').write([
        { quote: 'x', author: 'A' },
        { quote: 'x', author: 'B' }
      ])

      await collection.where({ author: 'B' }).find({ quote: 'x' }).update({ quote: 'y' })
      expect(await stored()).toEqual([
        { quote: 'x', author: 'A' },
        { quote: 'y', author: 'B' }
      ])
    })
  })

  describe('operations started without waiting', () => {
    it('keeps both added records', async () => {
      await Promise.all([collection.add({ quote: 'd' }), collection.add({ quote: 'e' })])

      expect(await stored()).toEqual([
        { quote: 'a' }, { quote: 'b' }, { quote: 'c' }, { quote: 'd' }, { quote: 'e' }
      ])
    })

    it('keeps an add and an update', async () => {
      await Promise.all([
        collection.add({ quote: 'd' }),
        collection.find({ quote: 'a' }).update({ quote: 'A' })
      ])

      expect(await stored()).toEqual([{ quote: 'A' }, { quote: 'b' }, { quote: 'c' }, { quote: 'd' }])
    })

    it('shares the queue between instances of one collection', async () => {
      const other = new Collection('quotes', backend)
      await Promise.all([collection.add({ quote: 'd' }), other.add({ quote: 'e' })])

      expect(await stored()).toHaveLength(5)
    })

    it('keeps working after a failed operation', async () => {
      await Promise.all([
        collection.find({ quote: 'missing' }).delete().catch(() => null),
        collection.add({ quote: 'd' })
      ])

      expect(await stored()).toHaveLength(4)
    })
  })

  describe('Collections#create', () => {
    let collections

    beforeEach(() => {
      backend = new DummyBackend('quotes', [{ quote: 'a' }], { [collectionsList]: ['quotes'] })
      backend.collection('books/old').write([{ title: 'kept' }])
      backend.collections('books').writeMetaInfo({ [collectionsList]: ['old'] })
      collections = new Collections('books', backend)
    })

    it('rejects and keeps data when the collection exists', async () => {
      await expect(collections.create('old')).rejects.toThrow()

      expect(await backend.collection('books/old').read()).toEqual([{ title: 'kept' }])
      expect(await collections.getList()).toEqual(['old'])
    })

    it('does not overwrite a file that is missing from the list', async () => {
      await backend.collection('books/orphan').write([{ title: 'orphan' }])
      await collections.create('orphan')

      expect(await backend.collection('books/orphan').read()).toEqual([{ title: 'orphan' }])
      expect(await collections.getList()).toEqual(['old', 'orphan'])
    })

    it('keeps both names when created without waiting', async () => {
      await Promise.all([collections.create('x'), collections.create('y')])

      expect(await collections.getList()).toEqual(['old', 'x', 'y'])
    })

    it('keeps both meta changes made without waiting', async () => {
      await Promise.all([collections.create('x'), collections.writeMetaProperty('owner', 'me')])

      expect(await backend.collections('books').readMetaInfo()).toEqual({
        [collectionsList]: ['old', 'x'],
        owner: 'me'
      })
    })
  })
})
