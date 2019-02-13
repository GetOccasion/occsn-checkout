import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

import { Jumbotron } from 'reactstrap'

import occsn from '../../libs/Occasion'

export default class OrderComplete extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order)
  }

  render() {
    let { order } = this.props

    return (
      <section className="order-complete-container">
        <h1 className="verification-code">Order #{order.verificationCode}</h1>
        {!order.timeSlots().empty() ? (
          <section className="order-complete-time-slot-details">
            {order
              .timeSlots()
              .target()
              .map(timeSlot => {
                return <h4>{timeSlot.toString('LLLL')}</h4>
              })
              .toArray()}
          </section>
        ) : null}
        <section className="order-complete-messages">
          <p className="custom-confirmation-message">
            {ReactHtmlParser(order.product().customerConfirmationMessage)}
          </p>
          <p className="confirmation-email-message">
            An order confirmation email with receipt has been sent to{' '}
            {order.customer().email}.
          </p>
        </section>
      </section>
    )
  }
}
