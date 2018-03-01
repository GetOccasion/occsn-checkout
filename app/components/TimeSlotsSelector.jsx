import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { Button } from 'reactstrap';

import occsn from '../libs/Occasion';

export default class TimeSlotsSelector extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
    timeSlots: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    }).isRequired,
  };

  constructor() {
    super();

    _.bindAll(this, [
      'selectTimeSlot'
    ]);
  }

  selectTimeSlot(timeSlot) {
    let { onSelect, subject } = this.props;

    var newSubject = subject.assignAttributes({
      timeSlots: [timeSlot]
    });

    onSelect(newSubject);
  }

  render() {
    let { timeSlots, subject } = this.props;

    return <section className='mt-2'>
      <h2>Time Slots</h2>
      { timeSlots.map((timeSlot) => {
          return (
            <Button
              className={ subject.timeSlots().target().include(timeSlot) ? 'active' : '' }
              color="primary"
              key={timeSlot.id}
              onClick={() => this.selectTimeSlot(timeSlot)}
            >
              { timeSlot.startsAt.format('lll') }
            </Button>
          )
        }).toArray()
      }
    </section>;
  }
}
