import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Logout = React.lazy(() => {
  return import('./containers/Auth/Logout/Logout');
});

const App = (props) => {

  useEffect(() => {
    props.onTryAutoLogin();
  }, []);

  let routes = (
    <Switch>

      <Route path="/auth"
        render={() => (
          <Auth />
        )} />

      <Route path="/" exact component={BurgerBuilder} />

      <Redirect to="/" />

    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>

        <Route path="/checkout" render={() => (
          <Checkout />
        )} />

        <Route path="/orders" render={() => (
          <Orders />
        )} />

        <Route path="/logout" render={() => (
          <Logout />
        )} />

        <Route path="/auth" render={() => (
          <Auth />
        )} />

        <Route path="/" exact component={BurgerBuilder} />

        <Redirect to="/" />

      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
      </Layout>
    </div>
  );

}

const mapStateToProps = (reduxState) => {
  return {
    isAuth: reduxState.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);