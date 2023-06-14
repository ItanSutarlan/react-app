import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';

import categories from './reducers/categories';
import posts from './reducers/posts';

const rootReducer = combineReducers({
  posts,
  categories,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
