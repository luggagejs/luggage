import { lens, multi } from 'lorgnette'
import {
  UPDATE_USER_SUCCESS,
  UPDATE_COLLECTION_SUCCESS
} from './actions'

const initialState = {
  collections: {},
  user: {
    authenticated: false
  },
  meta: {
    collections: {}
  }
}

const userLens = lens.prop('user')
const collectionsLens = name => multi(
  lens.prop('collections').prop(name, []),
  lens.prop('meta').prop('collections').prop(name)
)

const luggageReducer = (state = initialState, action) => {
  switch(action.type) {
  case UPDATE_USER_SUCCESS:
    return userLens.update(state, u => ({ ...u, ...action.data }))
  case UPDATE_COLLECTION_SUCCESS:
    return collectionsLens(action.collectionName).set(state, action.data, action.collection)
  default:
    return state
  }
}

export default luggageReducer
