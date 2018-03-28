import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import _ from 'underscore';

import { ErrorsFor } from 'mitragyna';
import { Button, FormFeedback } from 'reactstrap';

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

    var customControlInputClassNames = classNames(
      'custom-control-input',
      {
        'is-invalid': !subject.errors().forField('timeSlots').empty()
      }
    );

    return <section className='mt-2'>
      <section>
        { timeSlots.map((timeSlot) => {
          return (
            <Button
              className={ 'mr-2 mb-2 ' + (subject.timeSlots().target().include(timeSlot) ? 'active' : '') }
              color="primary"
              key={timeSlot.id}
              onClick={() => this.selectTimeSlot(timeSlot)}
              outline
            >
              { timeSlot.startsAt.format('lll') }
            </Button>
          )
        }).toArray()
        }
      </section>
      <section className='custom-control'>
        <div className={customControlInputClassNames}></div>
        <ErrorsFor component={FormFeedback} field="timeSlots"></ErrorsFor>
      </section>
    </section>;
  }
}
