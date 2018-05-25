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
    case actionTypes.BOOK_ORDER_REQUEST:
      return $$state.merge({ bookingOrder: true });
    case actionTypes.BOOK_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ bookingOrder: false });
    case actionTypes.SAVE_ORDER_REQUEST:
      return $$state.merge({ savingOrder: true });
    case actionTypes.SAVE_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ savingOrder: false });
    case actionTypes.SET_ORDER:
      return $$state.merge({ order: action.order });
    case actionTypes.SET_PRODUCT:
      return $$state.merge({ product: action.product });
    default:
      return $$state;
  }
}
