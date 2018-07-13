import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ErrorsFor, Field } from 'mitragyna';
import { FormFeedback, Input, FormGroup, Label } from 'reactstrap';

import occsn from '../../libs/Occasion';

export default class Customer extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Customer),
  };

  render() {
    return <section className="customer">
      <FormGroup className="customer-email-form-group">
        <Label for="email">Email*</Label>
        <Field className="customer-email-field" type="email" name="email" id="email" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-email-errors" component={FormFeedback} field='email'></ErrorsFor>
      </FormGroup>
      <FormGroup className="customer-first-name-form-group">
        <Label for="firstName">First Name*</Label>
        <Field className="customer-first-name-field" type="text" name="firstName" id="firstName" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-first-name-errors" component={FormFeedback} field='firstName'></ErrorsFor>
      </FormGroup>
      <FormGroup className="customer-last-name-form-group">
        <Label for="lastName">Last Name*</Label>
        <Field className="customer-last-name-field" type="text"  name="lastName" id="lastName" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-last-name-errors" component={FormFeedback} field='lastName'></ErrorsFor>
      </FormGroup>
      <FormGroup className="customer-zip-form-group">
        <Label for="zip">Zip Code*</Label>
        <Field className="customer-zip-field" type="text" name="zip" id="zip" component={ Input } invalidClassName='is-invalid'></Field>
        <ErrorsFor className="customer-zip-errors" component={FormFeedback} field='zip'></ErrorsFor>
      </FormGroup>
    </section>;
  }
}
