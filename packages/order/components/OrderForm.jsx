import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import OccsnContextConsumer from '@occsn/occsn-provider';

class OrderForm extends PureComponent {
  static contextType = OccsnContextConsumer

  constructor(props) {
    super()
    const { registerComponent } = this.context

    registerComponent('order', this)

    // Mitragyna submit method
    this.onSubmit = props.onSubmit
  }

  allowedToBookOrder = () => {
    const { components: { missingAnswers }} = this.context
    const { bookingOrder, savingOrder, subject } = this.props

    if (!subject || !missingAnswers) return false

    return (
      !bookingOrder && !savingOrder && missingAnswers.missingRequiredAnswers(subject).empty()
    )
  }

  // Mitragyna callback
  beforeSubmit = (subject) => {
    const { paymentForm, redeemables } = this.context

    // If the user hits enter while focused on the redeemables input, then submit the
    // redeemable search and cancel the order form submissionm
    if (redeemables && redeemables.state.focused) {
      redeemables.checkForRedeemable(redeemables.state.code)
      throw subject
    }

    if (!subject.outstandingBalance.isZero()) {
      let balanceTransaction = subject
        .transactions()
        .target()
        .detect(t => !(t.paymentMethod() && t.paymentMethod(occsn.GiftCard)))

      if (balanceTransaction)
        subject
          .transactions()
          .target()
          .delete(balanceTransaction)

      return paymentForm.chargeOutstandingBalanceToPaymentMethod(subject)
    } else {
      return subject
    }
  }
}
