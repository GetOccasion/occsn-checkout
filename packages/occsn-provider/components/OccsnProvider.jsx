import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Resource } from 'mitragyna'
import { Container, Row, Col } from 'reactstrap'
import _ from 'underscore'

import occsn from '../libs/Occasion'

import ActiveResource from 'active-resource'
import Occasion from 'occasion-sdk'

const OccsnContext = React.createContext();

export const OccsnContextConsumer = OccsnContext.Consumer;

export class OccsnProvider extends PureComponent {
  static propTypes = {
    immutable: PropTypes.bool,
    publicKey: PropTypes.string.isRequired,
    privateKey: PropTypes.string.isRequired,
    url: PropTypes.string
  }

  static defaultProps = {
    url: window.OCCSN.host_url
  }

  constructor(props) {
    super();

    let options = {
      immutable: props.immutable,
      token: props.publicKey
    }

    if (props.url != undefined) {
      options.baseUrl = ActiveResource.Links.__constructLink(url, 'api', 'v1')
    }

    this.state = {
      components: {},
      occsn: Occasion.Client(options)
    }
  }

  // Adds a subcomponent like MissingAnswers or Redeemables to the component register
  // so the OrderForm can use them in internal methods
  registerComponent(name, component) {
    this.setState({
      components: _.extend(
        this.state.components,
        { [name]: component }
      )
    })
  }

  render() {
    const { children } = this.props

    return (
      <OccsnContext.Provider value={{
          ...this.state,
          registerComponent: this.registerComponent
        }}>
        {children}
      </OccsnContext.Provider>
    )
  }
}
