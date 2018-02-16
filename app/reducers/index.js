// Manifest of all reducers for the app
import appReducer, { $$initialState as $$appState }  from './appReducer';

export default {
  $$appStore: appReducer,
};

export const initialStates = {
  $$appState,
};
