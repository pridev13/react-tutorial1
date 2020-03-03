import * as actionTypes from '../actions/actionTypes';

const initState = {
  ingredients: null,
  totalPrice: 4,
  // loading: false,
  error: false
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

    case actionTypes.SET_INGREDIENTS: 

      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4
      };

    case actionTypes.FETCH_FAILED:

      return {
        ...state,
        error: true
      };

    default:
      return state;
  }

};

export default reducer;