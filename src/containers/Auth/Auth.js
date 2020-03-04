import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/index';

import styles from './Auth.module.css'

class Auth extends Component {

  state = {
    // formIsValid: false,
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

  checkValidity(value, rules) {

    let isValid = true;

    if (rules.required) {
      isValid = (value.trim() !== '' && isValid);
    }

    if (rules.minLength) {
      isValid = (value.trim().length >= rules.minLength && isValid);
    }

    if (rules.maxLength) {
      isValid = (value.trim().length <= rules.maxLength && isValid);
    }

    return isValid;

  }

  inputChangedHandler = (e, id) => {
    const updatedForm = {
      ...this.state.controls,
      [id]: {
        ...this.state.controls[id],
        value: e.target.value,
        touched: true
      }
    }

    if (updatedForm[id].validation) {
      updatedForm[id].valid = this.checkValidity(updatedForm[id].value, updatedForm[id].validation);
    }

    // let formIsValid = true;
    // for (let id in updatedForm) {
    //   formIsValid = updatedForm[id].valid && formIsValid;
    // }

    this.setState({
      controls: updatedForm,
      // formIsValid: formIsValid
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

    return (

      <div className={styles.Auth}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pw, isSignUp) => dispatch(actions.auth(email, pw, isSignUp))
  }
}

export default connect(null, mapDispatchToProps)(Auth);