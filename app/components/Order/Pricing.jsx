import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Currency from 'react-currency-formatter';
import Decimal from 'decimal.js-light';
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
        <p className="coupon-discount">
          <span>Coupon Discount: </span>
          <Currency currency={currency} quantity={order.couponAmount.neg().toNumber()} />
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
        Total price: <Currency currency={currency} quantity={order.price} />
      </p>
    );

    if(order.product().depositMethod != 'no_deposit') {
      rows.push(
        <>
          <p className="deposit-total">
            Deposit due today: <Currency currency={currency} quantity={order.priceDueOnInitialOrder} />
          </p>
          <div className="alert alert-info">
            We require you to make a deposit of <strong>{<Currency currency={currency} quantity={order.priceDueOnInitialOrder} />}</strong> today
            and pay the remaining <strong>{<Currency currency={currency} quantity={order.price - order.priceDueOnInitialOrder} />}</strong> on the time of the event.
          </div>
        </>
      );
    }

    if(order.giftCardAmount && !order.giftCardAmount.isZero()) {
      rows.push(
        <p className="gift-card-amount">
          <span>Gift Cards: </span>
          <Currency currency={currency} quantity={order.giftCardAmount.neg().toNumber()} />
        </p>,
        <p className="outstanding-balance">
          <span>Balance due today: </span>
          <Currency currency={currency} quantity={order.outstandingBalance.toNumber()} />
        </p>,
      );
    }

    return <section className="total-due">
      <section className="pricing">
        <section className="pricing-list">
          { rows }
        </section>
      </section>
    </section>;
  }
}
