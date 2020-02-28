import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {

  state = {
    loading: false,
    orderForm: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: ''
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: ''
      },
      zipCode: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your zipcode',
        },
        value: ''
      },
      country: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your country',
        },
        value: ''
      },
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: ''
      },
      deliveryMethod: {
        elType: 'select',
        elConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: ''
      },
    }
  }

  orderHandler = (e) => {
    e.preventDefault();
    // console.log(this.props.ingredients);

    this.setState({ loading: true });

    // alert('You continue');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // customer: {
      //   name: 'Max S.',
      //   address: {
      //     street: 'Teststraat 45',
      //     zipCode: '23423',
      //     country: 'NL'
      //   },
      //   email: 'text@test.com',
      // },
      // deliveryMethod: 'fastest'
    }

    axios
      .post('/orders.json', order)
      .then((response) => {
        // console.log(response);
        this.setState({ loading: false });
        this.props.history.replace('/');
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ loading: false });
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
      <form>

        {formElsArray.map(formEl => (
          <Input
            elType={formEl.config.elType}
            elConfig={formEl.config.elConfig}
            value={formEl.config.value}
            key={formEl.id}
          />
        ))}

        <Button
          btnType="Success"
          clicked={this.orderHandler}
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