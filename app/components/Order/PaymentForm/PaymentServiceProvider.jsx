import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Q from 'q';

import _ from 'underscore';

import occsn from '../../../libs/Occasion';

export default class PaymentServiceProvider extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order)
  };

  constructor() {
    super();

    this.reset();

    _.bindAll(this,
      'buildPaymentMethod',
      'initializeForm',
      'tokenizePaymentMethodData',
      'reset',
    );
  }

  componentDidMount() {
    this.initializeForm();
  }

  buildPaymentMethod() {
    this.reset();
    this.tokenizePaymentMethodData();

    return this.paymentMethodDeferred.promise;
  }

  // Initializes the iFrame form that the 3rd party PSP provides for their PCI-compliant service
  initializeForm() {
    throw 'initializeForm must be defined by subclasses';
  }

  // Sends the data contained the payment method form to the 3rd party PSP
  tokenizePaymentMethodData() {
    throw 'tokenizePaymentMethodData must be defined by subclasses';
  }

  reset() {
    this.paymentMethodDeferred = Q.defer();
  }
}
