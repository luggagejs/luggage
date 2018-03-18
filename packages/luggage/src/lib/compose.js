export default function ComposeWithClass(...mixins) {
  return (clazz) => {
    const subclazz = class extends clazz {}

    for (let mixin of mixins) {
      Object.assign(subclazz.prototype, mixin)
    }

    return subclazz
  }
}
