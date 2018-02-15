import React from 'react';
import Root from '../app/containers/Root.jsx';

import axios from 'axios';

import productFixture from './fixtures/products/cash.json';

describe('MyComponent', () => {
  it('loads product for window.OCCSN.product_id', async (done) => {
    axios._setMockResponses({
      '/products': { data: productFixture, status: 200 }
    });

    const wrapper = shallow(<Root />);

    await wrapper.update();

    axios.wait(() => {
      expect(wrapper.state('product').id).toEqual(window.OCCSN.product_id);
      done()
    });
  });
});
