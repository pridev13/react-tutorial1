import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios
    //   .get('ingredients.json')
    //   .then(
    //     (res) => {
    //       this.setState({ ingredients: res.data });
    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       this.setState({ error: true });
    //     }
    //   );
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
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
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

    if (this.state.error) {
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
    ings: reduxState.ingredients,
    prc: reduxState.totalPrice
  };

}

const mapDispatchToProps = (dispatch) => {

  return {
    onIngAdded: (ing) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ing}),
    onIngRemoved: (ing) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ing})
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));