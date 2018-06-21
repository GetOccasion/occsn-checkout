import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import { Collection } from 'mitragyna';

import Attendee from './Attendees/Attendee.jsx';

import occsn from '../../libs/Occasion';

export default class Attendees extends React.Component {
  static propTypes = {
    questions: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    subject: PropTypes.instanceOf(occsn.Order),
  };

  render() {
    let { questions, subject } = this.props;

    return <Collection component={Attendee} componentProps={{ questions }}
                       reflection='attendees' subject={subject.attendees()}>
    </Collection>;
  }
}
