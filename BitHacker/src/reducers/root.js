import { ROOT_CHANGED } from '../actions/actiontypes';

export function root(state = {
  root: undefined
}, action = {}) {
  switch (action.type) {
    case ROOT_CHANGED:
      return {
        ...state,
        root: action.root
      };
    default:
      return state;
  }
}
