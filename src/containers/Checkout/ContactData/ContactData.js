import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../../shared/utility';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import styles from './ContactData.module.css';

class ContactData extends Component {

  state = {
    formIsValid: true,
    orderForm: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: 'Piet',
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: 'Street 1',
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      zipCode: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your zipcode',
        },
        value: '1234',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4,
          isNumeric: true
        },
        valid: true,
        touched: false
      },
      country: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your country',
        },
        value: 'NL',
        validation: {
          required: true
        },
        valid: true,
        touched: false
      },
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: 'test@example.com',
        validation: {
          required: true,
          isEmail: true
        },
        valid: true,
        touched: false
      },
      deliveryMethod: {
        elType: 'select',
        elConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        valid: true
      },
    }
  }

  orderHandler = (e) => {

    e.preventDefault();

    const formData = {};

    for (let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.prc.toFixed(2),
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);

  }

   inputChangedHandler = (e, id) => {
    
    const updatedFormEl = updateObject(this.state.orderForm[id], {
      value: e.target.value,
      valid: checkValidity(e.target.value, this.state.orderForm[id].validation),
      touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [id]: updatedFormEl
    });

    let formIsValid = true;
    for(let id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });

  }

  render() {

    const formElsArray = [];
    for (let key in this.state.orderForm) {
      formElsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>

        {formElsArray.map(formEl => (
          <Input
            elType={formEl.config.elType}
            elConfig={formEl.config.elConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            key={formEl.id}
            changed={(e) => this.inputChangedHandler(e, formEl.id)}
          />
        ))}

        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >Order</Button>
        
      </form>
    );

    if (this.props.ldng) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Your data</h4>
        {form}
      </div>
    );

  }

}

const mapStateToProps = (reduxState) => {

  return {
    ings: reduxState.bb.ingredients,
    prc: reduxState.bb.totalPrice,
    ldng: reduxState.order.loading,
    token: reduxState.auth.token,
    userId: reduxState.auth.userId
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));