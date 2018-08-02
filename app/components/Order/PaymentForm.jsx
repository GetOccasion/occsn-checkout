import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import Cash from './PaymentForm/Cash.jsx';
import Spreedly from './PaymentForm/Spreedly.jsx';
import Square from './PaymentForm/Square.jsx';

import occsn from '../../libs/Occasion';

export default class PaymentForm extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order),
    spreedlyIframeInputStyles: PropTypes.object,
  };

  chargeOutstandingBalanceToPaymentMethod = (subject) => {
    return this.pspForm.buildPaymentMethod()
    .then((paymentMethod) => {
      var newSubject = subject.clone();
      newSubject.charge(paymentMethod, subject.outstandingBalance.toString());
      return newSubject;
    })
    .catch((errors) => {
      subject.errors().clear();
      throw subject.errors().addAll(...errors);
    });
  }

  paymentServiceProvider = () => {
    let { order } = this.props;

    return order.product().merchant().pspName;
  }

  render() {
    let { order, spreedlyIframeInputStyles } = this.props;

    let pspFormProps = {
      order,
      spreedlyIframeInputStyles,
      ref: (form) => { this.pspForm = form },
    };

    return <section className="payment">
      {
        {
          cash: <Cash {...pspFormProps}></Cash>,
          spreedly: <Spreedly {...pspFormProps}></Spreedly>,
          square: <Square {...pspFormProps}></Square>,
        }[this.paymentServiceProvider()]
      }
    </section>;
  }
}
