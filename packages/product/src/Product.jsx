import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import _ from 'underscore'

import OccsnContextConsumer from '@occsn/occsn-provider'

export class Product extends PureComponent {
  static contextType = OccsnContextConsumer

  static propTypes = {
    id: PropTypes.string.isRequired,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    onLoad: _.noop
  }

  constructor() {
    super()
    this.state = {
      loading: false,
      product: null
    }
  }

  componentDidMount() {
    this.loadProduct()
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    const { id: prevId } = prevProps

    if (id !== prevId) this.loadProduct()
  }

  loadProduct = () => {
    const { id, onLoad } = this.props
    const { occsn: { Product }} = this.context

    this.setState({ loading: true }, async () => {
      let product = await Product
        .includes(
          'labels',
          {
            merchant: 'currency',
            venue: 'state'
          }
        )
        .find(id)

      this.setState({ loading: false, product }, () => onLoad(product))
    });
  }

  render() {
    const { children, className } = this.props
    const { loading, product } = this.state

    className = classnames(className, 'occsn-product', {
      loading
    })

    return (
      <section className={className}>
        {
          product && (
            React.Children.map(children, child => {
              return React.cloneElement(child, {
                product
              })
            })
          )
        }
      </section>
    )
  }
}
