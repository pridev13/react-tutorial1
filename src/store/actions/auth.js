import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expTime) => {
  
  return (dispatch) => {
    
    setTimeout(() => {
      dispatch(authLogout());
    }, expTime * 1000);

  }

}

export const auth = (email, pw, isSignUp) => {

  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: pw,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm0TK3OpgtbvDxEFK0BtIW38-Q2OODeDE';

    if(!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm0TK3OpgtbvDxEFK0BtIW38-Q2OODeDE';
    }

    axios
      .post(
        url,
        authData
      )
      .then((res) => {
        // console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(authFail(err.response.data.error));
      });

  }

}