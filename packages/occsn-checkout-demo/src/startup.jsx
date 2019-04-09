import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import 'bootstrap/dist/css/bootstrap.css'

import Demo from './Demo'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('occsn-app')
  )
}

render(Demo)

if (module.hot) {
  module.hot.accept('./Demo.jsx', () => {
    render(Demo)
  })
}
