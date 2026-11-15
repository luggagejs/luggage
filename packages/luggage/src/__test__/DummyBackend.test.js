import DummyBackend from '../backends/DummyBackend.js'

describe('DummyBackend', () => {
  it('keeps written data for later reads', async () => {
    const backend = new DummyBackend('quotes', ['a'])
    await backend.collection('quotes').write(['a', 'b'])

    expect(await backend.collection('quotes').read()).toEqual(['a', 'b'])
  })

  it('keeps data written to a collection that did not exist', async () => {
    const backend = new DummyBackend('quotes', [])
    await backend.collection('other').write(['x'])

    expect(await backend.collection('other').read()).toEqual(['x'])
  })

  it('returns a copy on read, like a downloaded file', async () => {
    const backend = new DummyBackend('quotes', [{ a: 1 }])
    const data = await backend.collection('quotes').read()
    data.push({ a: 2 })

    expect(await backend.collection('quotes').read()).toEqual([{ a: 1 }])
  })

  it('keeps meta info for collections that were not configured', async () => {
    const backend = new DummyBackend('quotes', [])
    await backend.collections('other').writeMetaInfo({ x: 1 })

    expect(await backend.collections('other').readMetaInfo()).toEqual({ x: 1 })
  })
})
