import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';

import occsn from '../../../libs/Occasion';

export default class Checkbox extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    return <FormGroup>
      <FormGroup check>
        <Label check>
          <Field name="value" type="checkbox" component={ Input } value={true} uncheckedValue={false}></Field>
          { answer.question().title }{ answer.question().required ? '*' : '' }
        </Label>
      </FormGroup>
    </FormGroup>;
  }
}
