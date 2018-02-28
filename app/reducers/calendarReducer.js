import ActiveResource from 'active-resource';
import Immutable from 'immutable';

import actionTypes from '../constants/calendarConstants';

export const $$initialState = Immutable.fromJS({
  selectedTimeSlots: ActiveResource.Collection.build(),
});

export default function calendarReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SELECT_TIME_SLOTS_FOR_DISPLAY:
      return $$state.merge({ selectedTimeSlots: action.timeSlots });
    default:
      return $$state;
  }
}
