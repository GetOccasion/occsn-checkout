import React from 'react'
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import AppContainer from '../containers/AppContainer.jsx'
import createStore from '../store/appStore';

export default class OccsnCheckout extends React.Component {
  componentDidMount() {
    this.store = createStore();
  }

  render() {
    return React.createElement(
      Provider,
      {
        store: this.store
      },
      React.createElement(
        AppContainer,
        {
          ...this.props,
        }
      )
    );
  }
}
