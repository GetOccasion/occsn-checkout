import React from 'react';

import { Resource } from 'mitragyna';
import moment from 'moment';
import 'moment-timezone';

import Order from '../../../app/components/Order';
import TimeSlotsSelector from '../../../app/components/TimeSlotsSelector';

import axios from 'axios';
import occsn from '../../../app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import blankQuestionsFixture from 'fixtures/blank.json';

import initializedOrderFixture from 'fixtures/orders/initialized/free.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots.json';

import orderTimeSlotsFixture from 'fixtures/orders/time_slots/event.json';
import orderTimeSlotsErrorFixture from 'fixtures/errors/orders/time_slot.json';

// FIXME: Why are these only failing in specs and not on development?
describe('Order', () => {
  describe('TimeSlotsSelector', () => {
    let order, product, wrapper, timeSlots, timeSlotsWrapper;

    const mockFindRedeemable = jest.fn();
    const mockSaveOrder = jest.fn();
    const mockSetOrder = jest.fn();

    async function setupWrapper(orderResponses) {
      let responses = {
        '/products/:id/': { status: 200, data: productFixture },
        '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
        '/products/:id/time_slots/': { status: 200, data: productTimeSlotsFixture },
        '/orders/': { status: 201, data: initializedOrderFixture },
        ...orderResponses
      };
      axios._setMockResponses(responses);

      product = await occsn.Product.find('1');
      moment.tz.setDefault(product.merchant().timeZone);

      order = await occsn.Order.construct({ product, status: 'initialized' });

      order = await order.save();

      timeSlots = await product.timeSlots().all();

      let props = {
        afterUpdate: mockSetOrder,
        component: Order,
        componentProps: { findRedeemable: mockFindRedeemable, saveOrder: mockSaveOrder, selectedTimeSlots: timeSlots },
        subject: order,
      };

      wrapper = mount(<Resource {...props} />);
      wrapper.update();
      timeSlotsWrapper = wrapper.find(TimeSlotsSelector).first();
    }

    it('displays time slots for product', () => {
      expect(timeSlotsWrapper.find('button').length).toEqual(productTimeSlotsFixture.data.length)
    });

    it('uses merchant time zone for time slots', () => {
      expect(timeSlotsWrapper.find('button').first()).toHaveText('Feb 13, 2018 3:00 PM')
    });

    context('on click', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/orders/:id': { status: 200, data: orderTimeSlotsFixture },
        });

        var timeSlotButton = timeSlotsWrapper.find('button').first();
        timeSlotButton.simulate('click');
      });

      it('calls setOrder', () => {
        expect(mockSetOrder.mock.calls.length).toBe(2);
      });

      it('calls setOrder with order with selected timeslot', () => {
        expect(mockSetOrder.mock.calls[0][0].timeSlots().target().first()).toEqual(timeSlots.first());
      });

      it('sets active class on correct timeslot', () => {
        expect(wrapper.find(TimeSlotsSelector).first().find('Button.active').first().key()).toEqual(timeSlots.first().id);
      });
    });

    context('with errors', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/orders/:id': { status: 422, data: orderTimeSlotsErrorFixture },
        });

        order = await order.save();
        wrapper.setProps({ subject: order });
        wrapper.update();
        timeSlotsWrapper = wrapper.find(TimeSlotsSelector).first();
      });

      it('adds is-invalid class to custom-control-input', () => {
        expect(timeSlotsWrapper.find('.custom-control-input').first()).toHaveClassName('is-invalid');
      });

      it('adds FormFeedback with error message', () => {
        expect(timeSlotsWrapper.find('FormFeedback').first()).toBePresent();
      });
    });
  });
});
