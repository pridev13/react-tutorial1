import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {

    axios.get('/orders.json')
      .then((res) => {

        // console.log(res.data);
        const foundOrders = [];

        for (let key in res.data) {
          foundOrders.push({
            ...res.data[key],
            id: key
          });
        }

        // console.log(foundOrders);

        this.setState({
          loading: false,
          orders: foundOrders
        });

      })
      .catch((e) => {
        this.setState({ loading: false });
      })

  }

  render() {

    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );

  }

}

export default withErrorHandler(Orders, axios);