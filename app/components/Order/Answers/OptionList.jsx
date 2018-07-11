import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js-light';
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

    let id = "answer-" + answer.question().id;

    return <FormGroup className="option-list-container" tag="fieldset">
      <Label for={id}>{ answer.question().title }{ answer.question().required ? '*' : '' }</Label>
      <Field type="radioGroup">
        {
          answer.question().options().target().map((option) => {
            return <FormGroup check>
              <Label for={option.id} check>
                <Field id={option.id} name="option" type="radio" component={ Input } value={ option }></Field>
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
