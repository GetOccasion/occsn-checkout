import React from 'react';

import Spreedly from 'app/components/Order/PaymentForm/Spreedly';

import SpreedlyAPI from 'spreedly';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

describe('Order', () => {
  describe('PaymentForm', () => {
    describe('Spreedly', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(<Spreedly></Spreedly>);
      });

      afterEach(async () => {
        axios.reset();
      });

      it('renders fields', () => {
        expect(wrapper).toMatchSnapshot();
      });

      context('when nameOnCard input changed', () => {
        beforeEach(() => {
          wrapper.find('input#nameOnCard').simulate('change', { target: { value: 'J Smith' } });
        });

        it('changes nameOnCard in state', () => {
          expect(wrapper).toHaveState('nameOnCard', 'J Smith');
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
            nameOnCard: 'J Smith'
          });

          wrapper.instance().tokenizePaymentMethodData();
        });

        it('calls Spreedly.tokenizeCreditCardData with month and year', () => {
          expect(SpreedlyAPI.tokenizeCreditCard.mock.calls[0]).toEqual([{
            month: '11',
            year: '2019',
            nameOnCard: 'J Smith'
          }])
        })
      });
    });
  });
});
