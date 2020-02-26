import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import styles from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipcode: ''
    }
  }

  render() {

    return (
      <div className={styles.ContactData}>
        <h4>Your data</h4>
        <form>
          <input type="text" name="name" placeholder="Your name" />
          <input type="email" name="email" placeholder="Your email" />
          <input type="text" name="street" placeholder="Your street" />
          <input type="text" name="zipcode" placeholder="Your zipcode" />
          <Button
            btnType="Success"
          >Order</Button>
        </form>
      </div>
    );

  }


}

export default ContactData;