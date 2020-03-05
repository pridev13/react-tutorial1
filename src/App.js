import React, { Component, Suspense } from 'react';
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


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {

    let routes = (
      <Switch>

        <Route path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          )} />

        <Route path="/" exact component={BurgerBuilder} />

        <Redirect to="/" />

      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>

          <Route path="/checkout" render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Checkout />
            </Suspense>
          )} />

          <Route path="/orders" render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Orders />
            </Suspense>
          )} />

          <Route path="/logout" render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Logout />
            </Suspense>
          )} />

          <Route path="/auth" render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          )} />

          <Route path="/" exact component={BurgerBuilder} />

          <Redirect to="/" />

        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );

  }

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