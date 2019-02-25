import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import _ from 'underscore'

import Cash from './PaymentForm/Cash.jsx'
import Spreedly from './PaymentForm/Spreedly.jsx'
import Square from './PaymentForm/Square.jsx'
import Currency from 'react-currency-formatter'

import occsn from '../../libs/Occasion'

export default class PaymentForm extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order),
    spreedlyIframeInputStyles: PropTypes.object,
    squareIframeInputStyles: PropTypes.object
  }

  chargeOutstandingBalanceToPaymentMethod = subject => {
    return this.pspForm
      .buildPaymentMethod()
      .then(paymentMethod => {
        var newSubject = subject.clone()
        newSubject.charge(paymentMethod, subject.outstandingBalance.toString())
        return newSubject
      })
      .catch(errors => {
        subject.errors().clear()
        throw subject.errors().addAll(...errors)
      })
  }

  paymentServiceProvider = () => {
    let { order } = this.props

    return order.product().merchant().pspName
  }

  render() {
    let { order, spreedlyIframeInputStyles, squareIframeInputStyles } = this.props

    let pspFormProps = {
      order,
      ref: form => {
        this.pspForm = form
      }
    }

    const currency = order
      .product()
      .merchant()
      .currency().name

    return (
      <section className="payment">
        {
          {
            cash: <Cash {...pspFormProps} />,
            spreedly: (
              <Spreedly {...pspFormProps} spreedlyIframeInputStyles={spreedlyIframeInputStyles} />
            ),
            square: <Square {...pspFormProps} squareIframeInputStyles={squareIframeInputStyles} />
          }[this.paymentServiceProvider()]
        }
        {order.product().merchant().canRetainCards && (
          <div className="alert alert-secondary">
            Your credit card will be stored so we can charge the remaining{' '}
            <Currency
              currency={currency}
              quantity={order.price - order.priceDueOnInitialOrder}
            />{' '}
            before the reservation date.
          </div>
        )}
        {this.paymentServiceProvider() != 'cash'
          ? null // TODO @kieranklaassen Replace this line with padlock code
          : null}
      </section>
    )
  }
}
