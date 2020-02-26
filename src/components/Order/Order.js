import React from 'react';

import styles from './Order.module.css';

const order = (props) => {

  const ingredients = [];

  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName]
    });
  }

  const ingOutput = ingredients.map((ing) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0px 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={ing.name}>{ing.name} ({ing.amount})</span>
    );
  });


  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>Price: <strong>$ {props.price}</strong></p>
    </div>
  );

};

export default order;