import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {

  state = {
    loading: false,
    formIsValid: false,
    orderForm: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your zipcode',
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 4
        },
        valid: false,
        touched: false
      },
      country: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your country',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
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
        value: '',
        valid: true
      },
    }
  }

  orderHandler = (e) => {

    e.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }

    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.replace('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

  }

  checkValidity(value, rules) {

    let isValid = true;

    if(rules.required) {
      isValid = (value.trim() !== '' && isValid);
    }

    if(rules.minLength) {
      isValid = (value.trim().length >= rules.minLength && isValid);
    }

    if(rules.maxLength) {
      isValid = (value.trim().length <= rules.maxLength && isValid);
    }

    return isValid;

  }

  inputChangedHandler = (e, id) => {
    const updatedOrderForm ={
      ...this.state.orderForm
    }
    
    const updatedFormEl = {
      ...updatedOrderForm[id]
    }

    updatedFormEl.value = e.target.value;

    if(updatedFormEl.validation) {
      updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
    }

    updatedFormEl.touched = true;

    updatedOrderForm[id] = updatedFormEl;

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

    if (this.state.loading) {
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

export default ContactData;