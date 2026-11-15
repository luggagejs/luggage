// Minimal event emitter with the on/off/emit API of Node's EventEmitter
// (the part that luggage and its users rely on).
export default class Emitter {
  #listeners = new Map()

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, [])
    }
    this.#listeners.get(event).push(listener)
    return this
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper)
      listener.apply(this, args)
    }
    wrapper.listener = listener
    return this.on(event, wrapper)
  }

  off(event, listener) {
    const listeners = this.#listeners.get(event)

    if (listeners) {
      const index = listeners.findIndex(l => l === listener || l.listener === listener)

      if (index !== -1) {
        listeners.splice(index, 1)
      }
      if (listeners.length === 0) {
        this.#listeners.delete(event)
      }
    }
    return this
  }

  removeListener(event, listener) {
    return this.off(event, listener)
  }

  removeAllListeners(event) {
    if (typeof event === 'undefined') {
      this.#listeners.clear()
    } else {
      this.#listeners.delete(event)
    }
    return this
  }

  listenerCount(event) {
    return (this.#listeners.get(event) || []).length
  }

  emit(event, ...args) {
    const listeners = this.#listeners.get(event)

    if (!listeners) {
      return false
    }
    listeners.slice().forEach(listener => listener.apply(this, args))
    return true
  }
}
