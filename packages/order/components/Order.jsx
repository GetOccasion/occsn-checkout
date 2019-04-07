import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';
import { Resource } from 'mitragyna'
import { Container, Row, Col } from 'reactstrap'

import OccsnContextConsumer from '@occsn/occsn-provider';

import OrderForm from './OrderForm';

export class Order extends PureComponent {
  static contextType = OccsnContextConsumer

  static propTypes = {
    product: PropTypes.object.isRequired
  }

  constructor({ onChange, product }) {
    const { occsn: { Product }} = this.context
    if(!product.isA?(Product)) {
      throw TypeError('Order component received prop product not of type Product');
    }

    this.onChange = onChange
    this.state = {}
  }

  componentDidMount() {
    this.constructOrder()
  }

  bookOrder = async (order) => {
    try {
      order = await order.update({ status: 'reserved' })
    } catch (invalidOrder) {
      order = invalidOrder
    }

    this.setOrder(order)
  }

  constructOrder = () => {
    const { product } = this.props
    const { occsn: { Order }} = this.context

    occsn.Order.construct({ product, status: 'initialized' }).then(this.setOrder);
  }

  saveOrder = async (order) => {
    this.setOrder(await order.save())
  }

  setOrder = (order) => {
    this.setState({ order }, () => this.onChange(order))
  }

  render() {
    const { children, className } = this.props
    const { order } = this.state

    let classNames = classnames('occsn-order-form', className)

    return (
      <section className={classNames}>
        {order && (
          <Resource
            afterError={this.setOrder}
            afterUpdate={this.saveOrder}
            component={OrderForm}
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
