import React from 'react';
import PropTypes from 'prop-types';

import Attendee from 'app/components/Order/Attendees/Attendee';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/attendee_questions.json';

describe('Order', () => {
  describe('Attendee', () => {
    let attendee, product, wrapper;

    async function setupWrapper(customResponses, customProps) {
      let responses = {
        '/products/:id/': { status: 200, data: productFixture },
        ...customResponses
      };
      axios._setMockResponses(responses);

      product = await occsn.Product.find('1');
      attendee = occsn.Order.build().attendees().build();

      let props = {
        indexOf: 1,
        questions: product.attendeeQuestions,
        subject: attendee,
        ...customProps,
      };

      let context = {
        resource: attendee
      };

      let childContextTypes = {
        resource: PropTypes.object
      };

      wrapper = shallow(<Attendee {...props} />, { context, childContextTypes });
    }

    beforeEach(async () => {
      await setupWrapper({}, {});
    });

    afterEach(async () => {
      axios.reset();
    });

    it('matches snapshot', () => {
      expect(wrapper.find('Card')).toMatchSnapshot();
    });
  });
});
