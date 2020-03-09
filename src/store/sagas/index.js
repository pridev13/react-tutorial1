import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { authLogoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INIT_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBB() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
  yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
}