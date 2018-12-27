import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import _ from 'underscore';

import { ErrorsFor } from 'mitragyna';
import { Button, FormFeedback, Tooltip } from 'reactstrap';

import occsn from '../libs/Occasion';

export default class TimeSlotsSelector extends React.Component {
  static propTypes = {
    calendar: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    subject: PropTypes.instanceOf(occsn.Order).isRequired,
    showAvailability: PropTypes.bool,
    timeSlots: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
    }).isRequired,
  };

  static contextTypes = {
    formatProps: PropTypes.object,
  };

  constructor() {
    super();

    this.state = {
      toolTips: {}
    }
  }

  selectTimeSlot = timeSlot => {
    let { onSelect, subject } = this.props;
    let timeSlots = subject.timeSlots().toArray();

    if(subject.product().sellsDropIns) {
      if(timeSlots.includes(timeSlot)) {
        timeSlots = timeSlots.filter(ts => ts !== timeSlot)
      } else {
        timeSlots.push(timeSlot);
      }
    } else {
      timeSlots = [timeSlot];
    }

    const newSubject = subject.assignAttributes({timeSlots: timeSlots});

    onSelect(newSubject);
  }

  toggleToolTip(id) {
    return () => {
      let toolTips = this.state.toolTips;

      toolTips[id] = !toolTips[id];

      this.setState({ toolTips });
    }
  }

  render() {
    let { calendar, disabled, timeSlots, showAvailability, subject } = this.props;
    let { formatProps } = this.context;

    var customControlInputClassNames = classNames(
      'custom-control-input',
      {
        'is-invalid': !subject.errors().forField('timeSlots').empty()
      }
    );

    var timeSlotFormat;

    if(calendar) {
      timeSlotFormat = formatProps.calendarTimeSlotsSelector || 'LT';
    } else {
      timeSlotFormat = formatProps.listTimeSlotsSelector || 'LLLL';
    }

    return <section className='time-slots-selector'>
      <section className="time-slots-selector-buttons">
        { timeSlots.map((timeSlot) => {
          return (
            <span>
              <Button
                className={ subject.timeSlots().target().include(timeSlot) ? 'active' : '' }
                color="primary"
                disabled={disabled}
                id={'timeSlot-' + timeSlot.id.replace(/~/g,'')}
                key={timeSlot.id}
                onClick={() => this.selectTimeSlot(timeSlot)}
                outline
              >
                { timeSlot.toString(timeSlotFormat) }
              </Button>
              {
                showAvailability ? (
                  <Tooltip
                    placement="bottom"
                    isOpen={this.state.toolTips[timeSlot.id]}
                    target={'timeSlot-' + timeSlot.id.replace(/~/g,'')}
                    toggle={this.toggleToolTip(timeSlot.id)}
                  >
                    { timeSlot.spotsAvailable } open spots
                  </Tooltip>
                ) : (null)
              }
            </span>
          )
        }).toArray()
        }
      </section>
      <section className='time-slots-selector-errors custom-control'>
        <div className={customControlInputClassNames}></div>
        <ErrorsFor component={FormFeedback} field="timeSlots"></ErrorsFor>
      </section>
    </section>;
  }
}
