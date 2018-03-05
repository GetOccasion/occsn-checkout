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
import productTimeSlotsFixture from 'fixtures/products/time_slots.json';


import initializedOrderFixture from 'fixtures/orders/initialized/free.json';
import bookedOrderFixture from 'fixtures/orders/booked/cash/free.json';
import orderTimeSlotFixture from 'fixtures/orders/time_slots/event.json';

describe('AppContainer', () => {
  let wrapper;

  let product, order, timeSlots, selectedTimeSlots;

  const mockLoadProduct = jest.fn();
  const mockBookOrder = jest.fn();
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

  context('normal conditions', () => {
    beforeEach(async () => {
      await setupWrapper({}, () => {
        return {
          actions: {
            loadProduct: mockLoadProduct
          },
          data: {}
        };
      });
    });

    it('calls loadProduct', () => {
      expect(mockLoadProduct.mock.calls.length).toBe(1);
    });
  });

  context('if order initialized', () => {
    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: initializedOrderFixture },
      }, async () => {
        product = await occsn.Product.find(global.OCCSN.product_id);
        order = await occsn.Order.construct({ product });
        selectedTimeSlots = ActiveResource.Collection.build();
        order = await order.save();

        return {
          actions: {
            loadProduct: mockLoadProduct,
            bookOrder: mockBookOrder,
            setOrder: mockSetOrder,
          },
          data: {
            product,
            order,
            selectedTimeSlots
          }
        };
      });
    });

    it('renders Header', () => {
      expect(wrapper).toContainReact(<Header product={product}></Header>);
    });

    it('renders Resource with Order', () => {
      expect(wrapper).toContainReact(
        <Resource
          afterUpdate={mockSetOrder}
          component={Order}
          componentProps={ { selectedTimeSlots } }
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
