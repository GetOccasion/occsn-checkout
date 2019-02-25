import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import _ from 'underscore'
import Decimal from 'decimal.js-light'

import occsn from '../../../libs/Occasion'

import Currency from 'react-currency-formatter'

import { Button, Card, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap'

export default class Coupon extends PureComponent {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    subject: PropTypes.instanceOf(occsn.Coupon)
  }

  static contextTypes = {
    removeRedeemable: PropTypes.func
  }

  render() {
    let { currency, subject } = this.props
    let { removeRedeemable } = this.context

    let discount
    if (!_.isNull(subject.discountFixed)) {
      discount = (
        <Currency currency={currency} quantity={Decimal(subject.discountFixed).toNumber()} />
      )
    } else {
      discount = <span>{subject.discountPercentage}%</span>
    }

    let onRemove = () => {
      removeRedeemable(subject)
    }

    return (
      <Card className="coupon-container">
        <CardBody className="coupon">
          <Button className="close" onClick={onRemove}>
            <span aria-hidden="true">&times;</span>
          </Button>
          <CardTitle className="coupon-title">
            {subject.name} - {subject.code}
          </CardTitle>
          <CardText className="coupon-message">{discount}</CardText>
        </CardBody>
      </Card>
    )
  }
}
