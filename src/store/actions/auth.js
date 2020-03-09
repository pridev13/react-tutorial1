import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expTime) => {

  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expTime: expTime
  }

}

export const auth = (email, pw, isSignUp) => {

  return {
    type: actionTypes.AUTH_USER,
    email: email,
    pw: pw,
    isSignUp: isSignUp
  }

}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {

  return {
    type: actionTypes.AUTH_CHECK_STATE
  }

}