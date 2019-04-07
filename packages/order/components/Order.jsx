import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';
import { Resource } from 'mitragyna'
import { Container, Row, Col } from 'reactstrap'
import _ from 'underscore';

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
    this.state = {
      bookingOrder: false,
      order: null,
      savingOrder: false
    }
  }

  componentDidMount() {
    this.constructOrder()
  }

  bookOrder = (order) => {
    this.setState({
      bookingOrder: true
    }, async () => {
      try {
        order = await order.update({ status: 'reserved' })
      } catch (invalidOrder) {
        order = invalidOrder
      }

      this.setOrder(order, () => this.setState({ bookingOrder: false }))
    })
  }

  constructOrder = () => {
    const { product } = this.props
    const { occsn: { Order }} = this.context

    occsn.Order.construct({ product, status: 'initialized' }).then(this.setOrder)
  }

  isBooking = () => {
    return this.state.bookingOrder
  }

  isSaving = () => {
    return this.state.savingOrder
  }

  saveOrder = async (order) => {
    this.setState({
      savingOrder: true
    }, async () => {
      let order = await order.save()

      this.setOrder(order, () => this.setState({ savingOrder: false }))
    })
  }

  setOrder = (order, onSet = _.noop) => {
    this.setState({ order }, () => {
      onSet(order)
      this.onChange(order)
    })
  }

  render() {
    const { children, className } = this.props
    const { bookingOrder, order, savingOrder } = this.state

    let classNames = classnames('occsn-order-form', className)

    return (
      <section className={classNames}>
        {order && (
          <Resource
            afterError={this.setOrder}
            afterUpdate={this.saveOrder}
            component={OrderForm}
            componentProps={{
              bookingOrder,
              savingOrder
            }}
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
