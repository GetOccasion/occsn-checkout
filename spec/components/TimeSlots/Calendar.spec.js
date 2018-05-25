import React from 'react';

import Calendar from '../../../app/components/TimeSlots/Calendar';

import axios from 'axios';
import occsn from '../../../app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import blankQuestionsFixture from 'fixtures/blank.json';
import productTimeSlotsFixture from 'fixtures/products/time_slots/index.json';

// TODO: Complete specs for Calendar (displaying FullCalendar with mapped events)
describe('TimeSlots', () => {
  describe('Calendar', () => {
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

      timeSlots = await product.timeSlots().all();
      order = await order.update({ timeSlots: [timeSlots.first()] });

      let props = {
        order
      };

      wrapper = mount(<Calendar {...props} />);
    }

    beforeEach(async () => {
      await setupWrapper({});
    });

    afterEach(async () => {
      axios.reset();
    });
  });
});
