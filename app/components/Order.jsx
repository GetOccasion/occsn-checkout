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
    afterUpdate: PropTypes.func.isRequired,
    bookingOrder: PropTypes.bool,
    findRedeemable: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    saveOrder: PropTypes.func,
    savingOrder: PropTypes.number,
    setSkipAttendee: PropTypes.func,
    skipAttendees: PropTypes.object,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
    spreedlyIframeInputStyles: PropTypes.object,
    squareIframeInputStyles: PropTypes.object
  }

  static contextTypes = {
    callbackProps: PropTypes.object,
    componentProps: PropTypes.object
  }

  constructor() {
    super()
    _.bindAll(this, 'allowedToBookOrder', 'headerForSection', 'showPaymentForm', 'showPrice')
  }

  allowedToBookOrder() {
    const { bookingOrder, savingOrder, subject } = this.props

    if (!subject || !this.missingAnswers) return false

    return (
      !bookingOrder && !savingOrder && this.missingAnswers.missingRequiredAnswers(subject).empty()
    )
  }

  // Mitragyna callback
  beforeSubmit(subject) {
    if (this.redeemables && this.redeemables.state.focused) {
      this.redeemables.checkForRedeemable(this.redeemables.state.code)
      throw subject
    }

    if (!subject.outstandingBalance.isZero()) {
      let balanceTransaction = subject
        .transactions()
        .target()
        .detect(t => !(t.paymentMethod() && t.paymentMethod(occsn.GiftCard)))

      if (balanceTransaction)
        subject
          .transactions()
          .target()
          .delete(balanceTransaction)

      return this.paymentForm.chargeOutstandingBalanceToPaymentMethod(subject)
    } else {
      return subject
    }
  }

  // @param [String] section the name of the section to get the custom or default section title for, rendered as <h2>
  headerForSection(section) {
    const { subject } = this.props
    let product = subject.product()

    switch (section) {
      case 'contact':
        return (
          <div className="container-title" id="widgetContactTitle">
            <h4>
              {_.isNull(product.widgetContactTitle)
                ? 'Customer Information'
                : product.widgetContactTitle}
            </h4>
            <hr className="pb-3" />
          </div>
        )
      case 'timeSlots':
        return (
          <div className="container-title" id="widgetTimeSlotsTitle">
            <h4>
              {_.isNull(product.widgetTimeSlotsTitle)
                ? product.sellsSingles
                  ? 'Select which day you would like to reserve'
                  : 'Dates and Times'
                : product.widgetTimeSlotsTitle}
            </h4>
            <hr className="pb-3" />
          </div>
        )
      case 'questions':
        return (
          <div className="container-title" id="widgetQuestionsTitle">
            <h4>
              {_.isNull(product.widgetQuestionsTitle)
                ? 'Additional Questions'
                : product.widgetQuestionsTitle}
            </h4>
            <hr className="pb-3" />
          </div>
        )
      case 'attendees':
        return (
          <div className="container-title" id="widgetAttendeesTitle">
            <h4>Attendee Information</h4>
            <hr className="pb-3" />
          </div>
        )
      case 'payment':
        return (
          <div className="container-title" id="widgetPaymentTitle">
            <h4>
              {_.isNull(product.widgetPaymentTitle)
                ? 'Payment Information'
                : product.widgetPaymentTitle}
            </h4>
            <hr className="pb-3" />
          </div>
        )
      case 'redeemables':
        return (
          <div className="container-title" id="widgetRedeemableTitle">
            <h4>Discount or Redemption Code</h4>
            <hr className="pb-3" />
          </div>
        )
      case 'totalDue':
        return (
          <div className="container-title" id="widgetTotalDueTitle">
            <h4>
              {_.isNull(product.widgetTotalDueTitle)
                ? !product.depositBehavior || product.depositBehavior == 'no_deposit'
                  ? 'Total Due Today'
                  : 'Deposit Due Today'
                : product.widgetTotalDueTitle}
            </h4>
            <hr className="pb-3" />
          </div>
        )
    }
  }

  // Determines if should show Attendees
  // @note If the product is quantity aware && has attendeeQuestions, and order.quantity > 0, show Attendees
  //
  // @return [Boolean] whether or not to show Attendees
  showAttendees() {
    let { subject } = this.props
    let product = subject.product()

    if (subject.newResource()) return false

    return !product.attendeeQuestions.empty() && subject.quantity > 0
  }

  // Determines if should show TimeSlotsContainer
  // @note If the product has firstTimeSlotStartsAt and requiresTimeSlotSelection, and a timeSlot has not been
  //   pre-selected via window.OCCSN.time_slot_id, then show TimeSlotsContainer
  //
  // @return [Boolean] whether or not to show TimeSlotsContainer
  showTimeSlots() {
    let { subject } = this.props
    let product = subject.product()

    return (
      product.sellsDropIns ||
      product.sellsSessions ||
      (product.firstTimeSlotStartsAt &&
        product.requiresTimeSlotSelection &&
        !window.OCCSN.time_slot_id)
    )
  }

  // Determines if should show Questions
  // @note If the product.questions() is empty, don't show questions
  //
  // @return [Boolean] whether or not to show Questions
  showQuestions() {
    let { subject } = this.props
    let product = subject.product()

    return !product.questions().empty()
  }

  // Determines if should show Redeemables
  // @note If the product is not free && hasRedeemables then show Redeemables
  //
  // @return [Boolean] whether or not to show Redeemables
  showRedeemables() {
    let { subject } = this.props
    let product = subject.product()

    if (subject.newResource()) return false

    return (
      !product.free &&
      product.hasRedeemables &&
      ((subject.subtotal && !subject.subtotal.isZero()) || window.OCCSN.coupon_code)
    )
  }

  // Determines if should show the payment form
  // @note If the product is free or outstandingBalance is zero, do not show the payment form
  //
  // @return [Boolean] whether or not to show the payment form
  showPaymentForm() {
    let { subject } = this.props
    let product = subject.product()

    if (subject.newResource()) return false

    return !(product.free || !subject.outstandingBalance || subject.outstandingBalance.isZero())
  }

  // Determines if should show the price output
  // @note If the product is free or price is null (required price-calculating questions are missing answers),
  //   do not show the price display
  //
  // @return [Boolean] whether or not to show the payment form
  showPrice() {
    let { subject } = this.props
    let product = subject.product()

    if (subject.newResource()) return false

    return !product.free && subject.price
  }

  renderBookOrderButton = () => {
    const { bookingOrder, onSubmit, subject } = this.props
    const { callbackProps, componentProps } = this.context

    let button = (
      <Button
        block
        className="book-order-button"
        color="success"
        id="bookOrder"
        size="lg"
        disabled={!this.allowedToBookOrder()}
        onClick={onSubmit}
      >
        <span>{subject.product().orderButtonText}</span>
        {bookingOrder &&
          componentProps.orderBooking &&
          React.createElement(componentProps.orderBooking)}
      </Button>
    )

    if (callbackProps.onBookOrderButtonRender) callbackProps.onBookOrderButtonRender(button)

    return button
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
          <section className="customer-container" id="customer-container">
            <a name="customer" id="customer-anchor" />
            {this.headerForSection('contact')}
            <Resource component={Customer} reflection="customer" subject={customer} />
          </section>

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
