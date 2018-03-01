import React from 'react';
import { AppContainer } from '../../app/containers/AppContainer.jsx';

import ActiveResource from 'active-resource';

import axios from 'axios';
import occsn from '../../app/libs/Occasion';

import { Resource } from 'mitragyna';
import Header from '../../app/components/Header';
import Order from '../../app/components/Order';

import productFixture from '../fixtures/products/cash.json';
import blankQuestionsFixture from '../fixtures/blank.json';

describe('AppContainer', () => {
  let wrapper;

  let product, order, selectedTimeSlots;

  const mockLoadProduct = jest.fn();
  const mockSetOrder = jest.fn();

  beforeEach(async () => {
    axios._setMockResponses({
      '/products/:id/': { status: 200, data: productFixture },
      '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
    });

    product = await occsn.Product.find(global.OCCSN.product_id);
    order = await occsn.Order.construct({ product });
    selectedTimeSlots = ActiveResource.Collection.build();

    let props = {
      actions: {
        loadProduct: mockLoadProduct,
        setOrder: mockSetOrder,
      },
      data: {
        product,
        order,
        selectedTimeSlots
      }
    };

    wrapper = shallow(<AppContainer {...props} />);
  });

  it('calls loadProduct', () => {
    expect(mockLoadProduct.mock.calls.length).toBe(1);
  });

  it('renders Header if product', () => {
    expect(wrapper).toContainReact(<Header product={product}></Header>);
  });

  it('renders Resource with Order if order', () => {
    expect(wrapper).toContainReact(
      <Resource
        afterUpdate={mockSetOrder}
        component={Order}
        componentProps={ { selectedTimeSlots } }
        subject={order}
      ></Resource>);
  });
});
