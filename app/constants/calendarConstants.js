import mirrorCreator from 'mirror-creator'

const actionTypes = mirrorCreator([
  'OCCSN_LOAD_PRODUCT_TIME_SLOTS_REQUEST',
  'OCCSN_SET_ACTIVE_TIME_SLOTS_COLLECTION',
  'OCCSN_SET_TIME_SLOTS_FROM_CALENDAR'
])

export default actionTypes
