import React from 'react';

import styles from './Input.module.css';

const input = (props) => {

  let inputElement = null;

  switch (props.elType) {
    case ('input'):
      inputElement = <input
        className={styles.InputElement}
        {...props.elConfig}
        value={props.value}
      />;
      break;
    case ('select'):
      inputElement = (
        <select
          className={styles.InputElement}
          value={props.value}
        >
          
          {props.elConfig.options.map((opt) => (
            <option
              value={opt.value}
              key={opt.value}
            >
              {opt.displayValue}
            </option>
          ))}

        </select>
      );
      break;
    case ('textarea'):
      inputElement = <textarea
        className={styles.InputElement}
        {...props.elConfig}
        value={props.value}
      />;
      break;
    default:
      inputElement = <input
        className={styles.InputElement}
        {...props.elConfig}
        value={props.value}
      />;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );

}

export default input;