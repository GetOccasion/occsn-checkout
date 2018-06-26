import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js';

import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';
import Currency from 'react-currency-formatter';

import occsn from '../../../libs/Occasion';

export default class Checkbox extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    let question = answer.question();

    let label = [
      <span>{ answer.question().title }</span>
    ];
    
    if(question.price) {
      let currency = question.product().merchant().currency();
      let price = Decimal(question.price);

      if(question.operation == 'add') {
        label.push(<span>&nbsp;(<Currency currency={currency.name} quantity={price.toNumber()}></Currency> extra)</span>);
      } else if(question.operation == 'subtract') {
        label.push(<span>&nbsp;(<Currency currency={currency.name} quantity={price.toNumber()}></Currency> off)</span>);
      }
    }
    
    if(question.percentage) {
      if(question.operation == 'multiply') {
        label.push(<span>&nbsp;({question.percentage}% extra)</span>);
      } else if(question.operation == 'divide') {
        label.push(<span>&nbsp;({question.percentage}% off)</span>);
      }
    }

    if(question.required) {
      label.push(<span>&nbsp;*</span>);
    }

    return <FormGroup className="checkbox-container">
      <FormGroup check>
        <Label check>
          <Field name="value" type="checkbox" component={ Input } value={true} uncheckedValue={false}></Field>
          {label}
        </Label>
      </FormGroup>
    </FormGroup>;
  }
}
