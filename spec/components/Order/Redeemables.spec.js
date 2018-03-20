import React from 'react';

import ActiveResource from 'active-resource';
import { Resource } from 'mitragyna';

import Order from 'app/components/Order';
import Redeemables from 'app/components/Order/Redeemables';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/redeemables.json';
import blankQuestionsFixture from 'fixtures/blank.json';
import noRedeemablesProductFixture from 'fixtures/products/cash.json';
import freeProductFixture from 'fixtures/products/free.json';
import redeemablesFixedCouponFixture from 'fixtures/products/redeemables/coupons/fixed.json';
import redeemablesPercentageCouponFixture from 'fixtures/products/redeemables/coupons/percentage.json';

import initializedOrderPriceFixture from 'fixtures/orders/initialized/cash/price.json';
import initializedOrderFixedCouponFixture from 'fixtures/orders/initialized/coupons/fixed.json';
import initializedOrderFullCouponFixture from 'fixtures/orders/initialized/coupons/full.json';
import initializedOrderPercentageCouponFixture from 'fixtures/orders/initialized/coupons/percentage.json';

describe('Order', () => {
  describe('Redeemables', () => {
    let order, product, wrapper, redeemablesWrapper;

    const mockFindRedeemable = jest.fn();
    const mockSaveOrder = jest.fn();
    const mockSetOrder = jest.fn();

    async function setupWrapper(customResponses, customProps) {
      let responses = {
        '/products/:id/': { status: 200, data: productFixture },
        '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
        '/orders/': { status: 201, data: initializedOrderPriceFixture },
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
        afterUpdate: mockSetOrder,
        component: Order,
        componentProps: {
          findRedeemable: mockFindRedeemable,
          saveOrder: mockSaveOrder,
          selectedTimeSlots: ActiveResource.Collection.build()
        },
        subject: order,
      };

      wrapper = mount(<Resource {...props} />);
      redeemablesWrapper = wrapper.find(Redeemables);
    }

    afterEach(async () => {
      axios.reset();
    });

    describe('when product.hasRedeemables is false', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: noRedeemablesProductFixture }
        });
      });

      it('does not render Redeemables', () => {
        expect(redeemablesWrapper).not.toBePresent();
      });
    });

    describe('when product.free is true', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: freeProductFixture }
        });
      });

      it('does not render Redeemables', () => {
        expect(redeemablesWrapper).not.toBePresent();
      });
    });

    describe('when coupon that covers full outstandingBalance present', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/redeemables/': { status: 200, data: redeemablesFixedCouponFixture },
          '/orders/': { status: 201, data: initializedOrderFullCouponFixture }
        }, async () => {
          product = await occsn.Product.find('1');
          var coupon = await product.redeemables().findBy({ code: 'CODE' });
          order = await occsn.Order.construct({ product, coupon, status: 'initialized' });
        });
      });

      it('renders Coupon', () => {
        expect(redeemablesWrapper.find('Coupon')).toBePresent();
      });

      it('does not render input', () => {
        expect(redeemablesWrapper.find('input')).not.toBePresent();
      });
    });

    describe('when coupon that covers partial outstandingBalance present', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/redeemables/': { status: 200, data: redeemablesFixedCouponFixture },
          '/orders/': { status: 201, data: initializedOrderFixedCouponFixture }
        }, async () => {
          product = await occsn.Product.find('1');
          var coupon = await product.redeemables().findBy({ code: 'CODE' });
          order = await occsn.Order.construct({ product, coupon, status: 'initialized' });
        });
      });

      it('renders Coupon', () => {
        expect(redeemablesWrapper.find('Coupon')).toBePresent();
      });

      it('renders input', () => {
        expect(redeemablesWrapper.find('input')).toBePresent();
      });
    });

    describe('when code entered', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/redeemables/': { status: 200, data: redeemablesFixedCouponFixture },
          '/orders/:id': { status: 200, data: initializedOrderFullCouponFixture }
        });

        redeemablesWrapper.find('input').simulate('change', { target: { value: 'COUPON-CODE' } });
        redeemablesWrapper.find('button').simulate('click');
        wrapper.update();
      });

      it('calls findRedeemable with code', () => {
        expect(mockFindRedeemable.mock.calls[0][1]).toEqual('COUPON-CODE');
      });
    });
  });
});
