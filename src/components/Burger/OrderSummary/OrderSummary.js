import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
// import styles from './Modal.module.css';

class OrderSummary extends Component {
  //This could be a functional component
  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
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
        <p><strong>Total price: ${this.props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button
          btnType="Danger"
          clicked={this.props.purchaseCanceled}>
          CANCEL</Button>
        <Button
          btnType="Success"
          clicked={this.props.purchaseContinue}
        >CONTINUE</Button>
      </Aux>
    );

  }

};

export default OrderSummary;