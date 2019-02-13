import React from 'react'
import { Provider } from 'react-redux'

import AppContainer from '../containers/AppContainer.jsx'
import createStore from '../store/appStore'

const store = createStore()

export default class OccsnCheckout extends React.Component {
  render() {
    return React.createElement(
      Provider,
      {
        store
      },
      React.createElement(AppContainer, {
        ...this.props
      })
    )
  }
}
