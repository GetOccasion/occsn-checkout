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
  };

  constructor() {
    super();

    _.bindAll(this,
      'chargeOutstandingBalanceToPaymentMethod',
      'paymentServiceProvider'
    );
  }

  chargeOutstandingBalanceToPaymentMethod(subject) {
    return this.pspForm.buildPaymentMethod()
    .then((paymentMethod) => {
      var newSubject = subject.clone();
      newSubject.charge(paymentMethod, newSubject.outstandingBalance);
      return newSubject;
    })
    .catch((errors) => {
      subject.errors().clear();
      throw subject.errors().addAll(...errors);
    });
  }

  paymentServiceProvider() {
    let { order } = this.props;

    return order.product().merchant().pspName;
  }

  render() {
    let { order } = this.props;

    let pspFormProps = {
      order,
      ref: (form) => { this.pspForm = form }
    };

    return <section className="payment">
      {
        {
          cash: <Cash></Cash>,
          spreedly: <Spreedly {...pspFormProps}></Spreedly>,
          square: <Square {...pspFormProps}></Square>,
        }[this.paymentServiceProvider()]
      }
    </section>;
  }
}
