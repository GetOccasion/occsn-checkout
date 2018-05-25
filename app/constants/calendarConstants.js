import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'LOAD_PRODUCT_TIME_SLOTS_REQUEST',
  'SET_ACTIVE_TIME_SLOTS_COLLECTION',
  'SET_TIME_SLOTS_FROM_CALENDAR',
]);

export default actionTypes;
