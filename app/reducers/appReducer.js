import Immutable from 'immutable';

import actionTypes from '../constants/appConstants';

export const $$initialState = Immutable.fromJS({
  bookingOrder: false,
  order: null,
  product: null,
  savingOrder: false,
});

export default function appReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.OCCSN_BOOK_ORDER_REQUEST:
      return $$state.merge({ bookingOrder: true });
    case actionTypes.OCCSN_BOOK_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ bookingOrder: false });
    case actionTypes.OCCSN_SAVE_ORDER_REQUEST:
      return $$state.merge({ savingOrder: true });
    case actionTypes.OCCSN_SAVE_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ savingOrder: false });
    case actionTypes.OCCSN_SET_ORDER:
      return $$state.merge({ order: action.order });
    case actionTypes.OCCSN_SET_PRODUCT:
      return $$state.merge({ product: action.product });
    default:
      return $$state;
  }
}
