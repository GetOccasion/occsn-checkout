import React, { PureComponent } from 'react';

import { ErrorsFor } from 'mitragyna';

import { FormGroup, Alert } from 'reactstrap';

import PaymentServiceProvider from './PaymentServiceProvider';

export default class Cash extends PaymentServiceProvider {
  initializeForm() {}

  render() {
    return <section>
      <FormGroup>
        <Alert color="warning">
          No payment required at this time. Payment will be collected at the venue.
        </Alert>
      </FormGroup>
    </section>;
  }
}
