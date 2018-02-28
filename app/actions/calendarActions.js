import occsn from '../libs/Occasion';

import actionTypes from '../constants/calendarConstants';

export function loadProductTimeSlots(product) {
  return dispatch => {
    dispatch(loadProductTimeSlotsRequest());

    var query =
      product.timeSlots()
      .where({ status: 'bookable' })
      .all();

    return query.then(timeSlots => {
      dispatch(selectTimeSlotsForDisplay(timeSlots.toCollection()));
    });
  };
}

export function loadProductTimeSlotsRequest() {
  return {
    type: actionTypes.LOAD_PRODUCT_TIME_SLOTS_REQUEST
  };
}

export function selectTimeSlotsForDisplay(timeSlots) {
  return {
    type: actionTypes.SELECT_TIME_SLOTS_FOR_DISPLAY,
    timeSlots
  };
}
