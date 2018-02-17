import Immutable from 'immutable';

import actionTypes from '../constants/appConstants';

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
    default:
      return $$state;
  }
}
