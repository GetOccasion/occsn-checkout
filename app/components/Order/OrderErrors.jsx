import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import _ from 'underscore'

import { Alert } from 'reactstrap'

import occsn from '../../libs/Occasion'

export default class OrderErrors extends PureComponent {
  static propTypes = {
    order: PropTypes.instanceOf(occsn.Order)
  }

  constructor() {
    super()

    _.bindAll(this, 'empty')
  }

  empty() {
    const { order } = this.props

    return order.errors().empty()
  }

  render() {
    const { order } = this.props

    if (this.empty()) {
      return null
    } else {
      return (
        <Alert color="danger" className="order-errors">
          <p className="order-errors-text">
            The following errors occurred while booking:
          </p>
          <ul className="order-errors-list">
            {order
              .errors()
              .toCollection()
              .map(e => {
                return <li className="order-error">{e.detail}</li>
              })
              .toArray()}
          </ul>
        </Alert>
      )
    }
  }
}
