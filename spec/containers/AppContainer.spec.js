import React from 'react';
import { AppContainer } from '../../app/containers/AppContainer.jsx';

import ActiveResource from 'active-resource';

import axios from 'axios';
import occsn from '../../app/libs/Occasion';

import { Resource } from 'mitragyna';
import Header from '../../app/components/Header';
import Order from '../../app/components/Order';
import OrderComplete from '../../app/components/Order/Complete';

import productFixture from '../fixtures/products/cash.json';
import blankQuestionsFixture from '../fixtures/blank.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots/index.json';

import initializedOrderFixture from 'fixtures/orders/initialized/free.json';
import bookedOrderFixture from 'fixtures/orders/booked/cash/free.json';
import orderTimeSlotFixture from 'fixtures/orders/time_slots/event.json';
import {loadProductTimeSlots} from "../../app/actions/calendarActions";

describe('AppContainer', () => {
  let wrapper;

  let product, order, timeSlots, activeTimeSlotsCollection;

  const mockLoadProduct = jest.fn();
  const mockLoadProductTimeSlots = jest.fn();
  const mockBookOrder = jest.fn();
  const mockFindRedeemable = jest.fn();
  const mockSaveOrder = jest.fn();
  const mockSetOrder = jest.fn();

  async function setupWrapper(orderResponses, buildProps) {
    axios._setMockResponses({
      '/products/:id/': { status: 200, data: productFixture },
      '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
      '/products/:id/time_slots/': { status: 200, data: productTimeSlotsFixture },
      ...orderResponses
    });

    let props = (buildProps != undefined) ? await buildProps() : {};

    wrapper = shallow(<AppContainer {...props} />);
  }

  context('on init', () => {
    beforeEach(async () => {
      await setupWrapper({}, () => {
        return {
          actions: {
            loadProduct: mockLoadProduct,
            loadProductTimeSlots: mockLoadProductTimeSlots,
            bookOrder: mockBookOrder,
            setOrder: mockSetOrder,
          },
          data: {}
        };
      });
    });

    it('calls loadProduct', () => {
      expect(mockLoadProduct.mock.calls.length).toBe(1);
    });
  });

  context('if product loaded', () => {
    beforeEach(async () => {
      await setupWrapper({}, async () => {

        return {
          actions: {
            loadProduct: mockLoadProduct,
            loadProductTimeSlots: mockLoadProductTimeSlots,
            bookOrder: mockBookOrder,
            setOrder: mockSetOrder,
          },
          data: {}
        };
      });

      product = await occsn.Product.find(global.OCCSN.product_id);
      activeTimeSlotsCollection = ActiveResource.Collection.build();
      wrapper.setProps({
        data: {
          product,
          activeTimeSlotsCollection
        }
      });
    });

    it('renders Header', () => {
      expect(wrapper).toContainReact(<Header product={product}></Header>);
    });

    it('calls loadProductTimeSlots', () => {
      expect(mockLoadProductTimeSlots.mock.calls.length).toBe(1);
    });

    it('does not render Resource with Order', () => {
      expect(wrapper).not.toContainReact(
        <Resource
          afterUpdate={mockSetOrder}
          component={Order}
          componentProps={ { activeTimeSlotsCollection } }
          onSubmit={mockBookOrder}
        ></Resource>);
    });
  });

  context('if order constructed', () => {
    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: initializedOrderFixture },
      }, async () => {
        product = await occsn.Product.find(global.OCCSN.product_id);
        activeTimeSlotsCollection = ActiveResource.Collection.build();

        return {
          actions: {
            loadProduct: mockLoadProduct,
            loadProductTimeSlots: mockLoadProductTimeSlots,
            bookOrder: mockBookOrder,
            saveOrder: mockSaveOrder,
            setOrder: mockSetOrder,
          },
          data: {
            product,
            activeTimeSlotsCollection
          }
        };
      });

      order = await occsn.Order.construct({ product });
      wrapper.setProps({
        data: {
          order
        }
      });
    });

    it('calls saveOrder', async () => {
      expect(mockSaveOrder.mock.calls.length).toBe(1);
    });
  });

  context('if order initialized', () => {
    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: initializedOrderFixture },
      }, async () => {
        product = await occsn.Product.find(global.OCCSN.product_id);
        order = await occsn.Order.construct({ product });
        activeTimeSlotsCollection = ActiveResource.Collection.build();
        order = await order.save();

        return {
          actions: {
            loadProduct: mockLoadProduct,
            loadProductTimeSlots: mockLoadProductTimeSlots,
            bookOrder: mockBookOrder,
            findRedeemable: mockFindRedeemable,
            saveOrder: mockSaveOrder,
            setOrder: mockSetOrder,
          },
          data: {
            product,
            order,
            activeTimeSlotsCollection
          }
        };
      });
    });

    it('renders Resource with Order', () => {
      expect(wrapper).toContainReact(
        <Resource
          afterUpdate={mockSetOrder}
          component={Order}
          componentProps={ { findRedeemable: mockFindRedeemable, saveOrder: mockSaveOrder, activeTimeSlotsCollection } }
          onSubmit={mockBookOrder}
          subject={order}
        ></Resource>);
    });
  });

  context('if order booked', () => {
    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: orderTimeSlotFixture },
        '/orders/:id': { status: 200, data: bookedOrderFixture },
      }, async () => {
        product = await occsn.Product.find(global.OCCSN.product_id);
        order = await occsn.Order.construct({ product });

        timeSlots = await product.timeSlots().all();
        order = await order.update({ timeSlots: [timeSlots.first()] });

        order = await order.save();

        return {
          actions: {
            loadProduct: mockLoadProduct,
          },
          data: {
            product,
            order,
          }
        };
      });
    });

    it('renders OrderComplete', () => {
      expect(wrapper).toContainReact(<OrderComplete order={order}></OrderComplete>);
    });
  });
});
