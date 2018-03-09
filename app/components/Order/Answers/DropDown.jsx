import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';

import occsn from '../../../libs/Occasion';

export default class DropDown extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    return <FormGroup>
      <Label>{ answer.question().title }{ answer.question().required ? '*' : '' }</Label>
      <Field name="option" type="select" component={ Input }
             includeBlank={true}
             options={ answer.question().options().target() }
             optionsLabelKey="title"
      >
      </Field>
    </FormGroup>;
  }
}
