import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authSuccess = (state, action) => {

  return updateObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId
  });

}

const authFail = (state, action) => {

  return updateObject(state, {
    error: action.error,
    loading: false,
    token: null,
    userId: null
  });

}

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
}

const reducer = (state = initState, action) => {

  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {
        loading: true,
        error: null
      });

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);

    default:
      return state;
  }

}

export default reducer;