import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';
import { Resource } from 'mitragyna'
import { Container, Row, Col } from 'reactstrap'
import _ from 'underscore';

import {OccsnContext} from '@occsn/occsn-provider';

export default class Order extends PureComponent {
  static contextType = OccsnContext

  static propTypes = {
    onChange: PropTypes.func,
    product: PropTypes.object.isRequired
  }

  static defaultProps = {
    onChange: _.noop
  }

  constructor({ onChange, product }) {
    super()

    this.onChange = onChange
    this.resourceRef = React.createRef();

    this.state = {
      bookingOrder: false,
      order: null,
      savingOrder: false
    }
  }

  componentDidMount() {
    const { product } = this.props
    const { occsn: { Product }, registerComponent } = this.context

    if(!(product.isA && product.isA(Product))) {
      throw TypeError('Order component received prop product not of type Product');
    }

    registerComponent('order', this)

    this.constructOrder()
  }

  allowedToBookOrder = () => {
    const { components: { missingAnswers }} = this.context
    const { bookingOrder, order, savingOrder } = this.state

    if (!order || !missingAnswers) return false

    return (
      !bookingOrder && !savingOrder && missingAnswers.missingRequiredAnswers(order).empty()
    )
  }

  validateOrderBookable = (order) => {
    const { paymentForm, redeemables } = this.context

    // If the user hits enter while focused on the redeemables input, then submit the
    // redeemable search and cancel the order form submissionm
    if (redeemables && redeemables.state.focused) {
      redeemables.checkForRedeemable(redeemables.state.code)
      throw order
    }

    if (!order.outstandingBalance.isZero()) {
      let balanceTransaction = order
        .transactions()
        .target()
        .detect(t => !(t.paymentMethod() && t.paymentMethod(occsn.GiftCard)))

      if (balanceTransaction)
        order
          .transactions()
          .target()
          .delete(balanceTransaction)

      return paymentForm.chargeOutstandingBalanceToPaymentMethod(order)
    } else {
      return order
    }
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

    Order.construct({ product, status: 'initialized' }).then(this.setOrder)
  }

  isBooking = () => {
    return this.state.bookingOrder
  }

  isSaving = () => {
    return this.state.savingOrder
  }

  getOrder = () => {
    return this.state.order
  }

  saveOrder = async (order) => {
    this.setState({
      savingOrder: true
    }, async () => {
      let newOrder = await order.save()

      this.setOrder(newOrder, () => this.setState({ savingOrder: false }))
    })
  }

  setOrder = (order, onSet = _.noop) => {
    this.setState({ order }, () => {
      onSet(order)
      this.onChange(order)
    })
  }

  // Used by bookOrder button to initiate form submission
  submit = () => {
    this.resourceRef.handleSubmit();
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
            beforeSubmit={this.validateOrderBookable}
            onInvalidSubmit={this.setOrder}
            onSubmit={this.bookOrder}
            ref={this.resourceRef}
            subject={order}
          >
            {children}
          </Resource>
        )}
      </section>
    )
  }
}
