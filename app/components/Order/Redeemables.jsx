import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Decimal from 'decimal.js-light'
import _ from 'underscore'

import ActiveResource from 'active-resource'

import occsn from '../../libs/Occasion'

import { ErrorsFor } from 'mitragyna'
import {
  Button,
  Col,
  Card,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  FormFeedback
} from 'reactstrap'

import Coupon from './Redeemables/Coupon.jsx'
import GiftCard from './Redeemables/GiftCard.jsx'

export default class Redeemables extends PureComponent {
  static propTypes = {
    findRedeemable: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onErrors: PropTypes.func.isRequired,
    order: PropTypes.instanceOf(occsn.Order).isRequired
  }

  static childContextTypes = {
    removeRedeemable: PropTypes.func
  }

  constructor() {
    super()

    _.bindAll(
      this,
      'addErrors',
      'addRedeemable',
      'checkForRedeemable',
      'handleChange',
      'showInput',
      'removeRedeemable'
    )
  }

  componentWillMount() {
    this.setState({ code: '', focused: false })
  }

  addErrors(errors) {
    let { onErrors, order } = this.props

    let newOrder = order.clone()

    newOrder.errors().clear()
    errors.each(e => {
      e.field = 'redeemables.' + e.parameter.replace('filter/', '')
      newOrder.errors().push(e)
    })
    onErrors(newOrder)
  }

  addRedeemable(redeemable) {
    let { onChange, order } = this.props

    this.setState({ code: '' })

    if (redeemable.isA(occsn.Coupon)) {
      onChange(order.assignAttributes({ coupon: redeemable }))
    } else if (redeemable.isA(occsn.GiftCard)) {
      var outstandingBalance = order.outstandingBalance
      var giftCardValue = new Decimal(redeemable.value)

      var transactionAmount
      if (outstandingBalance.greaterThan(giftCardValue)) {
        transactionAmount = giftCardValue
      } else {
        transactionAmount = outstandingBalance
      }

      order = order.clone()

      order.charge(redeemable, transactionAmount.toString())

      onChange(order)
    }
  }

  checkForRedeemable(code) {
    let { findRedeemable, order } = this.props

    findRedeemable(order.product(), code, this.addRedeemable, this.addErrors)
  }

  getChildContext() {
    return {
      removeRedeemable: this.removeRedeemable
    }
  }

  handleChange(e) {
    this.setState({ code: e.target.value })
  }

  // If true, display the input to search for more redeemables
  //
  // @note Displays in two cases:
  //   - outstandingBalance is greater than zero (more gift cards can be added)
  //   - outstandingBalance is zero, but a coupon has not been added (coupon can still lower order.price)
  //
  // @return [Boolean] whether or not to show the input to search for more redeemables
  showInput() {
    const { order } = this.props

    return (
      (order.outstandingBalance && !order.outstandingBalance.isZero()) || _.isNull(order.coupon())
    )
  }

  removeRedeemable(redeemable) {
    let { onChange, order } = this.props

    if (redeemable.isA(occsn.Coupon)) {
      onChange(order.assignAttributes({ coupon: null }))
    } else if (redeemable.isA(occsn.GiftCard)) {
      order = order.clone()

      order.removeCharge(redeemable)

      onChange(order)
    }
  }

  render() {
    let { order } = this.props
    let { code } = this.state

    let currency = order
      .product()
      .merchant()
      .currency()

    let redeemables = []
    if (!_.isNull(order.coupon())) {
      redeemables.push(<Coupon currency={currency.name} subject={order.coupon()} />)
    }

    let giftCardTransactions = order
      .transactions()
      .target()
      .select(t => {
        return t.paymentMethod() && t.paymentMethod().isA(occsn.GiftCard)
      })

    giftCardTransactions.each(giftCardTransaction => {
      redeemables.push(<GiftCard currency={currency.name} subject={giftCardTransaction} />)
    })

    return (
      <section className="redeemables">
        <section className="redeemables-list">{redeemables}</section>

        {this.showInput() ? (
          <FormGroup className="redeemable-code">
            <InputGroup
              className={
                order
                  .errors()
                  .forField('redeemables.code')
                  .empty()
                  ? ''
                  : 'is-invalid'
              }
            >
              <Input
                className="redeemable-code-input"
                onChange={this.handleChange}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
                value={code}
                onKeyPress={event => {
                  if (event.key == 'Enter') {
                    this.checkForRedeemable(code)
                  }
                }}
              />
              <InputGroupAddon addonType="append">
                <Button
                  className="redeemable-code-input-button"
                  onClick={() => this.checkForRedeemable(code)}
                >
                  Apply
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <ErrorsFor
              className="redeemable-code-errors"
              component={FormFeedback}
              field="redeemables.code"
            />
          </FormGroup>
        ) : null}
      </section>
    )
  }
}
