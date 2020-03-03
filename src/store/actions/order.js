import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {

  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }

}

export const purchaseBurgerFail = (err) => {

  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err
  }

}

export const purchaseInit = () => {
  
  return {
    type: actionTypes.PURCHASE_INIT
  }

}

export const purchaseBurgerStart = () => {

  return {
    type: actionTypes.PURCHASE_BURGER_START
  }

}

export const purchaseBurger = (orderData) => {

  return (dispatch) => {
    
    dispatch(purchaseBurgerStart());

    axios
      .post('/orders.json', orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });

  }

}