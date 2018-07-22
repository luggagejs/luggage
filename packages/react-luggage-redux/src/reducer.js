import { lens, multi } from 'lorgnette'
import * as actions from './actions'

const initialState = {
  collections: {},
  user: {
    authenticated: false
  },
  meta: {
    collections: {},
    syncing: false
  }
}

const userLens = lens.prop('user')
const syncingLens = lens.prop('meta').prop('syncing')
const collectionsLens = name => multi(
  lens.prop('collections').prop(name, []),
  lens.prop('meta').prop('collections').prop(name)
)

const luggageReducer = (state = initialState, action) => {
  switch(action.type) {
  case actions.UPDATE_USER_SUCCESS:
    return userLens.update(state, u => ({ ...u, ...action.data }))
  case actions.UPDATE_COLLECTION_SUCCESS:
    return collectionsLens(action.collectionName).set(state, action.data, action.collection)
  case actions.START_SYNCING:
    return syncingLens.set(state, true)
  case actions.FINISH_SYNCING:
    return syncingLens.set(state, false)
  default:
    return state
  }
}

export default luggageReducer
