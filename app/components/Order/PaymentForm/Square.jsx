import React, { PureComponent } from 'react';

import occsn from '../../../libs/Occasion';

import SquareAPI from 'square';

import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

import PaymentServiceProvider from './PaymentServiceProvider';

export default class Square extends PaymentServiceProvider {
  // Initializes the iFrame using the global SqPaymentForm library imported as SquareAPI
  initializeForm() {
    this.sqPaymentForm = new SquareAPI({

      // Initialize the payment form elements
      applicationId: global.OCCSN.square_key,
      inputClass: 'form-control-square',
      inputStyles: [{
        padding: '0.375em 0.75em',
        fontSize: '1em',
        lineHeight: 1.5,
        color: '#495057',
        backgroundColor: '#fff',
      }],

      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '•••• •••• •••• ••••'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: '#####'
      },

      // SqPaymentForm callback functions
      callbacks: {
        cardNonceResponseReceived: (errors, nonce) => {
          if (errors) {
          } else {
            this.paymentMethodDeferred.resolve(occsn.CreditCard.build({ id: nonce }));
          }
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: (inputEvent) => {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              /* HANDLE AS DESIRED */
              break;
            case 'focusClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassAdded':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'cardBrandChanged':
              /* HANDLE AS DESIRED */
              break;
            case 'postalCodeChanged':
              /* HANDLE AS DESIRED */
              break;
          }
        },
        paymentFormLoaded: () => {}
      }
    });

    this.sqPaymentForm.build();
  }

  // Triggers cardNonceResponseReceived event
  tokenizePaymentMethodData() {
    this.sqPaymentForm.requestCardNonce();
  }

  render() {
    return <section>
      <div id="sq-ccbox">
        <FormGroup>
          <Label>Card Number</Label>
          <div id="sq-card-number"></div>
        </FormGroup>

        <FormGroup>
          <Row>
            <Col xs="6">
              <Label>Expiration Date</Label>
              <div id="sq-expiration-date"></div>
            </Col>
            <Col xs="3">
              <Label>CVV</Label>
              <div id="sq-cvv"></div>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Label>Postal Code</Label>
          <div id="sq-postal-code"></div>
        </FormGroup>

        <input type="hidden" id="card-nonce" name="nonce" />
      </div>
    </section>;
  }
}
