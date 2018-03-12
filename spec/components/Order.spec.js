import React from 'react';

import { Resource } from 'mitragyna';
import moment from 'moment';
import 'moment-timezone';

import Order from 'app/components/Order';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import freeProductFixture from 'fixtures/products/free.json';
import productFixture from 'fixtures/products/cash.json';
import blankQuestionsFixture from 'fixtures/blank.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots.json';

import initializedOrderFixture from 'fixtures/orders/initialized/free.json';
import bookedOrderFixture from 'fixtures/orders/booked/cash/free.json';
import orderCustomerCompleteFixture from 'fixtures/orders/customer/complete.json';
import orderTimeSlotFixture from 'fixtures/orders/time_slots/event.json';

describe('Order', () => {
  let order, product, wrapper, timeSlots;

  const mockBookOrder = jest.fn();
  const mockSetOrder = jest.fn();

  set('bookingOrder', () => false);

  async function setupWrapper(customResponses) {
    let responses = {
      '/products/:id/': {status: 200, data: productFixture},
      '/products/:id/questions/': {status: 200, data: blankQuestionsFixture},
      '/products/:id/time_slots/': {status: 200, data: productTimeSlotsFixture},
      '/orders/': {status: 201, data: initializedOrderFixture},
      '/orders/:id': [
        {status: 200, data: orderCustomerCompleteFixture},
        {status: 200, data: orderTimeSlotFixture},
        {status: 200, data: bookedOrderFixture},
      ],
      ...customResponses
    };
    axios._setMockResponses(responses);

    product = await occsn.Product.find('1');

    moment.tz.setDefault(product.merchant().timeZone);

    order = await occsn.Order.construct({ product, status: 'initialized' });

    // Set price
    order = await order.save();

    // Set customer
    order = await order.save();

    // Set time slot
    timeSlots = await product.timeSlots().all();
    order = await order.update({ timeSlots: [timeSlots.first()] });

    let props = {
      ...props,
      afterUpdate: mockSetOrder,
      component: Order,
      componentProps: { bookingOrder, selectedTimeSlots: timeSlots },
      subject: order,
      onSubmit: mockBookOrder,
    };

    wrapper = mount(<Resource {...props} />);
    wrapper.update();
  }

  afterEach(async () => {
    axios.reset();
  });

  describe('booking button', () => {
    beforeEach(async () => {
      await setupWrapper({});
    });

    it('displays Button#bookOrder with product.orderButtonText', () => {
      expect(wrapper.find('Button#bookOrder')).toHaveText(product.orderButtonText);
    });

    it('enables Button#bookOrder', () => {
      expect(wrapper.find('Button#bookOrder')).toHaveProp('disabled', false);
    });

    context('when form submitted', () => {
      beforeEach(async () => {
        wrapper.find('form').simulate('submit');
        wrapper.update();
      });

      it('calls bookOrder', () => {
        expect(mockBookOrder.mock.calls.length).toBe(1);
      });
    });
  });

  context('when already booking order', () => {
    set('bookingOrder', () => true);

    beforeEach(async () => {
      await setupWrapper({});
    });

    it('disables Button#bookOrder', () => {
      expect(wrapper.find('Button#bookOrder')).toHaveProp('disabled', true);
    });
  });

  describe('Pricing display', () => {
    context('when product is not free', () => {
      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays Pricing', () => {
        expect(wrapper.find('Pricing')).toBePresent()
      });
    });

    context('when product is free', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: freeProductFixture },
        });
      });

      it('does not display Pricing', () => {
        expect(wrapper.find('Pricing')).not.toBePresent()
      });
    });
  });
});
