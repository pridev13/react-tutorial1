import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/index';

import styles from './Auth.module.css'

class Auth extends Component {

  state = {
    controls: {
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Email address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elType: 'input',
        elConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }

  componentDidMount() {
    if (!this.props.building) {
      this.props.onSetAuthRedirectPath();
    }
  } 

  inputChangedHandler = (e, id) => {

    const updatedForm = updateObject(this.state.controls, {
      [id]: updateObject(this.state.controls[id], {
        value: e.target.value,
        valid: checkValidity(this.state.controls[id].value, this.state.controls[id].validation),
        touched: true
      })
    });

    this.setState({
      controls: updatedForm
    });

  }

  submitHandler = (e) => {

    e.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );

  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    });
  }

  render() {

    const formElsArray = [];
    for (let key in this.state.controls) {
      formElsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElsArray.map(formEl => (
      <Input
        key={formEl.id}

        elType={formEl.config.elType}
        elConfig={formEl.config.elConfig}
        value={formEl.config.value}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
        changed={(e) => this.inputChangedHandler(e, formEl.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>
          {this.props.error.message}
        </p>
      );
    }

    let redirect = null;
    if (this.props.isAuth) {
      redirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (

      <div className={styles.Auth}>
        {redirect}
        {errorMessage}
        <form
          onSubmit={this.submitHandler}
        >

          {form}

          <Button
            btnType="Success"
            clicked={this.orderHandler}
          // disabled={!this.state.formIsValid}
          >Submit</Button>

        </form>

        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          SWITCH TO SIGN {this.state.isSignUp ? 'IN' : 'UP'}</Button>

      </div>

    );

  }

}

const mapStateToProps = (reduxState) => {
  return {
    loading: reduxState.auth.loading,
    error: reduxState.auth.error,
    isAuth: reduxState.auth.token !== null,
    building: reduxState.bb.building,
    authRedirectPath: reduxState.auth.authRedirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pw, isSignUp) => dispatch(actions.auth(email, pw, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);