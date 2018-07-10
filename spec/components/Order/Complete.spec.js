import React from 'react';

import OrderComplete from '../../../app/components/Order/Complete';

import axios from 'axios';
import occsn from '../../../app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import blankQuestionsFixture from 'fixtures/blank.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots/index.json';

import bookedOrderFixture from 'fixtures/orders/booked/cash/free.json';
import orderCustomerCompleteFixture from 'fixtures/orders/customer/complete.json';
import orderTimeSlotFixture from 'fixtures/orders/time_slots/event.json';

describe('Order', () => {
  describe('Complete', () => {
    let order, product, wrapper, timeSlots;

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

      order = await order.save();

      timeSlots = await product.timeSlots().all();
      order = await order.update({ timeSlots: [timeSlots.first()] });

      let props = {
        order
      };

      wrapper = mount(<OrderComplete {...props} />);
      wrapper.update();
    }

    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: bookedOrderFixture },
        '/orders/:id': [
          { status: 200, data: orderCustomerCompleteFixture },
          { status: 200, data: orderTimeSlotFixture },
        ]
      });
    });

    afterEach(async () => {
      axios.reset();
    });

    it('display verificationCode for order', () => {
      expect(wrapper).toIncludeText(order.verificationCode)
    });

    it('displays time slots for order', () => {
      expect(wrapper.find('.event')).toIncludeText('Tuesday February 13th, 2018 3:00 PM')
    });

    it('displays customer email in message', () => {
      expect(wrapper.find('.message')).toIncludeText(order.customer().email)
    });

    it('displays product customerConfirmationMessage in message', () => {
      expect(wrapper.find('.message')).toIncludeText(order.product().customerConfirmationMessage)
    });
  });
});
