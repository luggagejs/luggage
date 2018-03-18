/* eslint max-nested-callbacks: 0 */

import DropboxBackend from '../backends/DummyBackend'
import Collection from '../Collection'
import Filterable from '../traits/Filterable'

describe('Collection', () => {
  let collection
  let backend
  let quotes

  beforeEach(() => {
    quotes = ['test quote']
    backend = new DropboxBackend('quotes', quotes)
    collection = new Collection('quotes', backend)
  })

  describe('Collection#write', () => {
    it('writes empty collection', async () => {
      collection = new Collection('newcollection', backend)

      const data = await collection.write()
      expect(data).toEqual([])
    })
  })

  describe('Collection#read', () => {
    it('returns an array Promise', async () => {
      const data = await collection.read()
      expect(data).toEqual(quotes)
    })

    it('creates empty collection if not exists', async () => {
      collection = new Collection('nonexistent', backend)

      const data = await collection.read()
      expect(data).toEqual([])
    })
  })

  describe('Collection#add', () => {
    let newRecord

    beforeEach(() => {
      newRecord = { 'new article': 'indeed' }
    })

    it('adds new record to new collection', async () => {
      collection = new Collection('nonexistent', backend)

      const data = await collection.add(newRecord)
      expect(data).toContainEqual(newRecord)
    })

    it('adds new record to existing collection', async () => {
      const data = await collection.add(newRecord)
      expect(data).toContainEqual(newRecord)
    })

    it('returns a Promise with newly added record', async () => {
      const [record, data] = await collection.add(newRecord)
      expect(record).toEqual(newRecord)
      expect(data).toContainEqual(record)
    })
  })

  describe('Collection as Filterable', () => {
    const filters = {
      onlyQuotes(item) { return 'quote' in item },
      authorJohn(item) { return item.author === 'John Doe' },
      authorJohnObject: { author: 'John Doe' }
    }

    beforeEach(() => {
      quotes = [
        { quote: 'hey' },
        { quote: 'get', author: 'unknown' },
        { quote: 'get', author: 'John Doe' },
        { book: 'Hey you', author: 'John Doe' },
        { bla: 'blah blah blah mr. Freeman' }
      ]

      backend = new DropboxBackend('quotes', quotes)
      collection = new Collection('quotes', backend)
    })

    describe('Filterable#where', () => {
      it('returns a new Filterable instance', () => {
        let onlyWithQuotes = collection.where(filters.onlyQuotes)

        expect(onlyWithQuotes).not.toEqual(collection)
        expect(onlyWithQuotes).toBeInstanceOf(Filterable)
      })

      it('adds a filter to filters prop', () => {
        let onlyWithQuotes = collection.where(filters.onlyQuotes)
        expect(onlyWithQuotes.filter).toEqual(filters.onlyQuotes)
      })

      it('converts object filters to functions', () => {
        let onlyJohnsQuotes = collection.where(filters.authorJohnObject)
        expect(onlyJohnsQuotes.filter).toBeInstanceOf(Function)
      })
    })

    describe('Filterable#find', () => {
      it('returns undefined if nothing was found', async () => {
        const data = await collection.find({id: 42}).read()
        expect(data).toBeUndefined()
      })

      it('returns a record data if was found', async () => {
        const data = await collection.find({book: 'Hey you'}).read()
        expect(data).toEqual({ book: 'Hey you', author: 'John Doe' })
      })

      it('works on already filtered collection', async () => {
        const data = await collection
          .where({quote: 'get'})
          .find({author: 'John Doe'})
          .read()

        expect(data).toEqual({ quote: 'get', author: 'John Doe' })
      })
    })


    describe('Filterable#read', () => {
      it('returns a Promise with filtered data', async () => {
        const data = await collection
          .where(filters.onlyQuotes)
          .and(filters.authorJohn)
          .read()
        expect(data).toEqual([{ quote: 'get', author: 'John Doe' }])
      })

      it('uses objects as filters', async () => {
        let onlyJohnsQuotes = collection.where(filters.authorJohnObject)
        const data = await onlyJohnsQuotes.read()

        expect(data).toEqual([
          { quote: 'get', author: 'John Doe' },
          { book: 'Hey you', author: 'John Doe' }
        ])
      })

      describe('Filterable as EventEmitter', () => {
        it('emits data event after collection read', async () => {
          let onlyQuotes = collection.where(filters.onlyQuotes)
          const cb = jest.fn()
          onlyQuotes.on('data', cb)

          await onlyQuotes.read()
          expect(cb).toHaveBeenCalledWith([
            { quote: 'hey' },
            { author: 'unknown', quote: 'get' },
            { author: 'John Doe', quote: 'get' }
          ])
        })

        it('emits with correct payload when chained', async () => {
          let johnsQuotes = collection
            .where(filters.onlyQuotes)
            .and(filters.authorJohn)

          const cb = jest.fn()

          johnsQuotes.on('data', cb)

          await collection.add({ quote: 'get it done', author: 'John Doe' })
          expect(cb).toHaveBeenCalledWith([
            { quote: 'get', author: 'John Doe' },
            { quote: 'get it done', author: 'John Doe' }
          ])
        })
      })
    })
  })

  describe('Collection as EventEmitter', () => {
    it('emits data event after collection read', async () => {
      const cb = jest.fn()
      collection.on('data', cb)
      await collection.read()
      expect(cb).toHaveBeenCalled()
    })

    it('adds data payload to data event', async () => {
      collection.on('data', data => {
        expect(data).toEqual(quotes)
      })
      await collection.read()
    })

    it('emits data event after collection write', async () => {
      collection.on('data', data => {
        expect(data).toEqual(['somedata'])
      })
      await collection.write(['somedata'])
    })
  })
})
