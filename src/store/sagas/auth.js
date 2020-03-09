import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions/index';

import axios from 'axios';

export function* authLogoutSaga(action) {

  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'userId');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield put(actions.logoutSucceed());

}

export function* checkAuthTimeoutSaga(action) {

  yield delay(action.expTime * 1000);
  yield put(actions.authLogout());

}

export function* authSaga(action) {

  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.pw,
    returnSecureToken: true
  };

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_FIREBASE_API_KEY;

  if (!action.isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_FIREBASE_API_KEY;
  }

  try {
    const res = yield axios.post(url, authData)

    const expDate = yield new Date(new Date().getTime() + (res.data.expiresIn * 1000));

    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('userId', res.data.localId);
    yield localStorage.setItem('expirationDate', expDate);

    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));

  }
  catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }

}

export function* authCheckStateSaga(action) {

  const token = yield localStorage.getItem('token');
  const userId = yield localStorage.getItem('userId');

  if (!token || !userId) {
    yield put(actions.authLogout());
  }
  else {
    const expDate = yield new Date(localStorage.getItem('expirationDate'));

    if (expDate > new Date()) {

      yield put(actions.authSuccess(token, userId));

      yield put(actions.checkAuthTimeout(
        (expDate.getTime() - new Date().getTime()) / 1000
      ));

    }
    else {
      yield put(actions.authLogout());
    }

  }


}