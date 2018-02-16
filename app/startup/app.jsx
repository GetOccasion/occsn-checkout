import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import OurAppContainer from '../containers/AppContainer'

import createStore from '../store/appStore';

const render = Component => {
  const store = createStore();

  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('booking-page')
  )
};

render(OurAppContainer);

if (module.hot) {
  module.hot.accept('../containers/AppContainer', () => { render(OurAppContainer) })
}
