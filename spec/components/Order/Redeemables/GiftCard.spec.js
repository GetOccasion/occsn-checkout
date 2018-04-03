import React from 'react';

import GiftCard from 'app/components/Order/Redeemables/GiftCard';

import axios from 'axios';
import occsn from 'app/libs/Occasion';

import productFixture from 'fixtures/products/cash.json';
import redeemablesGiftCardFixture from 'fixtures/products/redeemables/gift_cards/low_value.json';

// TODO: Change subject passed in to transaction
// TODO: Add spec for balance left on gift card after booking message
describe('Order', () => {
  describe('Redeemables', () => {
    describe('GiftCard', () => {
      let giftCard, product, wrapper;

      async function setupWrapper(customResponses, customProps) {
        let responses = {
          '/products/:id/': { status: 200, data: productFixture },
          ...customResponses
        };
        axios._setMockResponses(responses);

        product = await occsn.Product.find('1');
        giftCard = await product.redeemables().findBy({ code: 'GIFT-CARD-CODE' });

        let props = {
          subject: giftCard,
          ...customProps,
        };

        wrapper = mount(<GiftCard {...props} />);
      }

      beforeEach(async () => {
        await setupWrapper({
          '/products/:id/redeemables/': { status: 200, data: redeemablesGiftCardFixture },
        }, {
          currency: 'USD',
        });
      });

      afterEach(async () => {
        axios.reset();
      });

      it('renders gift card code', () => {
        expect(wrapper).toIncludeText(giftCard.code);
      });

      it('renders gift card value', () => {
        expect(wrapper).toIncludeText('$3.00');
      });
    });
  });
});
