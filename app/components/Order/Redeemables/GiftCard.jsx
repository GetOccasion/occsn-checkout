import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';
import Decimal from 'decimal.js';

import occsn from '../../../libs/Occasion';

import Currency from 'react-currency-formatter';

import { Card, CardBody, CardTitle, CardText, Col, FormText, Row } from "reactstrap";

export default class GiftCard extends PureComponent {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    subject: PropTypes.instanceOf(occsn.Transaction),
  };

  render() {
    let { currency, subject } = this.props;

    let giftCard = subject.paymentMethod();
    let giftCardValue = Decimal(giftCard.value);

    let transactionValue = Decimal(subject.amount);

    let remainingBalance = giftCardValue.minus(transactionValue);

    return <Card className="mb-2">
      <CardBody>
        <Row>
          <Col xs="9">
            <CardTitle>
              Gift Card - { subject.paymentMethod().code }
            </CardTitle>
            <FormText>Remaining balance will be <Currency currency={currency} quantity={ remainingBalance.toNumber() }></Currency> after checkout.</FormText>
          </Col>
          <Col xs="3">
            <CardText className="text-right">
              <h4>
                <Currency currency={currency} quantity={ giftCardValue.toNumber() }></Currency>
              </h4>
            </CardText>
          </Col>
        </Row>
      </CardBody>
    </Card>
  }
}
