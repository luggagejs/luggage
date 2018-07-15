import { parseQueryString } from '../utils'

describe('parseQueryString', () => {
  it('returns query params as object', () => {
    expect(parseQueryString('foo=bar&baz=quux')).toEqual(
      { foo: 'bar', baz: 'quux' }
    )
  })
})
