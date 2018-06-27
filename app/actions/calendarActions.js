import occsn from '../libs/Occasion';

import actionTypes from '../constants/calendarConstants';

export function loadProductCalendar(product) {
  return dispatch => {
    dispatch(loadProductTimeSlotsRequest());

    return product.constructCalendar(product.firstTimeSlotStartsAt.clone().startOf('month')).then(timeSlots => {
      dispatch(setActiveTimeSlotsCollection(timeSlots));
    });
  };
}

export function loadProductTimeSlots(product) {
  return dispatch => {
    dispatch(loadProductTimeSlotsRequest());

    var query =
      product.timeSlots()
      .includes({ product: 'merchant' })
      .where({ status: 'bookable' })
      .all();

    return query.then(timeSlots => {
      dispatch(setActiveTimeSlotsCollection(timeSlots));
    });
  };
}

export function loadProductTimeSlotsRequest() {
  return {
    type: actionTypes.OCCSN_LOAD_PRODUCT_TIME_SLOTS_REQUEST
  };
}

export function setActiveTimeSlotsCollection(timeSlots) {
  return {
    type: actionTypes.OCCSN_SET_ACTIVE_TIME_SLOTS_COLLECTION,
    timeSlots
  };
}

export function setTimeSlotsFromCalendar(timeSlots) {
  return {
    type: actionTypes.OCCSN_SET_TIME_SLOTS_FROM_CALENDAR,
    timeSlots
  };
}
