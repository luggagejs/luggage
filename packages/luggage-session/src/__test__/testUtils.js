export const setURL = url => {
  const parser = document.createElement('a')
  const props = [
    'href', 'protocol', 'host', 'hostname',
    'origin', 'port', 'pathname', 'search', 'hash'
  ]

  parser.href = url

  props.forEach(prop => {
    Object.defineProperty(window.location, prop, {
      value: parser[prop],
      writable: true
    })
  })
}
