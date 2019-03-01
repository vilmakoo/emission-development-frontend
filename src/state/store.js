import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './searchReducer';
import databaseReducer from './databaseReducer';
import chartReducer from './chartReducer';

const reducer = combineReducers({
  search: searchReducer,
  database: databaseReducer,
  charts: chartReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;