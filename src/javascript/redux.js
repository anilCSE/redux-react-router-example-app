import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import * as reducers from './reducers';
import middleware from './middleware';
/* develblock:start */
import { devTools, persistState } from 'redux-devtools';
/* develblock:end */

const reducer = combineReducers(reducers);

const middlewareStack = middleware.map(md => applyMiddleware(md)).concat([
  devTools(),
  /* develblock:start */
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
  /* develblock:end */
]);

// create a store that has redux-thunk middleware enabled
const finalCreateStore = compose.apply(this, middlewareStack);

export const store = finalCreateStore(reducer);