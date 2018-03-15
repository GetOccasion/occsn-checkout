import React from 'react';

import Square from 'app/components/Order/PaymentForm/Square';

import SquareAPI from 'square';

import occsn from 'app/libs/Occasion';

describe('Order', () => {
  describe('PaymentForm', () => {
    describe('Square', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(<Square></Square>);
      });

      it('renders fields', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('calls SquareAPI constructor', () => {
        expect(SquareAPI.mock.calls.length).toBe(1);
      });

      describe('tokenizePaymentMethodData', () => {
        beforeEach(() => {
          wrapper.instance().tokenizePaymentMethodData();
        });

        it('calls SquareAPI.requestCardNonce', () => {
          expect(SquareAPI.getSqPaymentForm().requestCardNonce.mock.calls.length).toBe(1);
        })
      });
    });
  });
});
