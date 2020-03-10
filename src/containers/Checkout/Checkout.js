import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/step2');
  }

  let summary = <Redirect to="/" />;

  if (props.ings) {

    const purchasedRedirect = props.prchsd ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/step2'}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;

}

const mapStateToProps = (reduxState) => {

  return {
    ings: reduxState.bb.ingredients,
    prchsd: reduxState.order.purchased
  };

};

export default connect(mapStateToProps)(Checkout);