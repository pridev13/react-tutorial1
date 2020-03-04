import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
  ingredients: null,
  totalPrice: 5.3,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const addIngredient = (state, ing) => {

  const updIngs = updateObject(state.ingredients, {
    [ing]: state.ingredients[ing] + 1
  });

  return updateObject(state, {
    ingredients: updIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[ing]
  });

}

const removeIngredient = (state, ing) => {

  const updIngs = updateObject(state.ingredients, {
    [ing]: Math.max(state.ingredients[ing] - 1, 0)
  });

  return updateObject(state, {
    ingredients: updIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[ing]
  });

}

const setIngredients = (state, ings) => {

  return updateObject(state, {
    ingredients: {
      salad: ings.salad,
      bacon: ings.bacon,
      cheese: ings.cheese,
      meat: ings.meat
    },
    error: false,
    totalPrice: initState.totalPrice
  });

}

const fetchFailed = (state) => {
  return updateObject(state, { error: true });
}

const reducer = (state = initState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action.ingredient);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action.ingredient);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action.ingredients);

    case actionTypes.FETCH_FAILED:
      return fetchFailed(state);

    default:
      return state;
  }

};

export default reducer;