import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import 'bootstrap/dist/css/bootstrap.css';

import Root from './app/containers/Root'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('booking-page')
  )
};

render(Root);

if (module.hot) {
  module.hot.accept('./app/containers/Root', () => { render(Root) })
}
