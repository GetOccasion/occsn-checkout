import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Jumbotron } from 'reactstrap';

import occsn from '../../libs/Occasion';

export default class OrderComplete extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order),
  };

  render() {
    let { order } = this.props;

    return <section className="order-complete-container">
      <h1 className="verification-code">Order #{ order.verificationCode }</h1>
      <section className="order-complete-time-slot-details">
        <h4>{ order.timeSlots().target().first().startsAt.format('dddd MMMM Do, YYYY h:mm A') }</h4>
      </section>
      <section className="order-complete-messages">
        <p className="custom-confirmation-message">{ order.product().customerConfirmationMessage }</p>
        <p className="confirmation-email-message">An order confirmation email with receipt has been sent to { order.customer().email }.</p>
      </section>
    </section>;
  }
}
