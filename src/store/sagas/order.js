import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {

  yield put(actions.purchaseBurgerStart());

  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  }
  catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }

}

export function* fetchOrdersSaga(action) {

  yield put(actions.fetchOrdersStart());

  const qParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

  try {

    const res = yield axios.get('/orders.json' + qParams);
    const foundOrders = [];

    for (let key in res.data) {
      foundOrders.push({
        ...res.data[key],
        id: key
      });
    }

    yield put(actions.fetchOrdersSuccess(foundOrders));

  }
  catch (e) {
    yield put(actions.fetchOrdersFail(e));
  }

}