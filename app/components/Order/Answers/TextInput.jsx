import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';

import occsn from '../../../libs/Occasion';

export default class TextInput extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    let id = "answer-" + answer.question().id;

    return <FormGroup className="text-input-container">
      <a name={id}></a>
      <Label for={id}>{ answer.question().title }{ answer.question().required ? '*' : '' }</Label>
      <Field id={id} name="value" type="text" component={ Input }></Field>
    </FormGroup>;
  }
}
