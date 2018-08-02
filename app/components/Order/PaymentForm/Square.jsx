import React, { PureComponent } from 'react';

import { ErrorsFor } from 'mitragyna';
import _ from 'underscore';

import occsn from '../../../libs/Occasion';

import SquareAPI from 'square';

import { Col, FormGroup, Input, Label, Row, FormFeedback } from 'reactstrap';

import PaymentServiceProvider from './PaymentServiceProvider.jsx';

import CardNumber from './Square/CardNumber.jsx';
import ExpirationDate from './Square/ExpirationDate.jsx';
import CVV from './Square/CVV.jsx';
import PostalCode from './Square/PostalCode.jsx';

export default class Square extends PaymentServiceProvider {
  // Initializes the iFrame using the global SqPaymentForm library imported as SquareAPI
  initializeForm() {
    let defaultInputStyle = {
      padding: '0.375em 0.75em',
      fontSize: '1em',
      lineHeight: 1.5,
      color: '#495057',
      backgroundColor: '#fff',
    };

    let { iframeInputStyles } = this.props

    if(iframeInputStyles) {
      Object.assign(defaultInputStyle, iframeInputStyles);
    }

    this.sqPaymentForm = new SquareAPI({

      // Initialize the payment form elements
      applicationId: global.OCCSN.square_key,
      inputClass: 'form-control-square',
      inputStyles: [defaultInputStyle],

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
            this.paymentMethodDeferred.reject(
              _.map(errors, (error) => {
                return [
                  'creditCard.' + error.field,
                  'invalid',
                  error.message
                ];
              })
            )          } else {
            this.paymentMethodDeferred.resolve(occsn.CreditCard.build({ id: nonce }));
          }
        }
      }
    });

    this.sqPaymentForm.build();
  }

  // Triggers cardNonceResponseReceived event
  tokenizePaymentMethodData() {
    this.sqPaymentForm.requestCardNonce();
  }

  render() {
    return <section className="square-container">
      <div id="sq-ccbox">
        <FormGroup className="square-card-number">
          <Label>Card Number</Label>
          <div class="custom-file">
            <div className="custom-file-input is-invalid" style={{ opacity: 1 }}>
              <CardNumber />
            </div>
            <ErrorsFor className="square-card-number-errors" component={FormFeedback} field='creditCard.cardNumber'></ErrorsFor>
          </div>
        </FormGroup>

        <FormGroup className="square-expiration-cvv">
          <Row>
            <Col className="square-expiration" xs="6">
              <Label>Expiration Date</Label>
              <div class="custom-file">
                <div className="custom-file-input is-invalid" style={{ opacity: 1 }}>
                  <ExpirationDate />
                </div>
                <ErrorsFor className="square-expiration-errors" component={FormFeedback} field='creditCard.expirationDate'></ErrorsFor>
              </div>
            </Col>
            <Col className="square-cvv" xs="3">
              <Label>CVV</Label>
              <CVV />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup className="square-postal-code">
          <Label>Postal Code</Label>
          <div class="custom-file">
            <div className="custom-file-input is-invalid" style={{ opacity: 1 }}>
              <PostalCode />
            </div>
            <ErrorsFor className="square-postal-code-errors" component={FormFeedback} field='creditCard.postalCode'></ErrorsFor>
          </div>
        </FormGroup>
      </div>
    </section>;
  }
}
