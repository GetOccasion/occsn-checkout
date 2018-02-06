import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './app/containers/Root'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
};

render(Root);

if (module.hot) {
  module.hot.accept('./app/containers/Root', () => { render(Root) })
}
