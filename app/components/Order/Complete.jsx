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

    return <section>
      <Jumbotron>
        <h1>Order #{ order.verificationCode }</h1>
        <hr/>
        <section className="event">
          <h4>{ order.timeSlots().target().first().startsAt.format('dddd MMMM Do, YYYY h:mm A') }</h4>
        </section>
        <section className="message">
          <p>{ order.product().postTransactionalMessage }</p>
          <p>An order confirmation email with receipt has been sent to { order.customer().email }.</p>
        </section>
      </Jumbotron>
    </section>;
  }
}
