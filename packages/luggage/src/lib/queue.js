// Runs operations on the same file one after another.
// Every operation reads the whole file and writes it back, so two operations
// running at the same time would overwrite each other's changes.
const queues = new WeakMap()

export default function enqueue(owner, key, operation) {
  if (!queues.has(owner)) {
    queues.set(owner, new Map())
  }

  const ownerQueues = queues.get(owner)
  const previous = ownerQueues.get(key) || Promise.resolve()
  const result = previous.then(() => operation())
  const tail = result.catch(() => null)

  ownerQueues.set(key, tail)
  tail.then(() => {
    if (ownerQueues.get(key) === tail) {
      ownerQueues.delete(key)
    }
  })

  return result
}
