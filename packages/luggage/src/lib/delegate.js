export default function delegate(that, what, whom) {
  that[what] = whom[what].bind(whom)
}
