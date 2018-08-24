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
    squareIframeInputStyles: PropTypes.object,
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
    let { order, spreedlyIframeInputStyles, squareIframeInputStyles } = this.props;

    let pspFormProps = {
      order,
      ref: (form) => { this.pspForm = form },
    };

    return <section className="payment">
      {
        {
          cash: <Cash {...pspFormProps}></Cash>,
          spreedly: <Spreedly {...pspFormProps} spreedlyIframeInputStyles={spreedlyIframeInputStyles}></Spreedly>,
          square: <Square {...pspFormProps} squareIframeInputStyles={squareIframeInputStyles}></Square>,
        }[this.paymentServiceProvider()]
      }
      {
        this.paymentServiceProvider() != 'cash' ? (
          <a
            href="//www.shopify.com/pci-compliant/?utm_source=secure&amp;utm_medium=shop"
            title="This online store is secured by Shopify"
            target="_blank"
          >
            <img src="//cdn.shopify.com/s/images/badges/shopify-secure-badge-light-shadow.png" alt="Shopify secure badge" />
          </a>
        ) : (null)
      }
    </section>;
  }
}
