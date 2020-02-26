import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

  return (
    <div className={styles.CheckoutSummary}>
      <h1>
        Hope you enjoy!
      </h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        clicked={props.onCheckoutCancelled}
        btnType="Danger">Cancel</Button>
      <Button
        clicked={props.onCheckoutContinued}
        btnType="Success">Continue</Button>
    </div>
  );

}

export default checkoutSummary;