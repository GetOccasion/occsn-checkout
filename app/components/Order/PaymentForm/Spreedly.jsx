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
      nameOnCard: null,
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

    SpreedlyAPI.on("ready", function () {
      SpreedlyAPI.setFieldType("number", "text");
      SpreedlyAPI.setNumberFormat("prettyFormat");
      SpreedlyAPI.setPlaceholder("number", "Card Number");
      SpreedlyAPI.setPlaceholder("cvv", "CVV");
      //SpreedlyAPI.setStyle("number", 'display: block; width: 95%; height: 36px; padding: 6px 12px; font-size: 16px; line-height: 1.428571429; color: #7b829a; background-color: #fff; background-image: none; border: 1px solid #ccc; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;');
      //SpreedlyAPI.setStyle("cvv", 'display: block; width: 60px; height: 36px; padding: 6px 12px; font-size: 16px; line-height: 1.428571429; color: #7b829a; background-color: #fff; background-image: none; border: 1px solid #ccc; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;');
    });

    SpreedlyAPI.on('fieldEvent', function(name, type, activeEl, inputProperties) {
      //if(type == 'focus'){
      //  SpreedlyAPI.setStyle(name,'border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6)');
      //}
      //if(type == 'blur'){
      //  SpreedlyAPI.setStyle(name, 'border: 1px solid #ccc; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s; transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;');
      //}
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
        <Input type="text" id="nameOnCard" name="nameOnCard" placeholder="Name On Card" onChange={ (e) => this.handleChange('nameOnCard', e) } />
      </FormGroup>

      <FormGroup>
        <Label>Credit Card Number</Label>
        <div id="spreedly-number" class="spreedly-input"></div>
      </FormGroup>

      <FormGroup>
        <Row>
          <Col size="9">
            <Label>Expiration Date</Label>
            <Input type="text" id="month" name="month" maxlength="2" placeholder="MM" onChange={ (e) => this.handleChange('month', e) } />
            <Input type="text" id="year" name="year" maxlength="4" placeholder="YYYY" onChange={ (e) => this.handleChange('year', e) } />
          </Col>
          <Col size="3">
            <Label>CVV</Label>
            <div id="spreedly-cvv" class="spreedly-input"></div>
          </Col>
        </Row>
      </FormGroup>
    </section>;
  }
}
