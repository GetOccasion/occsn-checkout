import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';
import Decimal from 'decimal.js';

import occsn from '../../../libs/Occasion';

import Currency from 'react-currency-formatter';

import { Card, CardBody, CardTitle, CardText, Col, Row } from "reactstrap";

export default class Coupon extends PureComponent {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    subject: PropTypes.instanceOf(occsn.Coupon),
  };

  render() {
    let { currency, subject } = this.props;

    let discount;
    if(!_.isNull(subject.discountFixed)) {
      discount = <Currency currency={currency} quantity={ Decimal(subject.discountFixed).toNumber() }></Currency>;
    } else {
      discount = <span>{subject.discountPercentage}%</span>;
    }

    return <Card>
      <CardBody>
        <Row>
          <Col xs="9">
            <CardTitle>
              { subject.name } - { subject.code }
            </CardTitle>
          </Col>
          <Col xs="3">
            <CardText>{ discount }</CardText>
          </Col>
        </Row>
      </CardBody>
    </Card>
  }
}
