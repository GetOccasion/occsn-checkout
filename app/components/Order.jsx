import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js';
import _ from 'underscore';

import { Resource } from 'mitragyna';
import { Button } from 'reactstrap';

import occsn from '../libs/Occasion';

import TimeSlotsContainer from '../containers/TimeSlotsContainer';

import Attendees from './Order/Attendees';
import Customer from './Order/Customer';
import MissingAnswers from './Order/MissingAnswers';
import Pricing from './Order/Pricing';
import PaymentForm from './Order/PaymentForm';
import Questions from './Order/Questions';
import Redeemables from './Order/Redeemables';

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
        return <h2 id="widgetContactTitle">
          { _.isNull(product.widgetContactTitle) ? (
            "Contact Information"
          ) : (
            product.widgetContactTitle
          )}
        </h2>;
      case 'timeSlots':
        return <h2 className="mt-3 mb-2" id="widgetTimeSlotsTitle">
          { _.isNull(product.widgetTimeSlotsTitle) ? (
            "Time Slots"
          ) : (
            product.widgetTimeSlotsTitle
          )}
        </h2>;
      case 'questions':
        return <h2 className="mt-3 mb-2" id="widgetQuestionsTitle">
          { _.isNull(product.widgetQuestionsTitle) ? (
            "Additional Information"
          ) : (
            product.widgetQuestionsTitle
          )}
        </h2>;
      case 'attendees':
        return <h2 className="mt-3 mb-2" id="widgetAttendeesTitle">
          Attendee Information
        </h2>;
      case 'payment':
        return <h2 className="mt-3 mb-2" id="widgetPaymentTitle">
          { _.isNull(product.widgetPaymentTitle) ? (
            "Payment Information"
          ) : (
            product.widgetPaymentTitle
          )}
        </h2>;
      case 'redeemables':
        return <h2 className="mt-3 mb-2" id="widgetRedeemableTitle">
            Coupons and Gift Cards
        </h2>;
      case 'totalDue':
        return <h2 className="mt-3 mb-2" id="widgetTotalDueTitle">
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
  // @note If the product hasTimeSlots then show TimeSlotsContainer
  //
  // @return [Boolean] whether or not to show TimeSlotsContainer
  showTimeSlots() {
    let { subject } = this.props;
    let product = subject.product();

    return product.hasTimeSlots;
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

    return <section>
      { this.headerForSection('contact') }
      <Resource component={ Customer } reflection="customer" subject={ customer }></Resource>

      {
        product.firstTimeSlotStartsAt ? (
          <section>
            { this.headerForSection('timeSlots') }
            <TimeSlotsContainer order={subject} />
          </section>
        ) : (null)
      }

      {
        this.showQuestions() ? (
          <section>
            { this.headerForSection('questions') }
            <Questions subject={subject} questions={ product.questions().target() }></Questions>
          </section>
        ) : null
      }

      {
        this.showAttendees() ? (
          <section>
            { this.headerForSection('attendees') }
            <Attendees questions={product.attendeeQuestions} subject={subject}></Attendees>
          </section>
        ) : null
      }

      {
        this.showRedeemables() ? (
          <section>
            { this.headerForSection('redeemables') }
            <Redeemables findRedeemable={findRedeemable} order={subject} onChange={afterUpdate} onErrors={afterError}></Redeemables>
          </section>
        ) : null
      }

      {
        this.showPaymentForm() ? (
          <section>
            { this.headerForSection('payment') }
            <PaymentForm order={subject} ref={(form) => this.paymentForm = form }></PaymentForm>
          </section>
        ) : null
      }

      {
        this.showPrice() ? (
          <section>
            { this.headerForSection('totalDue') }
            <Pricing order={subject}></Pricing>
          </section>
        ) : null
      }

      <section className="mt-3">
        <MissingAnswers order={subject} ref={(r) => this.missingAnswers = r }></MissingAnswers>
      </section>

      <section className="mt-3 mb-3">
        <Button
          block
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
