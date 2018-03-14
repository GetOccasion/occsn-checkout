'use strict';

var onPaymentMethodCallback;
var paymentMethodTokenResponse;

var spreedlyMock = {
  init: jest.fn(),
  on: function(eventName, callback) {
    if(eventName == 'paymentMethod') {
      onPaymentMethodCallback = callback;
    }
  },
  setPaymentMethodTokenResponse: function(token) {
    paymentMethodTokenResponse = token;
  },
  tokenizeCreditCard: jest.fn().mockImplementation(() => {
    onPaymentMethodCallback(paymentMethodTokenResponse)
  })
};

module.exports = spreedlyMock;
