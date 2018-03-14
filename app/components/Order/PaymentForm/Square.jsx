import React, { PureComponent } from 'react';

import PaymentServiceProvider from './PaymentServiceProvider';

export default class Square extends PaymentServiceProvider {
  // Initializes the iFrame using the global SqPaymentForm object imported as a separate script
  initializeForm() {

  }

  // Triggers paymentMethod event
  tokenizePaymentMethodData() {

  }

  render() {
    return <section>
    </section>;
  }
}
