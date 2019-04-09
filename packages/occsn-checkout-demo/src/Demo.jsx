import React from 'react'

import {Customer} from '@occsn/customer'
import OccsnProvider from '@occsn/occsn-provider'
import {Product} from '@occsn/product'
import Order, { BookOrder } from '@occsn/order'

import { Button, Col, Container, Row } from 'reactstrap';

export default class Demo extends React.Component {
  render() {
    return (
      <OccsnProvider
        immutable={true}
        publicKey={window.OCCSN.api_key}
        url={window.OCCSN.host_url}
      >
        <Product id={window.OCCSN.product_id}>
          <Order>
            <Customer>
            </Customer>
          </Order>
        </Product>
      </OccsnProvider>
    )
  }
}
