import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';
import { Resource } from 'mitragyna'
import { Container, Row, Col } from 'reactstrap'

import OccsnContextConsumer from '@occsn/occsn-provider';

export class Order extends PureComponent {
  static contextType = OccsnContextConsumer;

  static propTypes = {
    product: PropTypes.object.isRequired
  }

  constructor({ product }) {
    const { Product } = this.context;
    if(!product.isA?(Product)) {
      throw TypeError('Order component received prop product not of type Product');
    }

    this.state = {};
  }

  componentDidMount() {
    this.constructOrder();
  }

  async bookOrder(order) {
    try {
      order = await order.update({ status: 'reserved' })
    } catch (invalidOrder) {
      order = invalidOrder
    }

    this.setOrder(order)
  }

  constructOrder() {
    const { product } = this.props;
    const { Order } = this.context;

    occsn.Order.construct({ product, status: 'initialized' }).then(this.setOrder);
  }

  async saveOrder(order) {
    this.setOrder(await order.save());
  }

  setOrder(order) {
    this.setState({ order });
  }

  render() {
    const { children, className } = this.props;
    const { order } = this.state;

    let classNames = classnames('occsn-order-form', className);

    return (
      <section className={classNames}>
        {order && (
          <Resource
            afterError={this.setOrder}
            afterUpdate={this.saveOrder}
            onInvalidSubmit={this.setOrder}
            onSubmit={this.bookOrder}
            subject={order}
          >
            {children}
          </Resource>
        )}
      </section>
    )
  }
}
