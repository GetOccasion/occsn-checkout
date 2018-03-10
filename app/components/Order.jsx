import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { Resource } from 'mitragyna';
import { Button } from 'reactstrap';

import occsn from '../libs/Occasion';

import Customer from './Customer';
import TimeSlotsSelector from './TimeSlotsSelector';
import Pricing from './Order/Pricing';
import Questions from './Order/Questions';

export default class Order extends PureComponent {
  static propTypes = {
    afterUpdate: PropTypes.func.isRequired,
    bookingOrder: PropTypes.bool,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
    selectedTimeSlots: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    })
  };

  constructor() {
    super();
    _.bindAll(this,
      'allowedToBookOrder',
    );
  }

  allowedToBookOrder() {
    const { bookingOrder } = this.props;

    return !bookingOrder;
  }

  render() {
    let { afterUpdate, subject, selectedTimeSlots } = this.props;

    let customer = subject.customer();
    let product = subject.product();

    return <section>
      <Resource component={ Customer } reflection="customer" subject={ customer }></Resource>

      <TimeSlotsSelector subject={subject} timeSlots={ selectedTimeSlots } onSelect={ afterUpdate } />

      <Questions subject={subject} questions={ product.questions().target() }></Questions>

      {
        product.free ? (null) : (
          <section className="mt-3">
            <Pricing order={subject}></Pricing>
          </section>
        )
      }

      <section className="mt-3">
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
