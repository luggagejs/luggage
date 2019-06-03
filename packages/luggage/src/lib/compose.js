export default function ComposeWithClass(...mixins) {
  return (clazz) => {
    const subclazz = class extends clazz {}

    for (let i = 0; i < mixins.length; i++) {
      Object.assign(subclazz.prototype, mixins[i])
    }

    return subclazz
  }
}
