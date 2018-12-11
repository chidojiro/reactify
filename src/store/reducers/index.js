import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './userReducer';
import songReducer from './songReducer';
import UIReducer from './UIReducers';

const rootReducer = combineReducers({
  user: authReducer,
  songs: songReducer,
  UI: UIReducer
});

const composeEnhancers =
  process.env.NODE_ENV === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    null || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;