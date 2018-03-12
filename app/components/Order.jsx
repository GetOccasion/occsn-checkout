import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { Resource } from 'mitragyna';
import { Button } from 'reactstrap';

import occsn from '../libs/Occasion';

import Customer from './Order/Customer';
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
      'headerForSection',
    );
  }

  allowedToBookOrder() {
    const { bookingOrder } = this.props;

    return !bookingOrder;
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
        return <h2 id="widgetTimeSlotsTitle">
          { _.isNull(product.widgetTimeSlotsTitle) ? (
            "Time Slots"
          ) : (
            product.widgetTimeSlotsTitle
          )}
        </h2>;
      case 'questions':
        return <h2 id="widgetQuestionsTitle">
          { _.isNull(product.widgetQuestionsTitle) ? (
            "Additional Information"
          ) : (
            product.widgetQuestionsTitle
          )}
        </h2>;
      case 'totalDue':
        return <h2 id="widgetTotalDueTitle">
          { _.isNull(product.widgetTotalDueTitle) ? (
            "Total Due Today"
          ) : (
            product.widgetTotalDueTitle
          )}
        </h2>;
    }
  }

  render() {
    let { afterUpdate, subject, selectedTimeSlots } = this.props;

    let customer = subject.customer();
    let product = subject.product();

    return <section>
      { this.headerForSection('contact') }
      <Resource component={ Customer } reflection="customer" subject={ customer }></Resource>

      { this.headerForSection('timeSlots') }
      <TimeSlotsSelector subject={subject} timeSlots={ selectedTimeSlots } onSelect={ afterUpdate } />

      { this.headerForSection('questions') }
      <Questions subject={subject} questions={ product.questions().target() }></Questions>

      { this.headerForSection('totalDue') }
      {
        !product.free && subject.price ? (
          <section className="mt-3">
            <Pricing order={subject}></Pricing>
          </section>
        ) : null
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
