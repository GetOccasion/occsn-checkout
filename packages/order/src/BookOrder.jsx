import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';

import {OccsnContext} from '@occsn/occsn-provider';

export default class BookOrder extends PureComponent {
  static contextType = OccsnContext

  constructor() {
    super();
    const { registerComponent } = this.context

    registerComponent('bookOrder', this)
  }

  render() {
    const { components: { order }} = this.context

    return React.Children.only(this.props.children, child => {
      return React.cloneElement(child, {
        className: classnames(child.props.className, {
          booking: order.isBooking()
        }),
        disabled: !order.allowedToBookOrder(),
        onClick: order.submit
      })
    })
  }
}
