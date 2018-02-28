import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'LOAD_PRODUCT_TIME_SLOTS_REQUEST',
  'SELECT_TIME_SLOTS_FOR_DISPLAY',
]);

export default actionTypes;
