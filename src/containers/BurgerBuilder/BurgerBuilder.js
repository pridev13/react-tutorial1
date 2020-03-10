import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const dispatch = useDispatch();

  const ings = useSelector((state) => state.bb.ingredients);
  const prc = useSelector((state) => state.bb.totalPrice);
  const err = useSelector((state) => state.bb.error);
  const isAuth = useSelector((state) => state.auth.token !== null);

  const onIngAdded = (ing) => dispatch(actions.addIngredient(ing));
  const onIngRemoved = (ing) => dispatch(actions.removeIngredient(ing));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

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

    if (isAuth) {
      setPurchasing(true);
    }
    else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }

  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...ings};

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = <Spinner />;

  if (err) {
    burger = <p style={{ textAlign: 'center' }}>Ingredients could not be loaded</p>;
  }
  else if (ings) {

    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngAdded}
          ingredientRemoved={onIngRemoved}
          disabled={disabledInfo}
          price={prc}
          purchasable={burgerIsPurchasable(ings)}
          ordered={purchaseHandler}
          isAuth={isAuth}
        />
      </Aux>
    );

    orderSummary = <OrderSummary
      ingredients={ings}
      price={prc.toFixed(2)}
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

export default withErrorHandler(BurgerBuilder, axios);