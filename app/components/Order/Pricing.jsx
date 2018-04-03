import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Currency from 'react-currency-formatter';
import Decimal from 'decimal.js';
import _ from 'underscore';

import { Card, CardBody, CardText } from 'reactstrap';

import occsn from '../../libs/Occasion';

export default class Pricing extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order),
  };

  render() {
    let { order } = this.props;

    let rows = [];

    let currency = order.product().merchant().currency().name;

    var displaySubtotal = false;

    if(!_.isNull(order.coupon())) {
      displaySubtotal = true;

      rows.push(
        <p className="coupon">
          <span>Coupon Discount: </span>
          <Currency currency={currency} quantity={Decimal(order.couponAmount).neg().toNumber()} />
        </p>
      );
    }

    if(Decimal(order.taxPercentage).toNumber() > 0.0) {
      displaySubtotal = true;

      rows.push(
        <p className="tax">
          <span>Tax ({ order.taxPercentage }%): </span>
          <Currency currency={currency} quantity={order.tax} />
        </p>
      );
    }

    if(displaySubtotal) {
      rows.unshift(
        <p className="subtotal">
          <span>Subtotal: </span>
          <Currency currency={currency} quantity={order.subtotal} />
        </p>
      );
    }

    rows.push(
      <p className="total">
        <h4>Total: <Currency currency={currency} quantity={order.price} /></h4>
      </p>
    );

    if(!_.isNull(order.giftCardAmount)) {
      rows.push(
        <p className="giftCardAmount">
          <span>Gift Cards: </span>
          <Currency currency={currency} quantity={Decimal(order.giftCardAmount).neg().toNumber()} />
        </p>,
        <p className="outstandingBalance">
          <span>Balance due today: </span>
          <Currency currency={currency} quantity={Decimal(order.outstandingBalance).toNumber()} />
        </p>,
      );
    }

    return <Card>
      <CardBody>
        <CardText className="text-right">
          { rows }
        </CardText>
      </CardBody>
    </Card>;
  }
}
