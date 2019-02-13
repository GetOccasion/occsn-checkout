import React from 'react'

import { FormGroup, Label, FormFeedback } from 'reactstrap'

import { ErrorsFor } from 'mitragyna'

export default class CardNumber extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div id="sq-card-number" />
  }
}
