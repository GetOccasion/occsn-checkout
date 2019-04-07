import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Decimal from 'decimal.js-light'
import _ from 'underscore'

import { Resource } from 'mitragyna'
import { Button } from 'reactstrap'

import occsn from '../libs/Occasion'

import TimeSlotsContainer from '../containers/TimeSlotsContainer.jsx'

import Attendees from './Order/Attendees.jsx'
import Customer from './Order/Customer.jsx'
import MissingAnswers from './Order/MissingAnswers.jsx'
import OrderErrors from './Order/OrderErrors.jsx'
import Pricing from './Order/Pricing.jsx'
import PaymentForm from './Order/PaymentForm.jsx'
import Questions from './Order/Questions.jsx'
import Redeemables from './Order/Redeemables.jsx'

export default class Order extends PureComponent {
  static propTypes = {
    activeTimeSlotsCollection: PropTypes.shape({
      // __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
      __collection: PropTypes.array
    }),
    timeSlotsFromCalendar: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    }),
    afterError: PropTypes.func.isRequired,
    findRedeemable: PropTypes.func.isRequired,
    saveOrder: PropTypes.func,
    setSkipAttendee: PropTypes.func,
    skipAttendees: PropTypes.object,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
  }

  render() {
    let {
      afterError,
      saveOrder,
      findRedeemable,
      setSkipAttendee,
      skipAttendees,
      subject,
      spreedlyIframeInputStyles,
      squareIframeInputStyles
    } = this.props

    let customer = subject.customer()
    let product = subject.product()

    return (
      <section className="order-container">
        {this.showTimeSlots() && (
          <section className="time-slots-container" id="time-slots-container">
            <a name="time-slots" id="time-slots-anchor" />
            {this.headerForSection('timeSlots')}
            <TimeSlotsContainer order={subject} />
          </section>
        )}

        <section className="information-container" id="information-container">
          {this.showQuestions() && (
            <section className="questions-container" id="questions-container">
              <a name="questions" id="questions-anchor" />
              {this.headerForSection('questions')}
              <Questions subject={subject} questions={product.questions().target()} />
            </section>
          )}

          {this.showAttendees() && (
            <section className="attendees-container" id="attendees-container">
              <a name="attendees" id="attendees-anchor" />
              {this.headerForSection('attendees')}
              <Attendees
                questions={product.attendeeQuestions}
                setSkipAttendee={setSkipAttendee}
                skipAttendees={skipAttendees}
                subject={subject}
              />
            </section>
          )}
        </section>

        <section className="payments-container" id="payments-container">
          {this.showRedeemables() && (
            <section className="redeemables-container" id="redeemables-container">
              <a name="redeemables" id="redeemables-anchor" />
              {this.headerForSection('redeemables')}
              <Redeemables
                findRedeemable={findRedeemable}
                order={subject}
                onChange={saveOrder}
                onErrors={afterError}
                ref={r => (this.redeemables = r)}
              />
            </section>
          )}

          {this.showPrice() && (
            <section className="total-due-container" id="total-due-container">
              <a name="total-due" id="total-due-anchor" />
              {this.headerForSection('totalDue')}
              <Pricing order={subject} />
            </section>
          )}

          {this.showPaymentForm() && (
            <section className="payment-container" id="payment-container">
              <a name="payment" id="payment-anchor" />
              {this.headerForSection('payment')}
              <PaymentForm
                order={subject}
                spreedlyIframeInputStyles={spreedlyIframeInputStyles}
                squareIframeInputStyles={squareIframeInputStyles}
                ref={form => (this.paymentForm = form)}
              />
            </section>
          )}
        </section>

        <section className="missing-answers-container" id="missing-answers-container">
          <a name="missing-answers" />
          <MissingAnswers order={subject} ref={r => (this.missingAnswers = r)} />
        </section>

        <section className="order-errors-container" id="order-errors-container">
          <a name="order-errors" />
          <OrderErrors order={subject} />
        </section>

        <section className="book-order-container" id="book-order-container">
          {this.renderBookOrderButton()}
        </section>
      </section>
    )
  }
}
