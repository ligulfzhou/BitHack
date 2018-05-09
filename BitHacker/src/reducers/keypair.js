import { REQUEST_KEYPAIRS, RECEIVE_KEYPAIRS } from '../actions/actiontypes';
import { REQUEST_PAGEN_KEYPAIRS, RECEIVE_PAGEN_KEYPAIRS } from '../actions/actiontypes';

export const keypairs = (state={
  isFetching: false,
  didInvalidate: false,
  items: [],
  number: 0
}, action={}) => {
  switch(action.type){
    case REQUEST_KEYPAIRS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_KEYPAIRS:
      return {
        ...state,
        isFetching: false,
        items: action.keypairs,
        number: action.number
      }
    default:
      return state
  }
}

export const pageNKeypairs = (state={
  isFetching: false,
  didInvalidate: false,
}, action={}) => {
  switch(action.type) {
    case REQUEST_PAGEN_KEYPAIRS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PAGEN_KEYPAIRS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        [action.page]: action.keypairs
      }
    default:
      return state
  }
}