import React from 'react';

import { Resource } from 'mitragyna';

import Answer from 'app/components/Order/Answer';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import productQuestionsFixture from 'fixtures/products/questions/priced.json';

describe('Order', () => {
  describe('Answer', () => {
    let order, product, wrapper;

    set('answer', () => { null });

    async function setupWrapper(orderResponses) {
      let responses = {
        '/products/:id/': {status: 200, data: productFixture},
        '/products/:id/questions/': {status: 200, data: productQuestionsFixture},
        ...orderResponses
      };
      axios._setMockResponses(responses);

      product = await occsn.Product.find('1');

      order = await occsn.Order.construct({product, status: 'initialized'});

      let props = {
        subject: answer,
        component: Answer
      };

      wrapper = mount(<Resource {...props} />);
      wrapper.update();
    }

    context('when text input', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'text_input' }) });

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays required asterisk when required', () => {
        expect(wrapper).toIncludeText('*');
      });

      it('displays Field with type "text"', () => {
        expect(wrapper.find('Field')).toHaveProp('type', 'text');
      });
    });

    context('when text area', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'text_area' })});

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays Field with type "textarea"', () => {
        expect(wrapper.find('Field')).toHaveProp('type', 'textarea');
      });
    });

    context('when spin_button', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'spin_button' })});

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays Field with type "number"', () => {
        expect(wrapper.find('Field')).toHaveProp('type', 'number');
      });
    });

    context('when drop_down', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'drop_down' })});

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays Field with type "select"', () => {
        expect(wrapper.find('Field')).toHaveProp('type', 'select');
      });

      it('displays option', () => {
        answer.question().options().each(() => {
          expect(wrapper.find('select')).toContainReact(<option value={option.id}>{option.title}</option>);
        });
      });
    });

    context('when option_list', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'option_list' })});

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays option', () => {
        answer.question().options().each(() => {
          expect(wrapper).toContainReact(<input type="radio" value={ option.id }>{ option.title }</input>);
        });
      });
    });

    context('when checkbox', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'checkbox' })});

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays Field with type "checkbox"', () => {
        expect(wrapper.find('Field')).toHaveProp('type', 'checkbox');
      });
    });

    context('when waiver', () => {
      set('answer', () => { return order.answers().target().detect((a) => { return a.question().formControl == 'waiver' })});

      beforeEach(async () => {
        await setupWrapper({});
      });

      it('displays title', () => {
        expect(wrapper).toIncludeText(answer.question().title);
      });

      it('displays Field with type "checkbox"', () => {
        expect(wrapper.find('Field')).toHaveProp('type', 'checkbox');
      });

      it('displays waiverText', () => {
        expect(wrapper).toIncludeText(answer.question().waiverText);
      });
    });
  });
});
