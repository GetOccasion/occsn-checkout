import React from 'react';

import PaymentForm from 'app/components/Order/PaymentForm';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import Spreedly from 'spreedly';

import cashProductFixture from 'fixtures/products/cash.json';
import spreedlyProductFixture from 'fixtures/products/spreedly.json';
import squareProductFixture from 'fixtures/products/square.json';
import blankQuestionsFixture from 'fixtures/blank.json';

import initializedOrderOutstandingBalanceFixture from 'fixtures/orders/initialized/cash/price.json';

describe('Order', () => {
  describe('PaymentForm', () => {
    let order, product, wrapper;

    async function setupWrapper(orderResponses) {
      let responses = {
        '/products/:id/': { status: 200, data: cashProductFixture },
        '/products/:id/questions/': { status: 200, data: blankQuestionsFixture },
        '/orders/': { status: 201, data: initializedOrderOutstandingBalanceFixture },
        ...orderResponses
      };
      axios._setMockResponses(responses);

      product = await occsn.Product.find('1');
      order = await occsn.Order.construct({ product, status: 'initialized' });

      order = await order.save();

      let props = {
        order
      };

      wrapper = mount(<PaymentForm {...props} />);

      wrapper.update();
    }

    afterEach(async () => {
      axios.reset();
    });

    context('when psp is spreedly', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: spreedlyProductFixture },
        });

        Spreedly.setPaymentMethodTokenResponse('SPREEDLY_PAYMENT_METHOD_ID');
      });

      it('renders Spreedly', () => {
        expect(wrapper.find('Spreedly')).toBePresent()
      });

      describe('chargeOutstandingBalanceToPaymentMethod', () => {
        let newOrder;
        beforeEach(async () => {
          newOrder = await wrapper.instance().chargeOutstandingBalanceToPaymentMethod(order)
        });

        it('returns Order', () => {
          expect(newOrder.klass()).toBe(occsn.Order);
        });

        it('returns new Order', () => {
          expect(newOrder).not.toBe(order);
        });

        it('adds transaction with CreditCard payment method', () => {
          expect(newOrder.transactions().target().last().paymentMethod().klass()).toBe(occsn.CreditCard);
        });

        it('adds transaction with CreditCard payment method with id returned from spreedly', () => {
          expect(newOrder.transactions().target().last().paymentMethod().id).toEqual('SPREEDLY_PAYMENT_METHOD_ID');
        });

        it('adds transaction with amount equal to order.outstandingBalance', () => {
          expect(newOrder.transactions().target().last().amount).toEqual(order.outstandingBalance);
        });
      });
    });

    context('when psp is square', () => {
      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/': { status: 200, data: squareProductFixture },
        });
      });

      it('renders Square', () => {
        expect(wrapper.find('Square')).toBePresent()
      });

      describe('chargeOutstandingBalanceToPaymentMethod', () => {
        let newOrder;
        beforeEach(async () => {
          newOrder = await wrapper.instance().chargeOutstandingBalanceToPaymentMethod(order)
        });

        it('returns Order', () => {
          expect(newOrder.klass()).toBe(occsn.Order);
        });

        it('returns new Order', () => {
          expect(newOrder).not.toBe(order);
        });

        it('adds transaction with CreditCard payment method', () => {
          expect(newOrder.transactions().target().last().paymentMethod().klass()).toBe(occsn.CreditCard);
        });

        it('adds transaction with amount equal to order.outstandingBalance', () => {
          expect(newOrder.transactions().target().last().amount).toEqual(order.outstandingBalance);
        });
      });
    });
  });
});
