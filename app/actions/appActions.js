import occsn from '../libs/Occasion';

import actionTypes from '../constants/appConstants';

export function constructOrder(product) {
  return dispatch => {
    dispatch(constructOrderRequest());

    return occsn.Order.construct({ product, status: 'initialized' }).then(order => {
      dispatch(setOrder(order));
    });
  };
}

export function constructOrderRequest() {
  return {
    type: actionTypes.CONSTRUCT_ORDER_REQUEST
  };
}

export function bookOrder(order) {
  return async (dispatch) => {
    dispatch(bookOrderRequest());

    try {
      order = await order.update({ status: 'reserved' });
    } catch(invalidOrder) {
      order = invalidOrder;
    }

    dispatch(setOrder(order));
    dispatch(bookOrderRequestComplete());
  };
}

export function bookOrderRequest() {
  return {
    type: actionTypes.BOOK_ORDER_REQUEST
  };
}

export function bookOrderRequestComplete(order) {
  return {
    type: actionTypes.BOOK_ORDER_REQUEST_COMPLETE,
    order
  };
}

export function findRedeemable(product, code, onSuccess, onError) {
  return dispatch => {
    dispatch(findRedeemableRequest());

    return product.redeemables().findBy({ code })
    .then(onSuccess, onError)
    .finally(() => {
      dispatch(findRedeemableRequestComplete());
    });
  };
}

export function findRedeemableRequest() {
  return {
    type: actionTypes.FIND_REDEEMABLE_REQUEST
  };
}

export function findRedeemableRequestComplete() {
  return {
    type: actionTypes.FIND_REDEEMABLE_REQUEST_COMPLETE
  };
}

export function loadProduct(id) {
  return dispatch => {
    dispatch(loadProductRequest());

    var query =
      occsn.Product
      .includes({ merchant: 'currency', venue: 'state' })
      .find(id);

    return query.then(product => {
      dispatch(setProduct(product));

      dispatch(setTimeZone(product.merchant().timeZone));

      dispatch(constructOrder(product));
    });
  };
}

export function loadProductRequest() {
  return {
    type: actionTypes.LOAD_PRODUCT_REQUEST
  };
}

export function saveOrder(order) {
  return async (dispatch) => {
    dispatch(saveOrderRequest());

    order = await order.save();

    dispatch(setOrder(order));
    dispatch(saveOrderRequestComplete());
  };
}

export function saveOrderRequest() {
  return {
    type: actionTypes.SAVE_ORDER_REQUEST
  };
}

export function saveOrderRequestComplete() {
  return {
    type: actionTypes.SAVE_ORDER_REQUEST_COMPLETE,
  };
}

export function setOrder(order) {
  return {
    type: actionTypes.SET_ORDER,
    order
  };
}

export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  };
}

export function setTimeZone(timeZone) {
  return {
    type: actionTypes.SET_TIME_ZONE,
    timeZone
  };
}
