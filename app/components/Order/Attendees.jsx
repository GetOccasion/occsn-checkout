import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { FormGroup, Label, Input } from 'reactstrap';

import { Collection } from 'mitragyna';

import Attendee from './Attendees/Attendee.jsx';

import occsn from '../../libs/Occasion';

export default class Attendees extends React.Component {
  static propTypes = {
    questions: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    setSkipAttendees: PropTypes.func,
    skipAttendees: PropTypes.bool,
    subject: PropTypes.instanceOf(occsn.Order),
  };

  constructor() {
    super();

    _.bindAll(this,
      'toggleSkipAttendees'
    );
  }

  toggleSkipAttendees(e) {
    const { setSkipAttendees } = this.props;

    setSkipAttendees(e.target.checked);
  }

  render() {
    let { questions, skipAttendees, subject } = this.props;

    return <section className="attendees">
      <div className="skip-attendees">
        <FormGroup check>
          <Label check for='toggleAttendees'>
            <Input type="checkbox" id="toggleAttendees" name="toggleAttendees"
                   checked={skipAttendees}
                   onChange={this.toggleSkipAttendees}
            />
            Skip attendees for now
          </Label>
        </FormGroup>
      </div>
      {
        !skipAttendees ? (
          <Collection component={Attendee} componentProps={{ questions }}
                      reflection='attendees' subject={subject.attendees()}>
          </Collection>
        ) : (null)
      }
    </section>;
  }
}
