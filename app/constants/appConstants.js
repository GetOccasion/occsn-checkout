import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'CONSTRUCT_ORDER_REQUEST',
  'LOAD_PRODUCT_REQUEST',
  'SET_ORDER',
  'SET_PRODUCT',
  'SET_TIME_ZONE',
]);

export default actionTypes;
