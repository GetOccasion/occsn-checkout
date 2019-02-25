// Manifest of all reducers for the app
import appReducer, { $$initialState as $$appState } from './appReducer'
import calendarReducer, { $$initialState as $$calendarState } from './calendarReducer'

export default {
  $$appStore: appReducer,
  $$calendarStore: calendarReducer
}

export const initialStates = {
  $$appState,
  $$calendarState
}
