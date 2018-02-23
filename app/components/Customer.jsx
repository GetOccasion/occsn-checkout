import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'mitragyna';
import { InputGroup } from 'reactstrap';

import occsn from '../libs/Occasion';

export default class Customer extends PureComponent {
  static propTypes = {
    subject: PropTypes.instanceOf(occsn.Customer),
  };

  render() {
    let { subject } = this.props;

    return <InputGroup>
      <Input type="email" name="email" className="form-control"></Input>
      <Input type="text" name="firstName" className="form-control"></Input>
      <Input type="text" name="lastName" className="form-control"></Input>
      <Input type="text" name="zip" className="form-control"></Input>
    </InputGroup>;
  }
}
