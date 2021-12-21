import userReducer from './userReducer';
import savePostReducer from './savePostReducer';
import postReducer from './postReducer';

import {combineReducers} from 'redux';

const myReducer = combineReducers({
  user: userReducer,
  savePost: savePostReducer,
  post: postReducer,
});

export default myReducer;
