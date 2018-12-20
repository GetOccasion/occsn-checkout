import React, { PureComponent } from 'react';
import { renderToString } from 'react-dom/server'
import PropTypes from 'prop-types';

import Decimal from 'decimal.js-light';
import { Field } from 'mitragyna';
import { FormGroup, Label, Input } from 'reactstrap';

import ReactCurrencyFormatter from 'react-currency-formatter';

import occsn from '../../../libs/Occasion';

export default class DropDown extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer),
  };

  renderOptionTitle(option) {
    if(option.price) {
      return option.title + " " + renderToString(
        <ReactCurrencyFormatter
          quantity={Decimal(option.price)}
          currency={option.question().product().merchant().currency().name}
        />
      );
    } else {
      return option.title;
    }
  }

  render() {
    let { answer } = this.props;

    let id = "answer-" + answer.question().id;

    return <FormGroup className="dropdown-container">
      <a name={id}></a>
      <Label for={id}>{ answer.question().title }{ answer.question().required ? '*' : '' }</Label>
      <Field id={id} name="option" type="select" component={ Input }
             includeBlank={ !answer.option() }
             options={ answer.question().options().target() }
             optionsLabel={ this.renderOptionTitle }
      >
      </Field>
    </FormGroup>;
  }
}
