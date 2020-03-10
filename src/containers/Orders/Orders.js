import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {

  const {token, userId, onFetchOrders} = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [token, userId, onFetchOrders]);

  let orders = <Spinner />;

  if (!props.loading) {

    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ))

  }

  return (
    <div>
      {orders}
    </div>
  );

}

const mapStateToProps = (reduxState) => {
  return {
    orders: reduxState.order.orders,
    loading: reduxState.order.loading,
    token: reduxState.auth.token,
    userId: reduxState.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, uid) => dispatch(actions.fetchOrders(token, uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));