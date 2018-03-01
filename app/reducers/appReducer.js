import Immutable from 'immutable';

import actionTypes from '../constants/appConstants';

import moment from 'moment';
import 'moment-timezone';

export const $$initialState = Immutable.fromJS({
  order: null,
  product: null,
});

export default function appReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
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
