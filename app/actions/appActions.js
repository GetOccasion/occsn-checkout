import occsn from '../libs/Occasion'

import actionTypes from '../constants/appConstants'

export function constructOrder(product) {
  return dispatch => {
    dispatch(constructOrderRequest())

    return occsn.Order.construct({ product, status: 'initialized' }).then(order => {
      dispatch(setOrder(order))
    })
  }
}

export function constructOrderRequest() {
  return {
    type: actionTypes.OCCSN_CONSTRUCT_ORDER_REQUEST
  }
}

export function bookOrder(order) {
  return async dispatch => {
    dispatch(bookOrderRequest())

    try {
      order = await order.update({ status: 'reserved' })
    } catch (invalidOrder) {
      order = invalidOrder
    }

    dispatch(setOrder(order))
    dispatch(bookOrderRequestComplete())
  }
}

export function bookOrderRequest() {
  return {
    type: actionTypes.OCCSN_BOOK_ORDER_REQUEST
  }
}

export function bookOrderRequestComplete(order) {
  return {
    type: actionTypes.OCCSN_BOOK_ORDER_REQUEST_COMPLETE,
    order
  }
}

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

export function loadProduct(id) {
  return dispatch => {
    dispatch(loadProductRequest())

    var query = occsn.Product.includes({
      merchant: 'currency',
      venue: 'state'
    }).find(id)

    return query
      .then(product => {
        dispatch(setProduct(product))

        dispatch(constructOrder(product))
      })
      .catch(error => {
        dispatch(productNotFoundError(error))
      })
      .finally(() => {
        dispatch(loadProductRequestComplete())
      })
  }
}

export function loadProductRequest() {
  return {
    type: actionTypes.OCCSN_LOAD_PRODUCT_REQUEST
  }
}

export function loadProductRequestComplete() {
  return {
    type: actionTypes.OCCSN_LOAD_PRODUCT_REQUEST_COMPLETE
  }
}

export function saveOrder(order) {
  return async dispatch => {
    dispatch(saveOrderRequest())

    order = await order.save()

    dispatch(setOrder(order))
    dispatch(saveOrderRequestComplete())
  }
}

export function saveOrderRequest() {
  return {
    type: actionTypes.OCCSN_SAVE_ORDER_REQUEST
  }
}

export function saveOrderRequestComplete() {
  return {
    type: actionTypes.OCCSN_SAVE_ORDER_REQUEST_COMPLETE
  }
}

export function setOrder(order) {
  return {
    type: actionTypes.OCCSN_SET_ORDER,
    order
  }
}

export function setProduct(product) {
  return {
    type: actionTypes.OCCSN_SET_PRODUCT,
    product
  }
}

export function productNotFoundError(error) {
  return {
    type: actionTypes.OCCSN_SET_PRODUCT_NOT_FOUND_ERROR,
    error
  }
}

export function setSkipAttendee(attendee, skip) {
  return {
    type: actionTypes.OCCSN_SET_SKIP_ATTENDEE,
    attendee,
    skip
  }
}
