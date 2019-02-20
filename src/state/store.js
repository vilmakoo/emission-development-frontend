import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './searchReducer';
import databaseReducer from './databaseReducer';

const reducer = combineReducers({
  search: searchReducer,
  database: databaseReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;