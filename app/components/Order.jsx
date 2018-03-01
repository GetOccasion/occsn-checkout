import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Resource } from 'mitragyna';
import { Row, Col } from 'reactstrap';

import occsn from '../libs/Occasion';

import Customer from './Customer';

export default class Order extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
    selectedTimeSlots: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    })
  };

  render() {
    let { subject, selectedTimeSlots } = this.props;

    let customer = subject.customer();
    let product = subject.product();

    return <section>
        <Resource component={ Customer } reflection="customer" subject={ customer }></Resource>
    </section>;
  }
}
