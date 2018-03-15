import React, { PureComponent } from 'react';

import _ from 'underscore';

import occsn from '../../../libs/Occasion';

import SpreedlyAPI from 'spreedly';

import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

import PaymentServiceProvider from './PaymentServiceProvider';

export default class Spreedly extends PaymentServiceProvider {
  constructor() {
    super();

    _.bindAll(this,
      'handleChange'
    );

    this.state = {
      month: null,
      full_name: null,
      year: null
    };
  }

  // Initializes the iFrame using the global SpreedlyAPI object imported as a separate script
  // @note Called on componentDidMount
  // @see PaymentServiceProvider#componentDidMount
  initializeForm() {
    SpreedlyAPI.init(global.OCCSN.spreedly_key, {
      "numberEl": "spreedly-number",
      "cvvEl": "spreedly-cvv"
    });

    var defaultInputStyle = 'display: block;' +
      '  width: 80%;' +
      '  padding: 0.375rem 0.75rem;' +
      '  font-size: 1rem;' +
      '  line-height: 1.5;' +
      '  color: #495057;' +
      '  background-color: #fff;' +
      '  background-clip: padding-box;' +
      '  border: 1px solid #ced4da;' +
      '  border-radius: 0.25rem;' +
      '  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';

    var focusInputStyle = 'color: #495057;' +
      '  background-color: #fff;' +
      '  border-color: #80bdff;' +
      '  outline: 0;' +
      '  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)';

    SpreedlyAPI.on("ready", function () {
      SpreedlyAPI.setFieldType("number", "text");
      SpreedlyAPI.setNumberFormat("prettyFormat");
      SpreedlyAPI.setPlaceholder("number", "•••• •••• •••• ••••");
      SpreedlyAPI.setPlaceholder("cvv", "•••");
      SpreedlyAPI.setStyle("number", defaultInputStyle);
      SpreedlyAPI.setStyle("cvv", defaultInputStyle);
    });

    SpreedlyAPI.on('fieldEvent', function(name, type, activeEl, inputProperties) {
      if(type == 'focus'){
        SpreedlyAPI.setStyle(name, focusInputStyle);
      }

      if(type == 'blur'){
        SpreedlyAPI.setStyle(name, defaultInputStyle);
      }
    });

    SpreedlyAPI.on('errors', function(errors) {
    });

    SpreedlyAPI.on('paymentMethod', (token) => {
      this.paymentMethodDeferred.resolve(occsn.CreditCard.build({ id: token }));
    });
  }

  // Triggers paymentMethod event
  tokenizePaymentMethodData() {
    SpreedlyAPI.tokenizeCreditCard(this.state);
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    return <section>
      <FormGroup>
        <label>Name On Card</label>
        <Input type="text" id="full_name" name="full_name" placeholder="Name On Card" onChange={ (e) => this.handleChange('full_name', e) } />
      </FormGroup>

      <FormGroup>
        <Label>Credit Card Number</Label>
        <div id="spreedly-number" style={{ height: '48px' }}></div>
      </FormGroup>

      <FormGroup>
        <Row>
          <Col xs="6">
            <Label>Expiration Date</Label>
            <Row>
              <Col xs="6">
                <Input type="text" id="month" name="month" maxlength="2" placeholder="MM" onChange={ (e) => this.handleChange('month', e) } />
              </Col>
              <Col xs="6">
                <Input type="text" id="year" name="year" maxlength="4" placeholder="YYYY" onChange={ (e) => this.handleChange('year', e) } />
              </Col>
            </Row>
          </Col>
          <Col xs="3">
            <Label>CVV</Label>
            <div id="spreedly-cvv" style={{ height: '48px' }}></div>
          </Col>
        </Row>
      </FormGroup>
    </section>;
  }
}
