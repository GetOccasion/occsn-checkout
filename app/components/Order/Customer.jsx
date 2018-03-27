import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ErrorsFor, Field } from 'mitragyna';
import { FormFeedback, Input, ListGroup, ListGroupItem } from 'reactstrap';

import occsn from '../../libs/Occasion';

export default class Customer extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Customer),
  };

  render() {
    let { subject } = this.props;

    return <section>
      <ListGroup>
        <ListGroupItem>
          <Field type="email" name="email" placeholder="Email" component={ Input } invalidClassName='is-invalid'></Field>
          <ErrorsFor component={FormFeedback} field='email'></ErrorsFor>
        </ListGroupItem>
        <ListGroupItem>
          <Field type="text"  name="firstName" placeholder="First Name" component={ Input } invalidClassName='is-invalid'></Field>
          <ErrorsFor component={FormFeedback} field='firstName'></ErrorsFor>
        </ListGroupItem>
        <ListGroupItem>
          <Field type="text"  name="lastName" placeholder="Last Name" component={ Input } invalidClassName='is-invalid'></Field>
          <ErrorsFor component={FormFeedback} field='lastName'></ErrorsFor>
        </ListGroupItem>
        <ListGroupItem>
          <Field type="text"  name="zip" placeholder="Zip Code" component={ Input } invalidClassName='is-invalid'></Field>
          <ErrorsFor component={FormFeedback} field='zip'></ErrorsFor>
        </ListGroupItem>
      </ListGroup>
    </section>;
  }
}
