import React from 'react';

import Header from '../../app/components/Header.jsx';

import axios from 'axios';
import occsn from '../../app/libs/Occasion';

import productFixture from '../fixtures/products/cash.json';
import noImgProductFixture from '../fixtures/products/no_image.json';

describe('Header', () => {
  let product, wrapper;

  async function setupWrapper(productData) {
    axios._setMockResponses({
      '/products/:id/': { status: 200, data: productData },
    });

    product = await occsn.Product.find(1);

    let props = {
      product
    };

    wrapper = shallow(<Header {...props} />);
  }

  context('normal conditions', () => {
    beforeEach(async () => {
      await setupWrapper(productFixture);
    });

    it('displays image for product.image.url', () => {
      expect(wrapper.find('img')).toHaveProp('src', product.image.url);
    });

    it('displays merchant business name', () => {
      expect(wrapper.find('h2')).toHaveText(product.merchant().name);
    });

    it('displays product title', () => {
      expect(wrapper.find('.product h1')).toHaveText(product.title);
    });

    it('displays product description', () => {
      expect(wrapper.find('.product span')).toHaveHTML('<span>' + product.description.replace(/<br>/g, '<br/>') + '</span>');
    });

    it('displays venue name', () => {
      expect(wrapper.find('.venue h3')).toHaveText(product.venue().name);
    });

    it('displays venue address, city, state, zip', () => {
      let venue = product.venue();
      let text = venue.address + ', ' + venue.city + ', ' + venue.state().code + ' ' + venue.zip;
      expect(wrapper.find('.venue p')).toHaveText(text);
    });
  });

  context('when product does not have image', () => {
    beforeEach(async () => {
      await setupWrapper(noImgProductFixture);
    });

    it('does not display image', () => {
      expect(wrapper.find('img')).not.toBePresent();
    });
  })
});
