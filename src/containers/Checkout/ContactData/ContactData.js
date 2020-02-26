import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './ContactData.module.css';

class ContactData extends Component {

  state = {
    loading: false,
    name: '',
    email: '',
    address: {
      street: '',
      zipcode: ''
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
      customer: {
        name: 'Max S.',
        address: {
          street: 'Teststraat 45',
          zipCode: '23423',
          country: 'NL'
        },
        email: 'text@test.com',
      },
      deliveryMethod: 'fastest'
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

    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="zipcode" placeholder="Your zipcode" />
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