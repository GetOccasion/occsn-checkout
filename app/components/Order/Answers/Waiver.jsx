import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { Card, CardBody, CardText, FormGroup, Label, Input } from 'reactstrap';

import ReactHtmlParser from 'react-html-parser';

import occsn from '../../../libs/Occasion';

export default class Waiver extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    return <FormGroup check>
      <Card>
        <CardBody>
          <CardText>
            { ReactHtmlParser(answer.question().waiverText) }
          </CardText>
        </CardBody>
      </Card>
      <Label check>
        <Field name="value" type="checkbox" component={ Input } value={true} uncheckedValue={false}></Field>
        { answer.question().title }*
      </Label>
    </FormGroup>;
  }
}
