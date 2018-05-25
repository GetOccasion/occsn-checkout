import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import ActiveResource from 'active-resource';
import Immutable from 'immutable';

import occsn from '../../app/libs/Occasion'

import * as actions from '../../app/actions/calendarActions'
import types from '../../app/constants/calendarConstants'

import axios from 'axios';

import productFixture from '../fixtures/products/cash.json';
import blankQuestionsFixture from '../fixtures/blank.json';
import timeSlotsFixture from '../fixtures/products/time_slots/index.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('calendar actions', () => {
  beforeEach(() => {
    axios._setMockResponses({
      '/products/:id/': { status: 200, data: productFixture },
      '/products/:id/time_slots/': { status: 200, data: timeSlotsFixture },
    });
  });

  describe('loadProductTimeSlots', () => {
    let store, product;

    beforeEach(async () => {
      store = mockStore({
        $$calendarStore: Immutable.fromJS({ activeTimeSlotsCollection: ActiveResource.Collection.build() })
      });

      product = await occsn.Product.find('1');

      await store.dispatch(actions.loadProductTimeSlots(product));
    });

    it('filters by status bookable when requesting time slots', async () => {
      expect(axios.requests[1].params).toEqual({ filter: { status: 'bookable' } });
    });

    it('creates appropriate actions', async () => {
      expect(typesForActions(store.getActions())).toEqual([
        types.LOAD_PRODUCT_TIME_SLOTS_REQUEST,
        types.SET_ACTIVE_TIME_SLOTS_COLLECTION
      ]);
    });
  });
});
