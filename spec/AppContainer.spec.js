import React from 'react';
import { AppContainer } from '../app/containers/AppContainer.jsx';

import axios from 'axios';

import productFixture from './fixtures/products/cash.json';
import blankQuestionsFixture from './fixtures/blank.json';

describe('AppContainer', () => {
  let wrapper;
  const mockLoadProduct = jest.fn();

  let props = {
    actions: {
      loadProduct: mockLoadProduct
    },
    data: {}
  };

  beforeEach(() => {
    axios._setMockResponses({
      '/products': { status: 200, data: productFixture },
      '/questions': { status: 200, data: blankQuestionsFixture },
    });

    wrapper = shallow(<AppContainer {...props} />);
  });

  it('calls loadProduct', () => {
    expect(mockLoadProduct.mock.calls.length).toBe(1);
  });
});
