import React from 'react';

import Coupon from 'app/components/Order/Redeemables/Coupon';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import redeemablesFixedCouponFixture from 'fixtures/products/redeemables/coupons/fixed.json';
import redeemablesPercentageCouponFixture from 'fixtures/products/redeemables/coupons/percentage.json';

describe('Order', () => {
  describe('Redeemables', () => {
    describe('Coupon', () => {
      let coupon, product, wrapper;

      async function setupWrapper(customResponses, customProps) {
        let responses = {
          '/products/:id/': { status: 200, data: productFixture },
          ...customResponses
        };
        axios._setMockResponses(responses);

        product = await occsn.Product.find('1');
        coupon = await product.redeemables().findBy({ code: 'COUPON-CODE' });

        let props = {
          subject: coupon,
          ...customProps,
        };

        wrapper = mount(<Coupon {...props} />);
      }

      afterEach(async () => {
        axios.reset();
      });

      describe('when fixed discount coupon', () => {
        beforeEach(async () => {
          await setupWrapper({
            '/products/:id/redeemables/': { status: 200, data: redeemablesFixedCouponFixture },
          }, {
            currency: 'USD',
          });
        });

        it('renders coupon name', () => {
          expect(wrapper).toIncludeText(coupon.name);
        });

        it('renders coupon code', () => {
          expect(wrapper).toIncludeText(coupon.code);
        });

        it('renders fixed discount value', () => {
          expect(wrapper).toIncludeText('$2.00');
        });
      });

      describe('when percentage discount coupon', () => {
        beforeEach(async () => {
          await setupWrapper({
            '/products/:id/redeemables/': { status: 200, data: redeemablesPercentageCouponFixture },
          }, {
            currency: 'USD',
          });
        });

        it('renders coupon name', () => {
          expect(wrapper).toIncludeText(coupon.name);
        });

        it('renders coupon code', () => {
          expect(wrapper).toIncludeText(coupon.code);
        });

        it('renders percentage discount value', () => {
          expect(wrapper).toIncludeText('15%');
        });
      });
    });
  });
});
