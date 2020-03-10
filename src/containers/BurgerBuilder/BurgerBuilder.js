import React, { useEffect, useState } from 'react';
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

const BurgerBuilder = (props) => {

  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const burgerIsPurchasable = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;

  }

  const purchaseHandler = () => {

    if (props.isAuth) {
      setPurchasing(true);
    }
    else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }

  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = <Spinner />;

  if (props.err) {
    burger = <p style={{ textAlign: 'center' }}>Ingredients could not be loaded</p>;
  }
  else if (props.ings) {

    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngAdded}
          ingredientRemoved={props.onIngRemoved}
          disabled={disabledInfo}
          price={props.prc}
          purchasable={burgerIsPurchasable(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
        />
      </Aux>
    );

    orderSummary = <OrderSummary
      ingredients={props.ings}
      price={props.prc.toFixed(2)}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinue={purchaseContinueHandler}
    />;

  }

  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );

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