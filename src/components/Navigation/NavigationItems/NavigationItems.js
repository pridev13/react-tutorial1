import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem exact link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    {props.isAuth
      ? <NavigationItem link="/logout">Log out</NavigationItem>
      : <NavigationItem link="/auth">Log in</NavigationItem>
    }
  </ul>
);

export default navigationItems;