import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import _ from 'underscore';

import FullCalendar from 'fullcalendar-reactwrapper';

import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

import occsn from '../../libs/Occasion';

export default class Calendar extends PureComponent {
  static propTypes = {
    calendarTimeSlots: PropTypes.shape({
      __collection: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.instanceOf(moment),
          timeSlots: PropTypes.shape({
            __collection: PropTypes.arrayOf(PropTypes.instanceOf(occsn.TimeSlot))
          })
        })
      )
    }).isRequired,
    onDateSelect: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    _.bindAll(this,
      'dateClicked'
    );
  }

  dateClicked(selectedDate) {
    const { calendarTimeSlots, onDateSelect } = this.props;

    var timeSlotsForDay = calendarTimeSlots.detect((date) => {
      return date.day.clone().utc().isSame(selectedDate, 'day');
    }).timeSlots;

    if(!timeSlotsForDay.empty()) onDateSelect(timeSlotsForDay);
  }

  render() {
    let { calendarTimeSlots } = this.props;

    let events = calendarTimeSlots.map((day) => {
      return day.timeSlots.map((timeSlot) => {
        return {
          start: timeSlot.startsAt.format(),
          allDay: true,
          rendering: 'background'
        };
      }).toArray();
    }).flatten().toArray();

    return <section className="calendar">
      <a name="calendar" id="calendar-anchor"></a>
      <FullCalendar
        header={false}
        dayClick={this.dateClicked}
        defaultDate={calendarTimeSlots.first().day}
        events={events}
        fixedWeekCount={5}
        ref={(r) => this.fullCalendar = r}
      />
    </section>;
  }
}
