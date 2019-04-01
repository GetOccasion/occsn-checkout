import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Resource } from 'mitragyna'
import { Container, Row, Col } from 'reactstrap'

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
      occsn: Occasion.Client(options)
    };
  }

  render() {
    const { children } = this.props;

    return (
      <OccsnContext.Provider value={this.state.occsn}>
        {children}
      </OccsnContext.Provider>
    );
  }
}
