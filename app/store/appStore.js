import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

import reducers, { initialStates } from '../reducers/index.js';

export default function configureStore(_) {
  const { $$appState, $$calendarState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$appStore: $$appState,
    $$calendarStore: $$calendarState,
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
  });

  // Sync dispatched route actions to the history
  const finalCreateStore = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )(createStore);

  var store = finalCreateStore(reducer, initialState);

  return store;
};
