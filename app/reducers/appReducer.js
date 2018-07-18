import Immutable from 'immutable';

import actionTypes from '../constants/appConstants';

export const $$initialState = Immutable.fromJS({
  bookingOrder: false,
  loadingProduct: false,
  order: null,
  product: null,
  productNotFoundError: false,
  savingOrder: false,
  skipAttendees: {}
});

export default function appReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.OCCSN_BOOK_ORDER_REQUEST:
      return $$state.merge({ bookingOrder: true });
    case actionTypes.OCCSN_BOOK_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ bookingOrder: false });
    case actionTypes.OCCSN_LOAD_PRODUCT_REQUEST:
      return $$state.merge({ loadingProduct: true });
    case actionTypes.OCCSN_LOAD_PRODUCT_REQUEST_COMPLETE:
      return $$state.merge({ loadingProduct: false });
    case actionTypes.OCCSN_SAVE_ORDER_REQUEST:
      return $$state.merge({ savingOrder: true });
    case actionTypes.OCCSN_SAVE_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ savingOrder: false });
    case actionTypes.OCCSN_SET_ORDER:
      return $$state.merge({ order: action.order });
    case actionTypes.OCCSN_SET_PRODUCT:
      return $$state.merge({ product: action.product });
    case actionTypes.OCCSN_SET_PRODUCT_NOT_FOUND_ERROR:
      return $$state.merge({ productNotFoundError: action.error });
    case actionTypes.OCCSN_SET_SKIP_ATTENDEE:
      return $$state;
    default:
      return $$state;
  }
}
