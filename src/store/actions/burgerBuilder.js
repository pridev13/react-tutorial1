import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {

  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingName
  };

}

export const removeIngredient = (ingName) => {

  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingName
  };

}

export const setIngredients = (ings) => {
  
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings
  }

}

export const fetchFailed = () => {
  
  return {
    type: actionTypes.FETCH_FAILED
  }

}


export const initIngredients = () => {

  return (dispatch) => {

    axios
      .get('ingredients.json')
      .then(
        (res) => {
          dispatch(setIngredients(res.data));
        }
      )
      .catch(
        (error) => {
          dispatch(fetchFailed());
        }
      );
  }

}