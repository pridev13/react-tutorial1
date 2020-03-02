import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
          ingredients={this.props.ings}
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

const mapStateToProps = (reduxState) => {

  return {
    ings: reduxState.ingredients
  };

};

export default connect(mapStateToProps)(Checkout);