import React, { PureComponent } from 'react';

import Q from 'q';

import _ from 'underscore';

export default class PaymentServiceProvider extends PureComponent {
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

  async buildPaymentMethod() {
    this.tokenizePaymentMethodData();

    return await this.paymentMethodDeferred.promise;
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
