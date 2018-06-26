import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';
import Decimal from 'decimal.js';

import occsn from '../../../libs/Occasion';

import Currency from 'react-currency-formatter';

import { Button, Card, CardBody, CardTitle, CardText, Col, FormText, Row } from "reactstrap";

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

    return <Card className="gift-card-container">
      <CardBody className="gift-card">
        <Button className="close">
          <span aria-hidden="true">&times;</span>
        </Button>
        <CardText className="gift-card-messages">
          <CardTitle className="gift-card-title">
            Gift Card - { subject.paymentMethod().code }
          </CardTitle>
          <FormText className="gift-card-remaining-balance">
            Remaining balance will be <Currency currency={currency} quantity={ remainingBalance.toNumber() }></Currency> after checkout.
          </FormText>
        </CardText>
        <CardText className="gift-card-value">
          <Currency currency={currency} quantity={ giftCardValue.toNumber() }></Currency>
        </CardText>
      </CardBody>
    </Card>
  }
}
