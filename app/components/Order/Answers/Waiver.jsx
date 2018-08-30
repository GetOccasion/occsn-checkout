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

    let id = "answer-" + answer.question().id;

    return <FormGroup className="waiver-container">
      <a name={id}></a>
      <Card color="light">
        <CardBody>
          <CardText>
            { ReactHtmlParser(answer.question().waiverText) }
          </CardText>
        </CardBody>
      </Card>
      <FormGroup check>
        <Label for={id} check className="mt-2">
          <Field id={id} name="value" type="checkbox" component={ Input } value={true} uncheckedValue={false}></Field>
          { answer.question().title }*
        </Label>
      </FormGroup>
    </FormGroup>;
  }
}
