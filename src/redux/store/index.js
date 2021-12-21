import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import myReducer from '../reducer';

const store = createStore(myReducer, applyMiddleware(thunkMiddleware));

export default store;
