import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Resource } from 'mitragyna';
import { Row, Col } from 'reactstrap';

import occsn from '../libs/Occasion';

import Customer from './Customer';
import TimeSlotsSelector from './TimeSlotsSelector';

export default class Order extends PureComponent {
  static propTypes = {
    afterUpdate: PropTypes.func.isRequired,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
    selectedTimeSlots: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    })
  };

  render() {
    let { afterUpdate, subject, selectedTimeSlots } = this.props;

    let customer = subject.customer();

    return <section>
      <Resource component={ Customer } reflection="customer" subject={ customer }></Resource>

      <TimeSlotsSelector subject={subject} timeSlots={ selectedTimeSlots } onSelect={ afterUpdate } />
    </section>;
  }
}
