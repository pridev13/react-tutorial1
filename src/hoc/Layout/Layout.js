import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuth}
          />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
        />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
};

const mapStateToProps = (reduxState) => {
  return {
    isAuth: reduxState.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);