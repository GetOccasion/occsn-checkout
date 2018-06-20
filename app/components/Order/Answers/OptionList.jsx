import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js';
import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';
import ReactCurrencyFormatter from 'react-currency-formatter';

import occsn from '../../../libs/Occasion';

export default class OptionList extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  render() {
    let { answer } = this.props;

    return <FormGroup tag="fieldset">
      <label>{ answer.question().title }{ answer.question().required ? '*' : '' }</label>
      <Field type="radioGroup">
        {
          answer.question().options().target().map((option) => {
            return <FormGroup check>
              <Label check>
                <Field name="option" type="radio" component={ Input } value={ option }></Field>
                <span className="mr-1">{ option.title }</span>
                {
                  option.price ? (
                    <span>
                    (<ReactCurrencyFormatter quantity={ Decimal(option.price).toNumber() } currency={ answer.order().product().merchant().currency().name }></ReactCurrencyFormatter>)
                  </span>
                  ) : null
                }
              </Label>
            </FormGroup>
          }).toArray()
        }
      </Field>
    </FormGroup>;
  }
}
