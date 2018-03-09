import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Currency from 'react-currency-formatter';
import Decimal from 'decimal';

import occsn from '../../libs/Occasion';

export default class Pricing extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order),
  };

  render() {
    let { order } = this.props;

    let rows = [];

    let currency = order.product().merchant().currency().name;

    if(Decimal(order.taxPercentage).toNumber() > 0.0) {
      rows.push(
        <p className="subtotal">
          <span>Subtotal: </span>
          <Currency currency={currency} quantity={order.subtotal} />
        </p>
      );

      rows.push(
        <p className="tax">
          <span>Tax ({ order.taxPercentage }%): </span>
          <Currency currency={currency} quantity={order.tax} />
        </p>
      );
    }

    rows.push(
      <p className="total">
        <span>Total: </span>
        <Currency currency={currency} quantity={order.price} />
      </p>
    );

    return <section>
      { rows }
    </section>;
  }
}
