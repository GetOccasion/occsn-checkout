import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';
import { ErrorsFor, Field, Resource } from 'mitragyna'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

import {OccsnContext} from '@occsn/occsn-provider'

export class Customer extends PureComponent {
  static contextType = OccsnContext

  constructor() {
    super();

    this.state = {}
  }

  render() {
    const { className } = this.props
    const { components: { order }} = this.context

    let classNames = classnames('occsn-customer', className)

    let customer = order.getOrder().customer()

    return (
      <section className={classNames}>
        <Resource reflection="customer" subject={customer}>
          <FormGroup className="customer-email-form-group">
            <Label for="email">Email*</Label>
            <Field
              className="customer-email-field"
              type="email"
              name="email"
              id="email"
              component={Input}
              invalidClassName="is-invalid"
            />
            <ErrorsFor className="customer-email-errors" component={FormFeedback} field="email" />
          </FormGroup>
          <FormGroup className="customer-first-name-form-group">
            <Label for="firstName">First Name*</Label>
            <Field
              className="customer-first-name-field"
              type="text"
              name="firstName"
              id="firstName"
              component={Input}
              invalidClassName="is-invalid"
            />
            <ErrorsFor
              className="customer-first-name-errors"
              component={FormFeedback}
              field="firstName"
            />
          </FormGroup>
          <FormGroup className="customer-last-name-form-group">
            <Label for="lastName">Last Name*</Label>
            <Field
              className="customer-last-name-field"
              type="text"
              name="lastName"
              id="lastName"
              component={Input}
              invalidClassName="is-invalid"
            />
            <ErrorsFor
              className="customer-last-name-errors"
              component={FormFeedback}
              field="lastName"
            />
          </FormGroup>
          <FormGroup className="customer-zip-form-group">
            <Label for="zip">Zip Code*</Label>
            <Field
              className="customer-zip-field"
              type="text"
              name="zip"
              id="zip"
              component={Input}
              invalidClassName="is-invalid"
            />
            <ErrorsFor className="customer-zip-errors" component={FormFeedback} field="zip" />
          </FormGroup>
        </Resource>
      </section>
    )
  }
}
