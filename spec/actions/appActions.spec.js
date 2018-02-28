import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import Immutable from 'immutable';

import occsn from '../../app/libs/Occasion'

import * as actions from '../../app/actions/appActions'
import types from '../../app/constants/appConstants'

import axios from 'axios';

import productFixture from '../fixtures/products/cash.json';
import blankQuestionsFixture from '../fixtures/blank.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
  beforeEach(() => {
    axios._setMockResponses({
      '/products/:id/': { status: 200, data: productFixture },
      '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
    });
  });

  describe('loadProduct', () => {
    let store;

    beforeEach(async () => {
      store = mockStore({ $$appStore: Immutable.fromJS({ product: null }) });

      await store.dispatch(actions.loadProduct(global.OCCSN.product_id));
    });

    it('includes venue, venue.state, and merchant when requesting product', async () => {
      expect(axios.requests[0].params).toEqual({ include: 'merchant,venue.state' });
    });

    it('creates appropriate actions', async () => {
      expect(typesForActions(store.getActions())).toEqual([
        types.LOAD_PRODUCT_REQUEST,
        types.SET_PRODUCT,
        types.CONSTRUCT_ORDER_REQUEST,
      ]);
    });

    it('creates SET_PRODUCT with product of class occsn.Product', async () => {
      expect(store.getActions()[1].product).toBeInstanceOf(occsn.Product);
    });

    it('creates SET_PRODUCT with product with id == OCCSN.product_id', async () => {
      expect(store.getActions()[1].product.id).toEqual(global.OCCSN.product_id);
    });
  });

  describe('constructOrder', () => {
    let store;

    beforeEach(async () => {
      store = mockStore({ $$appStore: Immutable.fromJS({ order: null }) });

      var product = await occsn.Product.find(global.OCCSN.product_id);

      await store.dispatch(actions.constructOrder(product));
    });

    it('creates appropriate actions', async () => {
      expect(typesForActions(store.getActions())).toEqual([
        types.CONSTRUCT_ORDER_REQUEST,
        types.SET_ORDER,
      ]);
    });

    it('creates SET_ORDER with order of class occsn.Order', async () => {
      expect(store.getActions()[1].order).toBeInstanceOf(occsn.Order);
    });
  });
});