import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';

import occsn from '../../../libs/Occasion';

export default class TextArea extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    return <FormGroup className="text-area-container">
      <Label>{ answer.question().title }{ answer.question().required ? '*' : '' }</Label>
      <Field name="value" type="textarea" component={ Input }></Field>
    </FormGroup>;
  }
}
