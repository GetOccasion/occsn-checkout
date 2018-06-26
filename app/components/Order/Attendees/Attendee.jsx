import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';

import s from 'underscore.string';

import occsn from '../../../libs/Occasion';

import { Card, CardBody, CardTitle, CardText, FormGroup, Input } from 'reactstrap';

export default class Attendee extends PureComponent {
  static propTypes = {
    indexOf: PropTypes.number.isRequired,
    questions: PropTypes.shape({
      __collection: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    subject: PropTypes.instanceOf(occsn.Attendee).isRequired,
  };

  render() {
    let { indexOf, questions } = this.props;

    return <Card className="attendee-container">
      <CardBody className="attendee">
        <CardTitle className="attendee-title">
          Attendee { indexOf + 1 }
        </CardTitle>
        {
          questions.map((q) => {
            return <FormGroup className="attendee-input-container">
              <Field type='text' name={q} placeholder={s.humanize(q)} component={Input} invalidClassName='is-invalid'></Field>
            </FormGroup>;
          }).toArray()
        }
      </CardBody>
    </Card>;
  }
}
