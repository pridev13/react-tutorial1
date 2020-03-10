import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/index';

import styles from './Auth.module.css'

const Auth = (props) => {

  const [controls, setControls] = useState({
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
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const { building, onSetAuthRedirectPath } = props;

  useEffect(() => {

    if (!building) {
      onSetAuthRedirectPath();
    }

  }, [building, onSetAuthRedirectPath]);

  const inputChangedHandler = (e, id) => {

    const updatedForm = updateObject(controls, {
      [id]: updateObject(controls[id], {
        value: e.target.value,
        valid: checkValidity(controls[id].value, controls[id].validation),
        touched: true
      })
    });

    setControls(updatedForm);

  }

  const submitHandler = (e) => {

    e.preventDefault();

    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp
    );

  }

  const switchAuthModeHandler = () => {

    setIsSignUp((pState) => {
      return !pState;
    });

  }

  const formElsArray = [];
  for (let key in controls) {
    formElsArray.push({
      id: key,
      config: controls[key]
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
      changed={(e) => inputChangedHandler(e, formEl.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p>
        {props.error.message}
      </p>
    );
  }

  let redirect = null;
  if (props.isAuth) {
    redirect = <Redirect to={props.authRedirectPath} />;
  }

  return (

    <div className={styles.Auth}>
      {redirect}
      {errorMessage}
      <form
        onSubmit={submitHandler}
      >

        {form}

        <Button
          btnType="Success"
          clicked={submitHandler}
        >Submit</Button>

      </form>

      <Button
        btnType="Danger"
        clicked={switchAuthModeHandler}
      >
        SWITCH TO SIGN {isSignUp ? 'IN' : 'UP'}</Button>

    </div>

  );

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