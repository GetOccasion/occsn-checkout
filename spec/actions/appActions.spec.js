import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Immutable from 'immutable';

import * as actions from '../../app/actions/appActions'
import * as types from '../../app/constants/appConstants'

import axios from 'axios';

import productFixture from '../fixtures/products/cash.json';
import blankQuestionsFixture from '../fixtures/blank.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
  beforeEach(() => {
    axios._setMockResponses({
      '/products': { status: 200, data: productFixture },
      '/questions': { status: 200, data: blankQuestionsFixture },
    });
  });

  describe('loadProduct', () => {
    it('sets product', () => {
      const store = mockStore({ $$appStore: Immutable.fromJS({ product: null }) });

      return store.dispatch(actions.loadProduct(global.OCCSN.product_id)).then(() => {
        // return of async actions
        expect(store.getActions()[0].product.id).toEqual(global.OCCSN.product_id);
      })
    });
  });
});
