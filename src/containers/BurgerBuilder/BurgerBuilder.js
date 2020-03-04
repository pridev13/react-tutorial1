import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  burgerIsPurchasable(ingredients) {
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuth) {
      this.setState({ purchasing: true });
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;

    if (this.props.err) {
      burger = <p style={{ textAlign: 'center' }}>Ingredients could not be loaded</p>;
    }
    else if (this.props.ings) {

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngAdded}
            ingredientRemoved={this.props.onIngRemoved}
            disabled={disabledInfo}
            price={this.props.prc}
            purchasable={this.burgerIsPurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.prc.toFixed(2)}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />;

    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }

}

const mapStateToProps = (reduxState) => {

  return {
    ings: reduxState.bb.ingredients,
    prc: reduxState.bb.totalPrice,
    err: reduxState.bb.error,
    isAuth: reduxState.auth.token !== null
  };

}

const mapDispatchToProps = (dispatch) => {

  return {
    onIngAdded: (ing) => dispatch(actions.addIngredient(ing)),
    onIngRemoved: (ing) => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));