import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';
import Decimal from 'decimal.js-light';

import occsn from '../../../libs/Occasion';

import Currency from 'react-currency-formatter';

import { Button, Card, CardBody, CardTitle, CardText, Col, FormText, Row } from "reactstrap";

export default class GiftCard extends PureComponent {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    subject: PropTypes.instanceOf(occsn.Transaction),
  };

  static contextTypes = {
    removeRedeemable: PropTypes.func,
  };

  render() {
    let { currency, subject } = this.props;
    let { removeRedeemable } = this.context;

    let giftCard = subject.paymentMethod();
    let giftCardValue = new Decimal(giftCard.value);

    let transactionValue = new Decimal(subject.amount);

    let remainingBalance = giftCardValue.minus(transactionValue);

    let onRemove = () => {
      removeRedeemable(giftCard)
    };

    return <Card className="gift-card-container">
      <CardBody className="gift-card">
        <Button className="close" onClick={onRemove}>
          <span aria-hidden="true">&times;</span>
        </Button>
        <CardText className="gift-card-messages">
          <CardTitle className="gift-card-title">
            Gift Card - { subject.paymentMethod().code }
          </CardTitle>
          <FormText className="gift-card-remaining-balance">
            Remaining balance will be <Currency currency={currency} quantity={ remainingBalance.toNumber() }></Currency> after checkout.
          </FormText>
          <span className="gift-card-amount">
            <Currency currency={currency} quantity={ transactionValue.toNumber() }></Currency>&nbsp;/&nbsp;
          </span>
          <span className="gift-card-value">
            <Currency currency={currency} quantity={ giftCardValue.toNumber() }></Currency>
          </span>
        </CardText>
      </CardBody>
    </Card>
  }
}
