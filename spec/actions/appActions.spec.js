import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import Immutable from 'immutable';

import occsn from '../../app/libs/Occasion'

import * as actions from '../../app/actions/appActions'
import types from '../../app/constants/appConstants'

import axios from 'axios';

import productFixture from '../fixtures/products/cash.json';
import blankQuestionsFixture from '../fixtures/blank.json';
import redeemablesSuccessFixture from 'fixtures/products/redeemables/coupons/fixed.json';
import redeemablesErrorFixture from 'fixtures/products/redeemables/not_found.json';

import bookedOrderFixture from 'fixtures/orders/booked/cash/free';
import bookedOrderFailedFixture from 'fixtures/errors/orders/customer.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('app actions', () => {
  let setup = (customResponses = {}) => {
    axios._setMockResponses({
      '/products/:id/': { status: 200, data: productFixture },
      '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
      '/orders/': { status: 201, data: bookedOrderFixture },
      ...customResponses
    });
  };

  afterEach(() => {
    axios.reset();
  });

  describe('loadProduct', () => {
    let store;

    beforeEach(async () => {
      setup();
      store = mockStore({ $$appStore: Immutable.fromJS({ product: null }) });

      await store.dispatch(actions.loadProduct(global.OCCSN.product_id));
    });

    it('includes venue, venue.state, and merchant.currency when requesting product', async () => {
      expect(axios.requests[0].params).toEqual({ include: 'merchant.currency,venue.state' });
    });

    it('creates appropriate actions', async () => {
      expect(typesForActions(store.getActions())).toEqual([
        types.LOAD_PRODUCT_REQUEST,
        types.SET_PRODUCT,
        types.SET_TIME_ZONE,
        types.CONSTRUCT_ORDER_REQUEST,
      ]);
    });

    it('creates SET_PRODUCT with product of class occsn.Product', async () => {
      expect(actionForType('SET_PRODUCT', store.getActions()).product).toBeInstanceOf(occsn.Product);
    });

    it('creates SET_PRODUCT with product with id == OCCSN.product_id', async () => {
      expect(actionForType('SET_PRODUCT', store.getActions()).product.id).toEqual(global.OCCSN.product_id);
    });
  });

  describe('bookOrder', () => {
    let store;

    context('when booking successful', () => {
      beforeEach(async () => {
        setup();
        store = mockStore({ $$appStore: Immutable.fromJS({ bookingOrder: false, order: null }) });

        var product = await occsn.Product.find(global.OCCSN.product_id);
        var order = await occsn.Order.construct({ product });

        await store.dispatch(actions.bookOrder(order));
      });

      it('creates appropriate actions', async () => {
        expect(typesForActions(store.getActions())).toEqual([
          types.BOOK_ORDER_REQUEST,
          types.SET_ORDER,
          types.BOOK_ORDER_REQUEST_COMPLETE,
        ]);
      });

      it('creates SET_ORDER with order of class occsn.Order', async () => {
        expect(actionForType('SET_ORDER', store.getActions()).order).toBeInstanceOf(occsn.Order);
      });

      it('creates SET_ORDER with order.status == booked', async () => {
        expect(actionForType('SET_ORDER', store.getActions()).order.status).toEqual('booked');
      });
    });

    context('when booking failed', () => {
      beforeEach(async () => {
        setup({
          '/orders/': { status: 422, data: bookedOrderFailedFixture },
        });
        store = mockStore({ $$appStore: Immutable.fromJS({ bookingOrder: false, order: null }) });

        var product = await occsn.Product.find(global.OCCSN.product_id);
        var order = await occsn.Order.construct({ product, status: 'initialized' });

        await store.dispatch(actions.bookOrder(order));
      });

      it('creates appropriate actions', async () => {
        expect(typesForActions(store.getActions())).toEqual([
          types.BOOK_ORDER_REQUEST,
          types.SET_ORDER,
          types.BOOK_ORDER_REQUEST_COMPLETE,
        ]);
      });

      it('creates SET_ORDER with order of class occsn.Order', async () => {
        expect(actionForType('SET_ORDER', store.getActions()).order).toBeInstanceOf(occsn.Order);
      });

      it('creates SET_ORDER with order.status == initialized', async () => {
        expect(actionForType('SET_ORDER', store.getActions()).order.status).toEqual('initialized');
      });

      it('creates SET_ORDER with order with errors', async () => {
        expect(actionForType('SET_ORDER', store.getActions()).order.errors().empty()).toBe(false);
      });
    });
  });

  describe('constructOrder', () => {
    let store;

    beforeEach(async () => {
      setup();
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
      expect(actionForType('SET_ORDER', store.getActions()).order).toBeInstanceOf(occsn.Order);
    });
  });

  describe('findRedeemable', () => {
    let store;

    let onSuccess = jest.fn();
    let onError = jest.fn();

    context('normal conditions', () => {
      beforeEach(async () => {
        setup({
          '/products/:id/redeemables/': { status: 200, data: redeemablesSuccessFixture },
        });

        store = mockStore({ $$appStore: Immutable.fromJS({ product: null }) });

        var product = await occsn.Product.find(global.OCCSN.product_id);

        await store.dispatch(actions.findRedeemable(product, 'CODE', onSuccess, onError));
      });

      it('requests redeemable with code for product', async () => {
        expect(axios.requests[1].params['filter']).toEqual({ code: 'CODE' });
      });

      it('creates appropriate actions', async () => {
        expect(typesForActions(store.getActions())).toEqual([
          types.FIND_REDEEMABLE_REQUEST,
          types.FIND_REDEEMABLE_REQUEST_COMPLETE,
        ]);
      });
    });

    context('on success', () => {
      beforeEach(async () => {
        setup({
          '/products/:id/redeemables/': { status: 200, data: redeemablesSuccessFixture },
        });

        store = mockStore({ $$appStore: Immutable.fromJS({ product: null }) });

        var product = await occsn.Product.find(global.OCCSN.product_id);

        await store.dispatch(actions.findRedeemable(product, 'CODE', onSuccess, onError));
      });

      it('calls onSuccess', async () => {
        expect(onSuccess.mock.calls.length).toBe(1);
      });
    });

    context('on error', () => {
      beforeEach(async () => {
        setup({
          '/products/:id/redeemables/': { status: 404, data: redeemablesErrorFixture },
        });

        store = mockStore({ $$appStore: Immutable.fromJS({ product: null }) });

        var product = await occsn.Product.find(global.OCCSN.product_id);

        await store.dispatch(actions.findRedeemable(product, 'CODE', onSuccess, onError));
      });

      it('calls onError', async () => {
        expect(onError.mock.calls.length).toBe(1);
      });
    });
  });

  describe('saveOrder', () => {
    let store;

    beforeEach(async () => {
      setup();

      store = mockStore({ $$appStore: Immutable.fromJS({ savingOrder: false }) });

      var product = await occsn.Product.find(global.OCCSN.product_id);
      var order = await occsn.Order.construct({ product });

      await store.dispatch(actions.saveOrder(order));
    });

    it('creates appropriate actions', async () => {
      expect(typesForActions(store.getActions())).toEqual([
        types.SAVE_ORDER_REQUEST,
        types.SET_ORDER,
        types.SAVE_ORDER_REQUEST_COMPLETE,
      ]);
    });
  });
});
