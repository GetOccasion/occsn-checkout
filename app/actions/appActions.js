import occsn from '../libs/Occasion'

import actionTypes from '../constants/appConstants'

export function findRedeemable(product, code, onSuccess, onError) {
  return dispatch => {
    dispatch(findRedeemableRequest())

    return product
      .redeemables()
      .findBy({ code })
      .then(onSuccess, onError)
      .finally(() => {
        dispatch(findRedeemableRequestComplete())
      })
  }
}

export function findRedeemableRequest() {
  return {
    type: actionTypes.OCCSN_FIND_REDEEMABLE_REQUEST
  }
}

export function findRedeemableRequestComplete() {
  return {
    type: actionTypes.OCCSN_FIND_REDEEMABLE_REQUEST_COMPLETE
  }
}

export function setSkipAttendee(attendee, skip) {
  return {
    type: actionTypes.OCCSN_SET_SKIP_ATTENDEE,
    attendee,
    skip
  }
}
