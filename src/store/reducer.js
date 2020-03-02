import * as actionTypes from './actions';

const initState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const reducer = (state = initState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      };

    case actionTypes.REMOVE_INGREDIENT:

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: Math.max(state.ingredients[action.ingredient] - 1, 0)
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      };

    default:
      return state;
  }

};

export default reducer;