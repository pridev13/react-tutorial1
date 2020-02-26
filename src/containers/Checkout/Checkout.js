import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    }
  }

  componentDidMount() {

    const newIngr = {};

    const query = new URLSearchParams(this.props.location.search);

    for (let param of query.entries()) {
      newIngr[param[0]] = +param[1];
    }

    this.setState({ ingredients: newIngr });

  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/step2');
  }

  render() {

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/step2'}
          component={ContactData}
        />
      </div>
    );

  }

}

export default Checkout;