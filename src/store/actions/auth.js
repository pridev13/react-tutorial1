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
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
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

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_API_KEY;

    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_API_KEY;
    }

    axios
      .post(url, authData)
      .then((res) => {
        // console.log(res);

        const expDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));

        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', expDate);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(authFail(err.response.data.error));
      });

  }

}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {

  return (dispatch) => {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      dispatch(authLogout());
    }
    else {
      const expDate = new Date(localStorage.getItem('expirationDate'));

      if (expDate > new Date()) {

        dispatch(authSuccess(token, userId));

        dispatch(checkAuthTimeout(
          (expDate.getTime() - new Date().getTime()) / 1000
        ));

      }
      else {
        dispatch(authLogout());
      }

    }

  }

}