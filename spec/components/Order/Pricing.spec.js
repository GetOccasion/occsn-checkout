import React from 'react';

import Pricing from 'app/components/Order/Pricing';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import productEUFixture from 'fixtures/products/cash_eur.json';
import blankQuestionsFixture from 'fixtures/blank.json';
import redeemableFixture from 'fixtures/products/redeemables/coupons/fixed.json';

import initializedOrderPriceFixture from 'fixtures/orders/initialized/cash/price.json';
import initializedOrderPriceTaxFixture from 'fixtures/orders/initialized/cash/price_tax.json';
import initializedOrderCouponFixture from 'fixtures/orders/initialized/coupons/fixed.json';

// TODO: Add outstandingBalance and giftCardAmount specs
describe('Order', () => {
  describe('Pricing', () => {
    let order, product, wrapper;

    async function setupWrapper(customResponses, customProps) {
      let responses = {
        '/products/:id/': { status: 200, data: productFixture },
        '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
        ...customResponses
      };
      axios._setMockResponses(responses);

      if(customProps == undefined) {
        product = await occsn.Product.find('1');
        order = await occsn.Order.construct({ product, status: 'initialized' });
      } else {
        await customProps();
      }

      order = await order.save();

      let props = {
        order
      };

      wrapper = mount(<Pricing {...props} />);
      wrapper.update();
    }

    afterEach(async () => {
      axios.reset();
    });

    context('when only price', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/orders/': { status: 201, data: initializedOrderPriceFixture }
        });
      });

      it('does not display subtotal', () => {
        expect(wrapper.find('.subtotal')).not.toBePresent()
      });

      it('displays price', () => {
        expect(wrapper.find('.total')).toIncludeText('$10.00')
      });
    });

    context('when currency is EUR', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: productEUFixture },
          '/orders/': { status: 201, data: initializedOrderPriceFixture }
        });
      });

      it('does not display subtotal', () => {
        expect(wrapper.find('.subtotal')).not.toBePresent()
      });

      it('displays price', () => {
        expect(wrapper.find('.total')).toIncludeText('10,00 €')
      });
    });

    context('when price + tax', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/orders/': { status: 201, data: initializedOrderPriceTaxFixture }
        });
      });

      it('displays subtotal', () => {
        expect(wrapper.find('.subtotal')).toIncludeText('$10.00')
      });

      it('displays tax percentage', () => {
        expect(wrapper.find('.tax')).toIncludeText('(3.0%)')
      });

      it('displays tax amount', () => {
        expect(wrapper.find('.tax')).toIncludeText('$0.30')
      });

      it('displays price', () => {
        expect(wrapper.find('.total')).toIncludeText('$10.30')
      });
    });

    context('when couponAmount', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/redeemables/': { status: 200, data: redeemableFixture },
          '/orders/': { status: 201, data: initializedOrderCouponFixture }
        }, async () => {
          product = await occsn.Product.find('1');
          var coupon = await product.redeemables().findBy({ code: 'CODE' });
          order = await occsn.Order.construct({ product, coupon, status: 'initialized' });
        });
      });

      it('displays subtotal', () => {
        expect(wrapper.find('.subtotal')).toIncludeText('$10.00')
      });

      it('displays coupon amount', () => {
        expect(wrapper.find('.coupon')).toIncludeText('-$2.00')
      });

      it('displays price', () => {
        expect(wrapper.find('.total')).toIncludeText('$8.00')
      });
    });
  });
});
