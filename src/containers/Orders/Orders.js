import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  // state = {
  //   orders: [],
  //   loading: true
  // }

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {

    let orders = <Spinner />;

    if (!this.props.loading) {

      orders = this.props.orders.map((order) => (
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

}

const mapStateToProps = (reduxState) => {
  return {
    orders: reduxState.order.orders,
    loading: reduxState.order.loading,
    token: reduxState.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));