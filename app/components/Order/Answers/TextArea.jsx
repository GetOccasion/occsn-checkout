import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Field } from 'mitragyna'
import { FormGroup, Label, Input } from 'reactstrap'

import occsn from '../../../libs/Occasion'

export default class TextArea extends PureComponent {
  static propTypes = {
    answer: PropTypes.instanceOf(occsn.Answer)
  }

  render() {
    let { answer } = this.props

    let id = 'answer-' + answer.question().id

    return (
      <FormGroup className="text-area-container">
        <a name={id} />
        <Label for={id}>
          {answer.question().title}
          {answer.question().required ? '*' : ''}
        </Label>
        <Field id={id} name="value" type="textarea" component={Input} />
      </FormGroup>
    )
  }
}
