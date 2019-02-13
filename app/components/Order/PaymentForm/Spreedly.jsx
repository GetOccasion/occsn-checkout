import React, { PureComponent } from 'react'
import Script from 'react-load-script'

import _ from 'underscore'
import s from 'underscore.string'

import { ErrorsFor } from 'mitragyna'

import occsn from '../../../libs/Occasion'

import { Col, FormGroup, Input, Label, Row, FormFeedback } from 'reactstrap'

import PaymentServiceProvider from './PaymentServiceProvider.jsx'
import CardNumber from './Spreedly/CardNumber.jsx'
import CVV from './Spreedly/CVV.jsx'

function camelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export default class SpreedlyIframe extends PaymentServiceProvider {
  constructor() {
    super()

    this.state = {
      month: null,
      full_name: null,
      year: null
    }
  }

  // Initializes the iFrame using the global Spreedly object imported as a separate script
  // @note Called on componentDidMount
  // @see PaymentServiceProvider#componentDidMount
  initializeForm = () => {
    Spreedly.init(global.OCCSN.spreedly_key, {
      numberEl: 'spreedly-number',
      cvvEl: 'spreedly-cvv'
    })

    let { spreedlyIframeInputStyles } = this.props

    let defaultInputStyle = {
      display: 'block',
      width: '80%',
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#495057',
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid #ced4da',
      borderRadius: '0.25rem',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
    }

    const focusInputStyle =
      'color: #495057;' +
      '  background-color: #fff;' +
      '  border-color: #80bdff;'

    if (spreedlyIframeInputStyles) {
      Object.assign(defaultInputStyle, spreedlyIframeInputStyles)
    }

    // Covert to string and hyphen-case the keys
    let inputStyleString = ''
    for (let prop in defaultInputStyle) {
      inputStyleString += `${camelCaseToDash(prop)}: ${
        defaultInputStyle[prop]
      };`
    }

    Spreedly.on('ready', function() {
      Spreedly.setFieldType('number', 'text')
      Spreedly.setNumberFormat('prettyFormat')
      Spreedly.setPlaceholder('number', '•••• •••• •••• ••••')
      Spreedly.setPlaceholder('cvv', '•••')
      Spreedly.setStyle('number', inputStyleString)
      Spreedly.setStyle('cvv', inputStyleString)
    })

    Spreedly.on('fieldEvent', function(name, type, activeEl, inputProperties) {
      if (type == 'focus') {
        Spreedly.setStyle(name, focusInputStyle)
      }

      if (type == 'blur') {
        Spreedly.setStyle(name, inputStyleString)
      }
    })

    Spreedly.on('errors', errors => {
      console.log(errors)
      this.paymentMethodDeferred.reject(
        _.map(errors, error => {
          return [
            'creditCard.' + s.camelize(error.attribute, true),
            error.key.replace('errors.', ''),
            error.message
          ]
        })
      )
    })

    Spreedly.on('paymentMethod', token => {
      this.paymentMethodDeferred.resolve(occsn.CreditCard.build({ id: token }))
    })
  }

  // Triggers paymentMethod event
  tokenizePaymentMethodData() {
    Spreedly.tokenizeCreditCard(this.state)
  }

  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const { order } = this.props

    return (
      <>
        <Script
          url="https://core.spreedly.com/iframe/iframe-v1.min.js"
          onLoad={this.initializeForm}
        />
        <section className="spreedly-container">
          <FormGroup className="spreedly-full-name">
            <label>Name On Card</label>
            <Input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Name On Card"
              onChange={e => this.handleChange('full_name', e)}
              className={
                order
                  .errors()
                  .forField('creditCard.firstName')
                  .empty() &&
                order
                  .errors()
                  .forField('creditCard.lastName')
                  .empty()
                  ? ''
                  : 'is-invalid'
              }
            />
            <ErrorsFor
              className="spreedly-first-name-errors"
              component={FormFeedback}
              field="creditCard.firstName"
            />
            <ErrorsFor
              className="spreedly-last-name-errors"
              component={FormFeedback}
              field="creditCard.lastName"
            />
          </FormGroup>

          <FormGroup className="spreedly-card-number">
            <Label>Credit Card Number</Label>
            <div class="custom-file">
              <div
                className="custom-file-input is-invalid"
                style={{ opacity: 1 }}
              >
                <CardNumber />
              </div>
              <ErrorsFor
                className="spreedly-card-number-errors"
                component={FormFeedback}
                field="creditCard.number"
              />
            </div>
          </FormGroup>

          <FormGroup className="spreedly-expiration-cvv">
            <Row>
              <Col className="spreedly-expiration" xs="6">
                <Label>Expiration Date</Label>
                <Row>
                  <Col xs="6">
                    <Input
                      type="text"
                      id="month"
                      name="month"
                      maxlength="2"
                      placeholder="MM"
                      onChange={e => this.handleChange('month', e)}
                      className={
                        order
                          .errors()
                          .forField('creditCard.year')
                          .empty()
                          ? ''
                          : 'is-invalid'
                      }
                    />
                    <ErrorsFor
                      className="spreedly-expiration-month-errors"
                      component={FormFeedback}
                      field="creditCard.month"
                    />
                  </Col>
                  <Col xs="6">
                    <Input
                      type="text"
                      id="year"
                      name="year"
                      maxlength="4"
                      placeholder="YYYY"
                      onChange={e => this.handleChange('year', e)}
                      className={
                        order
                          .errors()
                          .forField('creditCard.year')
                          .empty()
                          ? ''
                          : 'is-invalid'
                      }
                    />
                    <ErrorsFor
                      className="spreedly-expiration-year-errors"
                      component={FormFeedback}
                      field="creditCard.year"
                    />
                  </Col>
                </Row>
              </Col>
              <Col className="spreedly-cvv" xs="3">
                <CVV />
              </Col>
            </Row>
          </FormGroup>
        </section>
      </>
    )
  }
}
