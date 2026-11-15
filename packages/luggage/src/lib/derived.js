import events from '../constants/events.js'

// Filtered collections and records re-emit data events of their source.
// They subscribe to the source only while they have data listeners themselves,
// so a where()/find() that nobody listens to does not stay in memory.
const derived = Base => class extends Base {
  #sourceListener = null

  // Implemented by subclasses
  get source() {
    throw new Error('Not implemented')
  }

  transformData(data) {
    return data
  }

  on(event, listener) {
    super.on(event, listener)
    if (event === events.DATA_EVENT && !this.#sourceListener) {
      this.#sourceListener = data => this.emit(events.DATA_EVENT, this.transformData(data))
      this.source.on(events.DATA_EVENT, this.#sourceListener)
    }
    return this
  }

  off(event, listener) {
    super.off(event, listener)
    this.#detachIfUnused()
    return this
  }

  removeAllListeners(event) {
    super.removeAllListeners(event)
    this.#detachIfUnused()
    return this
  }

  // Removes all listeners and unsubscribes from the source
  dispose() {
    this.removeAllListeners()
  }

  #detachIfUnused() {
    if (this.#sourceListener && this.listenerCount(events.DATA_EVENT) === 0) {
      this.source.off(events.DATA_EVENT, this.#sourceListener)
      this.#sourceListener = null
    }
  }
}

export default derived
