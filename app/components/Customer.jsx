import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'mitragyna';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';

import occsn from '../libs/Occasion';

export default class Customer extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Customer),
  };

  render() {
    let { subject } = this.props;

    return <section>
      <h2>Customer Information</h2>
      <ListGroup>
        <ListGroupItem>
          <Field type="email" name="email" placeholder="Email" component={ Input }></Field>
        </ListGroupItem>
        <ListGroupItem>
          <Field type="text"  name="firstName" placeholder="First Name" component={ Input }></Field>
        </ListGroupItem>
        <ListGroupItem>
          <Field type="text"  name="lastName" placeholder="Last Name" component={ Input }></Field>
        </ListGroupItem>
        <ListGroupItem>
          <Field type="text"  name="zip" placeholder="Zip Code" component={ Input }></Field>
        </ListGroupItem>
      </ListGroup>
    </section>;
  }
}
