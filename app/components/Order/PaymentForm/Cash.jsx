import React, { PureComponent } from 'react';

import { ErrorsFor } from 'mitragyna';

import { FormGroup, Alert } from 'reactstrap';

import PaymentServiceProvider from './PaymentServiceProvider.jsx';

export default class Cash extends PaymentServiceProvider {
  initializeForm() {}

  render() {
    return <section className="cash-container">
      <Alert color="warning" className="cash">
        No payment required at this time. Payment will be collected at the venue.
      </Alert>
    </section>;
  }
}
