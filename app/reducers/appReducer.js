import Immutable from 'immutable';

import actionTypes from '../constants/appConstants';

import moment from 'moment';
import 'moment-timezone';

export const $$initialState = Immutable.fromJS({
  bookingOrder: false,
  order: null,
  product: null,
});

export default function appReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.BOOK_ORDER_REQUEST:
      return $$state.merge({ bookingOrder: true });
    case actionTypes.BOOK_ORDER_REQUEST_COMPLETE:
      return $$state.merge({ bookingOrder: false, order: action.order });
    case actionTypes.SET_ORDER:
      return $$state.merge({ order: action.order });
    case actionTypes.SET_PRODUCT:
      return $$state.merge({ product: action.product });
    case actionTypes.SET_TIME_ZONE:
      moment.tz.setDefault(action.timeZone);
      return $$state;
    default:
      return $$state;
  }
}
