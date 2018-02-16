import occsn from '../libs/Occasion';

import actionTypes from '../constants/appConstants';

export function loadProduct(id) {
  return dispatch => {
    return occsn.Product.find(id).then(product => {
      dispatch(setProduct(product));
    });
  };
}

export function setProduct(product) {
  return {
    type: actionTypes.SET_PRODUCT,
    product
  };
}
