import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js';
import _ from 'underscore';

import { Resource } from 'mitragyna';
import { Button } from 'reactstrap';

import occsn from '../libs/Occasion';

import TimeSlotsContainer from '../containers/TimeSlotsContainer.jsx';

import Attendees from './Order/Attendees.jsx';
import Customer from './Order/Customer.jsx';
import MissingAnswers from './Order/MissingAnswers.jsx';
import Pricing from './Order/Pricing.jsx';
import PaymentForm from './Order/PaymentForm.jsx';
import Questions from './Order/Questions.jsx';
import Redeemables from './Order/Redeemables.jsx';

export default class Order extends PureComponent {
  static propTypes = {
    activeTimeSlotsCollection: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    }),
    timeSlotsFromCalendar: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    }),
    afterError: PropTypes.func.isRequired,
    afterUpdate: PropTypes.func.isRequired,
    bookingOrder: PropTypes.bool,
    findRedeemable: PropTypes.func.isRequired,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
  };

  constructor() {
    super();
    _.bindAll(this,
      'acceptsPayment',
      'allowedToBookOrder',
      'headerForSection',
      'showPaymentForm',
      'showPrice',
    );
  }

  acceptsPayment() {
    const { subject } = this.props;

    return subject.product().merchant().pspName != 'cash';
  }

  allowedToBookOrder() {
    const { bookingOrder } = this.props;

    let missingAnswers = false;
    if(this.missingAnswers && !this.missingAnswers.empty()) missingAnswers = true;

    return !bookingOrder && !missingAnswers;
  }

  // Mitragyna callback
  beforeSubmit(subject) {
    if(this.acceptsPayment() && !Decimal(subject.outstandingBalance).isZero()) {
      return this.paymentForm.chargeOutstandingBalanceToPaymentMethod(subject);
    } else {
      return subject;
    }
  }

  // @param [String] section the name of the section to get the custom or default section title for, rendered as <h2>
  headerForSection(section) {
    const { subject } = this.props;
    let product = subject.product();

    switch(section) {
      case 'contact':
        return <h2 className="container-title" id="widgetContactTitle">
          { _.isNull(product.widgetContactTitle) ? (
            "Contact Information"
          ) : (
            product.widgetContactTitle
          )}
        </h2>;
      case 'timeSlots':
        return <h2 className="container-title" id="widgetTimeSlotsTitle">
          { _.isNull(product.widgetTimeSlotsTitle) ? (
            "Time Slots"
          ) : (
            product.widgetTimeSlotsTitle
          )}
        </h2>;
      case 'questions':
        return <h2 className="container-title" id="widgetQuestionsTitle">
          { _.isNull(product.widgetQuestionsTitle) ? (
            "Additional Information"
          ) : (
            product.widgetQuestionsTitle
          )}
        </h2>;
      case 'attendees':
        return <h2 className="container-title" id="widgetAttendeesTitle">
          Attendee Information
        </h2>;
      case 'payment':
        return <h2 className="container-title" id="widgetPaymentTitle">
          { _.isNull(product.widgetPaymentTitle) ? (
            "Payment Information"
          ) : (
            product.widgetPaymentTitle
          )}
        </h2>;
      case 'redeemables':
        return <h2 className="container-title" id="widgetRedeemableTitle">
            Coupons and Gift Cards
        </h2>;
      case 'totalDue':
        return <h2 className="container-title" id="widgetTotalDueTitle">
          { _.isNull(product.widgetTotalDueTitle) ? (
            "Total Due Today"
          ) : (
            product.widgetTotalDueTitle
          )}
        </h2>;
    }
  }

  // Determines if should show Attendees
  // @note If the product is quantity aware && has attendeeQuestions, and order.quantity > 0, show Attendees
  //
  // @return [Boolean] whether or not to show Attendees
  showAttendees() {
    let { subject } = this.props;
    let product = subject.product();

    if(subject.newResource()) return false;

    return !product.attendeeQuestions.empty() && subject.quantity > 0;
  }

  // Determines if should show TimeSlotsContainer
  // @note If the product has firstTimeSlotStartsAt and requiresTimeSlotSelection, and a timeSlot has not been
  //   pre-selected via window.OCCSN.time_slot_id, then show TimeSlotsContainer
  //
  // @return [Boolean] whether or not to show TimeSlotsContainer
  showTimeSlots() {
    let { subject } = this.props;
    let product = subject.product();

    return product.firstTimeSlotStartsAt && product.requiresTimeSlotSelection && !window.OCCSN.time_slot_id;
  }

  // Determines if should show Questions
  // @note If the product.questions() is empty, don't show questions
  //
  // @return [Boolean] whether or not to show Questions
  showQuestions() {
    let { subject } = this.props;
    let product = subject.product();

    return !product.questions().empty();
  }

  // Determines if should show Redeemables
  // @note If the product is not free && hasRedeemables then show Redeemables
  //
  // @return [Boolean] whether or not to show Redeemables
  showRedeemables() {
    let { subject } = this.props;
    let product = subject.product();

    if(subject.newResource()) return false;

    return !product.free && product.hasRedeemables && !Decimal(subject.subtotal || '0.0').isZero();
  }

  // Determines if should show the payment form
  // @note If the product is free or outstandingBalance is zero, do not show the payment form
  //
  // @return [Boolean] whether or not to show the payment form
  showPaymentForm() {
    let { subject } = this.props;
    let product = subject.product();

    if(subject.newResource()) return false;

    return !(product.free || Decimal(subject.outstandingBalance || '0.0').isZero());
  }

  // Determines if should show the price output
  // @note If the product is free or price is null (required price-calculating questions are missing answers),
  //   do not show the price display
  //
  // @return [Boolean] whether or not to show the payment form
  showPrice() {
    let { subject } = this.props;
    let product = subject.product();

    if(subject.newResource()) return false;

    return !product.free && subject.price;
  }

  render() {
    let { afterError, afterUpdate, findRedeemable, subject } = this.props;

    let customer = subject.customer();
    let product = subject.product();

    return <section className="order-container">
      {
        this.showTimeSlots() ? (
          <section className="time-slots-container">
            <a name="time-slots" id="time-slots-anchor"></a>
            { this.headerForSection('timeSlots') }
            <TimeSlotsContainer order={subject} />
          </section>
        ) : (null)
      }

      <section className="customer-container">
        <a name="customer" id="customer-anchor"></a>
        { this.headerForSection('contact') }
        <Resource component={ Customer } reflection="customer" subject={ customer }></Resource>
      </section>

      {
        this.showQuestions() ? (
          <section className="questions-container">
            <a name="questions" id="questions-anchor"></a>
            { this.headerForSection('questions') }
            <Questions subject={subject} questions={ product.questions().target() }></Questions>
          </section>
        ) : null
      }

      {
        this.showAttendees() ? (
          <section className="attendees-container">
            <a name="attendees" id="attendees-anchor"></a>
            { this.headerForSection('attendees') }
            <Attendees questions={product.attendeeQuestions} subject={subject}></Attendees>
          </section>
        ) : null
      }

      {
        this.showRedeemables() ? (
          <section className="redeemables-container">
            <a name="redeemables" id="redeemables-anchor"></a>
            { this.headerForSection('redeemables') }
            <Redeemables findRedeemable={findRedeemable} order={subject} onChange={afterUpdate} onErrors={afterError}></Redeemables>
          </section>
        ) : null
      }

      {
        this.showPaymentForm() ? (
          <section className="payment-container">
            <a name="payment" id="payment-anchor"></a>
            { this.headerForSection('payment') }
            <PaymentForm order={subject} ref={(form) => this.paymentForm = form }></PaymentForm>
          </section>
        ) : null
      }

      {
        this.showPrice() ? (
          <section className="total-due-container">
            <a name="total-due" id="total-due-anchor"></a>
            { this.headerForSection('totalDue') }
            <Pricing order={subject}></Pricing>
          </section>
        ) : null
      }

      <section className="missing-answers-container">
        <a name="missing-answers"></a>
        <MissingAnswers order={subject} ref={(r) => this.missingAnswers = r }></MissingAnswers>
      </section>

      <section className="book-order-container">
        <Button
          block
          className="book-order-button"
          color="success"
          id="bookOrder"
          size="lg"
          type="submit"
          disabled={ !this.allowedToBookOrder() }
        >
          { product.orderButtonText }
        </Button>
      </section>
    </section>;
  }
}
