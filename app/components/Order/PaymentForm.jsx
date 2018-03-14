import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import Spreedly from './PaymentForm/Spreedly';
import Square from './PaymentForm/Square';

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

  async chargeOutstandingBalanceToPaymentMethod(subject) {
    var paymentMethod = await this.pspForm.buildPaymentMethod();

    var newSubject = subject.clone();
    newSubject.charge(paymentMethod, newSubject.outstandingBalance);
    return newSubject;
  }

  paymentServiceProvider() {
    let { order } = this.props;

    return order.product().merchant().pspName;
  }

  render() {
    let { order } = this.props;

    let pspFormProps = {
      ref: (form) => { this.pspForm = form }
    };

    return <section>
      {
        {
          spreedly: <Spreedly {...pspFormProps}></Spreedly>,
          square: <Square {...pspFormProps}></Square>,
        }[this.paymentServiceProvider()]
      }
    </section>;
  }
}
