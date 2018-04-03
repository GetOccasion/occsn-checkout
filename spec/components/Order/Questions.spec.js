import React from 'react';

import ActiveResource from 'active-resource';
import { Resource } from 'mitragyna';

import Order from 'app/components/Order';
import Questions from 'app/components/Order/Questions';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import productQuestionsFixture from 'fixtures/products/questions/priced.json';

import initializedOrderFixture from 'fixtures/orders/initialized/cash/price.json';

// TODO: Add spec for spin button max display + constraints, pricing display
// TODO: Add spec for checkbox pricing display
// TODO: Add spec for drop down and option list pricing options display
describe('Order', () => {
  describe('Questions', () => {
    let order, product, wrapper, questionsWrapper;

    var mockSetOrder;

    async function setupWrapper(orderResponses) {
      let responses = {
        '/products/:id/': {status: 200, data: productFixture},
        '/products/:id/questions/': {status: 200, data: productQuestionsFixture},
        ...orderResponses
      };
      axios._setMockResponses(responses);

      mockSetOrder = jest.fn();

      product = await occsn.Product.find('1');

      order = await occsn.Order.construct({product, status: 'initialized'});

      let props = {
        afterUpdate: mockSetOrder,
        component: Order,
        componentProps: { selectedTimeSlots: ActiveResource.Collection.build() },
        subject: order,
      };

      wrapper = mount(<Resource {...props} />);
      wrapper.update();
      questionsWrapper = wrapper.find(Questions).first();
    }

    beforeEach(async () => {
      await setupWrapper({
        '/orders/': { status: 201, data: initializedOrderFixture }
      });
    });

    it('displays questions for product', () => {
      expect(
        questionsWrapper.find('legend.question').length +
        questionsWrapper.find('section.question').length +
        questionsWrapper.find('hr.question').length
      ).toEqual(productQuestionsFixture.data.length)
    });

    it('displays horizontal rule for separator formControl', () => {
      expect(questionsWrapper.find('.question.separator').first()).toHaveTagName('hr');
    });

    describe('text_output', () => {
      it('displays section title', () => {
        expect(questionsWrapper.find('.question.textOutput').first()).toHaveText('My heading');
      });

      context('when displayAsTitle true', () => {
        it('displays legend', () => {
          expect(questionsWrapper.find('.question.textOutput').first()).toHaveTagName('legend');
        });
      });

      // TODO: Make Title component and unit spec that
      //context('when displayAsTitle false', () => {
      //  it('displays p', () => {
      //    expect(questionsWrapper.find('.question.textOutput').first()).toHaveTagName('p');
      //  });
      //});
    });

    context('when text input changed', () => {
      beforeEach(() => {
        var formControl = questionsWrapper.find('.textInput input').first();
        formControl.simulate('change', { target: { value: 'my text' } });
        formControl.simulate('blur');

        wrapper.update();
      });

      it('calls setOrder with answer.value equal to value', () => {
        var textInputAnswer = mockSetOrder.mock.calls[0][0].answers().target().detect((a) => { return a.question().formControl == 'text_input' });
        expect(textInputAnswer.value).toEqual('my text');
      });
    });

    context('when number input changed', () => {
      beforeEach(() => {
        var formControl = questionsWrapper.find('.spinButton input').first();
        formControl.simulate('change', { target: { value: 3 } });
        formControl.simulate('blur');

        wrapper.update();
      });

      it('calls setOrder with answer.value equal to value', () => {
        var textInputAnswer = mockSetOrder.mock.calls[0][0].answers().target().detect((a) => { return a.question().formControl == 'spin_button' });
        expect(textInputAnswer.value).toEqual('3');
      });
    });

    context('when checkbox clicked', () => {
      beforeEach(() => {
        var formControl = questionsWrapper.find('.checkbox input').first();
        formControl.simulate('click');
        formControl.simulate('blur');

        wrapper.update();
      });

      // TODO: Move to mitragyna as unit specs
      //it('calls setOrder with answer.value == true', () => {
      //  var checkboxAnswer = mockSetOrder.mock.calls[0][0].answers().target().detect((a) => { return a.question().formControl == 'checkbox' });
      //  expect(mockSetOrder.mock.calls.length).toEqual(true);
      //});
    });

    context('when dropDown option selected', () => {
      let dropDown, selectedOption;

      beforeEach(() => {
        dropDown = product.questions().target().detect((q) => { return q.formControl == 'drop_down' });
        selectedOption = dropDown.options().target().last();

        var formControl = questionsWrapper.find('.dropDown select').first();
        formControl.simulate('change', { target: { value: selectedOption.id } });
        formControl.simulate('blur');

        wrapper.update();
      });

      it('calls setOrder with answer.option == selectedOption', () => {
        var dropDownAnswer = mockSetOrder.mock.calls[0][0].answers().target().detect((a) => { return a.question().formControl == 'drop_down' });

        expect(dropDownAnswer.option()).toBe(selectedOption);
      });
    });

    context('when radio button selected', () => {
      let optionList, selectedOption;

      beforeEach(() => {
        optionList = product.questions().target().detect((q) => { return q.formControl == 'option_list' });
        selectedOption = optionList.options().target().last();

        var formControl = questionsWrapper.find('.optionList').first();
        formControl.find({ value: selectedOption.id }).first().simulate('change', { target: { checked: true } });
        formControl.simulate('blur');

        wrapper.update();
      });

      // TODO: Move to mitragyna as unit specs
      //it('calls setOrder with answer.option == selectedOption', () => {
      //  var optionListAnswer = mockSetOrder.mock.calls[0][0].answers().target().detect((a) => { return a.question().formControl == 'option_list' });
      //  expect(optionListAnswer.option()).toBe(selectedOption);
      //});
    });
  });
});
