export const createAction = (type, ...argNames) => (...args) => {
  const action = { type }
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index]
  })
  return action
}

export const createHandler = handlers => ({getState, dispatch, next, action}) => {
  if (handlers.hasOwnProperty(action.type)) {
    handlers[action.type]({getState, dispatch, next, action})
  }
  next(action)
}
