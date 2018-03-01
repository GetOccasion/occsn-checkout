import React from 'react';

import { Resource } from 'mitragyna';

import Order from '../../../app/components/Order';
import TimeSlotsSelector from '../../../app/components/TimeSlotsSelector';

import axios from 'axios';
import occsn from '../../../app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import blankQuestionsFixture from 'fixtures/blank.json';

import initializedOrderFixture from 'fixtures/orders/initialized/free.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots.json';

import orderTimeSlotsFixture from 'fixtures/orders/time_slots/event.json';

describe('Order', () => {
  describe('TimeSlotsSelector', () => {
    let order, product, wrapper, timeSlots, timeSlotsWrapper;

    const mockSetOrder = jest.fn();

    async function setupWrapper(orderResponses) {
      let responses = {
        '/products/:id/': { status: 200, data: productFixture },
        '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
        '/products/:id/time_slots/': { status: 200, data: productTimeSlotsFixture },
        ...orderResponses
      };
      axios._setMockResponses(responses);

      product = await occsn.Product.find('1');
      order = await occsn.Order.construct({ product, status: 'initialized' });

      order = await order.save();

      timeSlots = await product.timeSlots().all();

      let props = {
        afterUpdate: mockSetOrder,
        component: Order,
        componentProps: { selectedTimeSlots: timeSlots },
        subject: order,
      };

      wrapper = mount(<Resource {...props} />);
      wrapper.update();
      timeSlotsWrapper = wrapper.find(TimeSlotsSelector).first();
    }

    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: initializedOrderFixture },
        '/orders/:id': { status: 200, data: orderTimeSlotsFixture },
      });
    });

    it('displays time slots for product', () => {
      expect(timeSlotsWrapper.find('button').length).toEqual(productTimeSlotsFixture.data.length)
    });

    context('on click', () => {
      beforeEach(async () => {
        var timeSlotButton = timeSlotsWrapper.find('button').first();
        timeSlotButton.simulate('click');
      });

      it('calls setOrder', () => {
        expect(mockSetOrder.mock.calls.length).toBe(2);
      });

      it('calls setOrder with order with selected timeslot', () => {
        expect(mockSetOrder.mock.calls[0][0].timeSlots().target().first()).toBe(timeSlots.first());
      });

      it('sets active class on correct timeslot', () => {
        expect(wrapper.find(TimeSlotsSelector).first().find('Button.active').first().key()).toEqual(timeSlots.first().id);
      });
    });
  });
});
