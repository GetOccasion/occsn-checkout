import React from 'react';

import Spreedly from 'app/components/Order/PaymentForm/Spreedly';

import SpreedlyAPI from 'spreedly';

import occsn from 'app/libs/Occasion';

// TODO: Add error specs
describe('Order', () => {
  describe('PaymentForm', () => {
    describe('Spreedly', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(<Spreedly></Spreedly>);
      });

      it('renders fields', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('calls SpreedlyAPI.init', () => {
        expect(SpreedlyAPI.init.mock.calls.length).toBe(1);
      });

      context('when full_name input changed', () => {
        beforeEach(() => {
          wrapper.find('input#full_name').simulate('change', { target: { value: 'J Smith' } });
        });

        it('changes full_name in state', () => {
          expect(wrapper).toHaveState('full_name', 'J Smith');
        });
      });

      context('when month input changed', () => {
        beforeEach(() => {
          wrapper.find('input#month').simulate('change', { target: { value: '11' } });
        });

        it('changes month in state', () => {
          expect(wrapper).toHaveState('month', '11');
        });
      });

      context('when year input changed', () => {
        beforeEach(() => {
          wrapper.find('input#year').simulate('change', { target: { value: '2019' } });
        });

        it('changes year in state', () => {
          expect(wrapper).toHaveState('year', '2019');
        });
      });

      describe('tokenizePaymentMethodData', () => {
        beforeEach(() => {
          wrapper.setState({
            month: '11',
            year: '2019',
            full_name: 'J Smith'
          });

          wrapper.instance().tokenizePaymentMethodData();
        });

        it('calls SpreedlyAPI.tokenizeCreditCardData with month and year', () => {
          expect(SpreedlyAPI.tokenizeCreditCard.mock.calls[0]).toEqual([{
            month: '11',
            year: '2019',
            full_name: 'J Smith'
          }])
        })
      });
    });
  });
});
