import React from 'react';

import { Resource } from 'mitragyna';
import moment from 'moment';
import 'moment-timezone';

import Order from 'app/components/Order';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import freeProductFixture from 'fixtures/products/free.json';
import productFixture from 'fixtures/products/cash.json';
import attendeesProductFixture from 'fixtures/products/attendee_questions.json';
import blankQuestionsFixture from 'fixtures/blank.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots.json';

import freeInitializedOrderFixture from 'fixtures/orders/initialized/free.json';
import pricedInitializedOrderFixture from 'fixtures/orders/initialized/cash/price.json';
import noAttendeesOrderFixture from 'fixtures/orders/initialized/attendees/none.json';
import oneAttendeesOrderFixture from 'fixtures/orders/initialized/attendees/one.json';
import bookedOrderFixture from 'fixtures/orders/booked/cash/free.json';
import orderCustomerCompleteFixture from 'fixtures/orders/customer/complete.json';
import orderTimeSlotFixture from 'fixtures/orders/time_slots/event.json';

// TODO: Spec Questions display
// TODO: Spec Redeemables display
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
      '/orders/': {status: 201, data: freeInitializedOrderFixture},
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

  describe('product section titles', () => {
    beforeEach(async () => {
      await setupWrapper({});
    });

    it('displays h2 with product.widgetContactTitle', () => {
      expect(wrapper.find('h2#widgetContactTitle')).toHaveText(product.widgetContactTitle);
    });

    it('displays h2 with product.widgetQuestionsTitle', () => {
      expect(wrapper.find('h2#widgetQuestionsTitle')).toHaveText(product.widgetQuestionsTitle);
    });

    it('displays h2 with product.widgetTimeSlotsTitle', () => {
      expect(wrapper.find('h2#widgetTimeSlotsTitle')).toHaveText(product.widgetTimeSlotsTitle);
    });

    it('displays h2 with product.widgetTotalDueTitle', () => {
      expect(wrapper.find('h2#widgetTotalDueTitle')).toHaveText(product.widgetTotalDueTitle);
    });
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

  describe('Attendees', () => {
    context('when product is not quantity_aware', () => {
      beforeEach(async () => {
        await setupWrapper({});
      });

      it('does not display Attendees', () => {
        expect(wrapper.find('Attendees')).not.toBePresent()
      });
    });

    context('when product is quantityAware && has attendeeQuestions', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': {status: 200, data: attendeesProductFixture},
          '/orders/': {status: 201, data: oneAttendeesOrderFixture},
          '/orders/:id': [
            {status: 200, data: orderCustomerCompleteFixture},
            {status: 200, data: orderTimeSlotFixture},
            {status: 200, data: oneAttendeesOrderFixture},
          ]
        });
      });

      it('displays Attendees', () => {
        expect(wrapper.find('Attendees')).toBePresent()
      });
    });
  });

  describe('PaymentForm display', () => {
    context('when product is not free', () => {
      context('when order price == 0', () => {
        beforeEach(async () => {
          await setupWrapper({});
        });

        it('does not display PaymentForm', () => {
          expect(wrapper.find('PaymentForm')).not.toBePresent()
        });
      });

      context('when order price > 0', () => {
        beforeEach(async () => {
          await setupWrapper({
            '/orders/': {status: 201, data: pricedInitializedOrderFixture},
          });
        });

        it('displays PaymentForm', () => {
          expect(wrapper.find('PaymentForm')).toBePresent()
        });
      });
    });

    context('when product is free', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: freeProductFixture },
        });
      });

      it('does not display PaymentForm', () => {
        expect(wrapper.find('PaymentForm')).not.toBePresent()
      });
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
