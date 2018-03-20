import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decimal from 'decimal.js';
import _ from 'underscore';

import occsn from '../../libs/Occasion'

import { Button, Col, Card, CardBody, CardTitle, CardText, InputGroup, InputGroupAddon, Input, Row } from 'reactstrap';

import Coupon from './Redeemables/Coupon';

export default class Redeemables extends PureComponent {
  static propTypes = {
    findRedeemable: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    order: PropTypes.instanceOf(occsn.Order).isRequired,
  };

  constructor() {
    super();

    _.bindAll(this,
      'addError',
      'addRedeemable',
      'checkForRedeemable',
      'handleChange',
      'showInput',
    );
  }

  componentWillMount() {
    this.setState({ code: '' });
  }

  addError(errors) {

  }

  addRedeemable(redeemable) {
    let { onChange, order } = this.props;

    if(redeemable.isA(occsn.Coupon)) {
      onChange(order.assignAttributes({ coupon: redeemable }))
    } else if(redeemable.isA(occsn.GiftCard)) {
      order = order.clone();

      var outstandingBalance = Decimal(order.outstandingBalance);
      var giftCardValue = Decimal(redeemable.value);

      var transactionAmount;
      if(outstandingBalance.greaterThan(giftCardValue)) {
        transactionAmount = giftCardValue;
      } else {
        transactionAmount = outstandingBalance;
      }

      order.charge(redeemable, transactionAmount.toString());

      onChange(order);
    }
  }

  checkForRedeemable(code) {
    let { findRedeemable, order } = this.props;

    findRedeemable(order.product(), code, this.addRedeemable, this.addError);
  }

  handleChange(e) {
    this.setState({ code: e.target.value });
  }

  // If true, display the input to search for more redeemables
  //
  // @note Displays in two cases:
  //   - outstandingBalance is greater than zero (more gift cards can be added)
  //   - outstandingBalance is zero, but a coupon has not been added (coupon can still lower order.price)
  //
  // @return [Boolean] whether or not to show the input to search for more redeemables
  showInput() {
    const { order } = this.props;

    return !Decimal(order.outstandingBalance).isZero() ||  _.isNull(order.coupon())
  }

  render() {
    let { order } = this.props;
    let { code } = this.state;

    let redeemables = [];
    if(!_.isNull(order.coupon())) {
      redeemables.push(<Coupon currency={ order.product().merchant().currency().name } subject={order.coupon()}></Coupon>);
    }

    return <section>
      { redeemables }

      { this.showInput() ? (
          <InputGroup>
            <Input onChange={ this.handleChange } value={ code } />
            <InputGroupAddon addonType="append">
              <Button onClick={ () => this.checkForRedeemable(code) }>Search</Button>
            </InputGroupAddon>
          </InputGroup>
        ) : (null)
      }
    </section>;
  }
}
