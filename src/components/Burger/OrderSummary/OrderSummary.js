import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
      .map((igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your order</h3>
        <p>This is your burger:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: ${props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button
          btnType="Danger"
          clicked={props.purchaseCanceled}>
          CANCEL</Button>
        <Button
          btnType="Success"
          clicked={props.purchaseContinue}
        >CONTINUE</Button>
      </Aux>
    );

};

export default orderSummary;