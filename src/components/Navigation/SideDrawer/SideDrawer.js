import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {

  let attClasses = [
    styles.SideDrawer,
    styles.Close
  ];

  if (props.open) {
    attClasses = [
      styles.SideDrawer,
      styles.Open
    ];
  }

  return (
    <Aux>
      <Backdrop
        show={props.open}
        clicked={props.closed}
      />
      <div className={attClasses.join(' ')} onClick={props.closed}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            isAuth={props.isAuth}
          />
        </nav>
      </div>
    </Aux>
  );

};

export default sideDrawer;