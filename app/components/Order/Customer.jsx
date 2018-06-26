import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ErrorsFor, Field } from 'mitragyna';
import { FormFeedback, Input, FormGroup } from 'reactstrap';

import occsn from '../../libs/Occasion';

export default class Customer extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Customer),
  };

  render() {
    return <section className="customer">
      <FormGroup className="customer-email-form-group">
        <Field className="customer-email-field" type="email" name="email" placeholder="Email" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-email-errors" component={FormFeedback} field='email'></ErrorsFor>
      </FormGroup>
      <FormGroup className="customer-first-name-form-group">
        <Field className="customer-first-name-field" type="text" name="firstName" placeholder="First Name" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-first-name-errors" component={FormFeedback} field='firstName'></ErrorsFor>
      </FormGroup>
      <FormGroup className="customer-last-name-form-group">
        <Field className="customer-last-name-field" type="text"  name="lastName" placeholder="Last Name" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-last-name-errors" component={FormFeedback} field='lastName'></ErrorsFor>
      </FormGroup>
      <FormGroup className="customer-zip-form-group">
        <Field className="customer-zip-field" type="text"  name="zip" placeholder="Zip Code" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-zip-errors" component={FormFeedback} field='zip'></ErrorsFor>
      </FormGroup>
    </section>;
  }
}
