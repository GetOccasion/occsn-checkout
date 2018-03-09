import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';

import occsn from '../../../libs/Occasion';

export default class OptionList extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    return <FormGroup tag="fieldset">
      <legend>{ answer.question().title }{ answer.question().required ? '*' : '' }</legend>
      {
        answer.question().options().target().map((option) => {
          return <FormGroup check>
            <Label check>
              <Field name="option" type="radio" component={ Input } value={ option }></Field>
              { option.title }
            </Label>
          </FormGroup>
        }).toArray()
      }
    </FormGroup>;
  }
}
