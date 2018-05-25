import React from 'react';
import { Provider } from 'react-redux';

import Immutable from 'immutable';

import 'moment-timezone-with-data-2010-2020';

import { Resource } from 'mitragyna';

import Order from '../../app/components/Order';
import TimeSlotsContainer from '../../app/containers/TimeSlotsContainer';

import axios from 'axios';
import occsn from '../../app/libs/Occasion';

import calendarProductFixture from 'fixtures/products/calendar.json';
import blankQuestionsFixture from 'fixtures/blank.json';

import initializedOrderFixture from 'fixtures/orders/initialized/free.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots/index.json';

import orderTimeSlotsFixture from 'fixtures/orders/time_slots/event.json';
import orderTimeSlotsErrorFixture from 'fixtures/errors/orders/time_slot.json';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// TODO: Complete specs for displaying calendar vs. list, paginator
// TODO: Add Paginator unit specs
describe('TimeSlotsContainer', () => {
  let order, product, wrapper, store, timeSlots, timeSlotsWrapper;

  const mockFindRedeemable = jest.fn();
  const mockSaveOrder = jest.fn();
  const mockSetOrder = jest.fn();

  async function setupWrapper(orderResponses) {
    let responses = {
      '/products/:id/': { status: 200, data: calendarProductFixture },
      '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
      '/products/:id/time_slots/': { status: 200, data: productTimeSlotsFixture },
      '/orders/': { status: 201, data: initializedOrderFixture },
      ...orderResponses
    };
    axios._setMockResponses(responses);

    product = await occsn.Product.find('1');

    order = await occsn.Order.construct({ product, status: 'initialized' });

    order = await order.save();

    timeSlots = await product.timeSlots().all();

    let props = {
      order,
    };

    store = mockStore({
      $$appStore: Immutable.fromJS({ product, order }),
      $$calendarStore: Immutable.fromJS({ activeTimeSlotsCollection: timeSlots }),
    });

    wrapper = mount(
      <Provider store={store}>
        <TimeSlotsContainer {...props} />
      </Provider>
    );
  }
});
