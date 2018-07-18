import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FormGroup, Label, Input } from 'reactstrap';

import { Collection } from 'mitragyna';

import Attendee from './Attendees/Attendee.jsx';

import occsn from '../../libs/Occasion';

export default class Attendees extends React.Component {
  static propTypes = {
    questions: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    setSkipAttendee: PropTypes.func,
    skipAttendees: PropTypes.object,
    subject: PropTypes.instanceOf(occsn.Order),
  };

  render() {
    let { questions, skipAttendees, setSkipAttendee, subject } = this.props;

    return <section className="attendees">
      <Collection component={Attendee} componentProps={{ questions, skipAttendees, setSkipAttendee }}
                  reflection='attendees' subject={subject.attendees()}>
      </Collection>
    </section>;
  }
}
