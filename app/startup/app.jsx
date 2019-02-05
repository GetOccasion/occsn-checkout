import '@babel/polyfill';

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

import OccsnCheckout from '../containers/AppContainer'

import createStore from '../store/appStore';

const render = OccsnCheckout => {
  const store = createStore();

  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <OccsnCheckout
          config={
            {
              api_key: '3fab810787084bf188db835a76643778',
              host_url: 'http://noisacco.lvh.me:3000',
              product_id: 'modern_product',
              spreedly_key: 'CYJy65Wq5dmc2dGFVQOp6eci1Ka',
              square_key: 'sandbox-sq0idp-kKdgouNdlT2lj08V0tSJ3g',
              // time_slot_id: 'ut3zvqcJ',
              // coupon_code: 'TEST'
          }
        } />
      </Provider>
    </AppContainer>,
    document.getElementById('occsn-app')
  )
};

render(OccsnCheckout);
