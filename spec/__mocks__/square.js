'use strict';

var onPaymentMethodCallback;
var paymentMethodTokenResponse;
var sqPaymentForm;

var squareMock = jest.fn().mockImplementation((options) => {
  onPaymentMethodCallback = options.callbacks.cardNonceResponseReceived;
  sqPaymentForm = {
    build: () => {},
    requestCardNonce: jest.fn().mockImplementation(() => {
      onPaymentMethodCallback(undefined, paymentMethodTokenResponse)
    })
  };

  return sqPaymentForm;
});

squareMock.setPaymentMethodTokenResponse = function(response) {
  paymentMethodTokenResponse = response;
};

squareMock.getSqPaymentForm = function() {
  return sqPaymentForm;
};

module.exports = squareMock;
