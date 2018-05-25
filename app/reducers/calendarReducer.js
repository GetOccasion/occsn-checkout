import ActiveResource from 'active-resource';
import Immutable from 'immutable';

import actionTypes from '../constants/calendarConstants';

export const $$initialState = Immutable.fromJS({
  activeTimeSlotsCollection: ActiveResource.CollectionResponse.build(),
  timeSlotsFromCalendar: ActiveResource.Collection.build(),
});

export default function calendarReducer($$state = $$initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_ACTIVE_TIME_SLOTS_COLLECTION:
      return $$state.merge({ activeTimeSlotsCollection: action.timeSlots });
    case actionTypes.SET_TIME_SLOTS_FROM_CALENDAR:
      return $$state.merge({ timeSlotsFromCalendar: action.timeSlots });
    default:
      return $$state;
  }
}
