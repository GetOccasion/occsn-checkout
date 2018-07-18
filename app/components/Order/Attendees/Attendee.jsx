import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';

import _ from 'underscore.string';

import occsn from '../../../libs/Occasion';

import { Card, CardBody, CardTitle, Label, FormGroup, Input } from 'reactstrap';

export default class Attendee extends PureComponent {
  static propTypes = {
    indexOf: PropTypes.number.isRequired,
    questions: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    subject: PropTypes.instanceOf(occsn.Attendee).isRequired,
  };

  render() {
    let { indexOf, questions, skipAttendees, setSkipAttendee } = this.props;

    return <Card className="attendee-container">
      <CardBody className="attendee">
        <CardTitle className="attendee-title d-flex flex-row justify-content-between">
          <div>Attendee {indexOf + 1}</div>
          <small>
            <Label check for='toggleAttendee'>
              <Input type="checkbox" id={'toggleAttendee_' + indexOf + 1} name="toggleAttendees"
                     checked={skipAttendees[indexOf]}
                     onChange={(e) => setSkipAttendee(indexOf, e.target.checked)}
              />
            Skip this attendee for now
            </Label>
          </small>
        </CardTitle>
        <div className={skipAttendees[indexOf] ? 'd-none wel' : 'niet'}>
          {
            questions.map((q) => {
              return <FormGroup className="attendee-input-container">
                <Label for={'attendee-' + indexOf + '-' + q}>{_.humanize(q)}</Label>
                <Field type='text' name={q} id={'attendee-' + indexOf + '-' + q} component={Input} invalidClassName='is-invalid'></Field>
              </FormGroup>;
            }).toArray()
          }
        </div>
      </CardBody>
    </Card>;
  }
}
