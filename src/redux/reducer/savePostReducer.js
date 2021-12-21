import {
  ADD_TO_SAVE_POST,
  REMOVE_FROM_SAVE_POST,
  GET_SAVE_POST,
} from '../../utils/constant';

const savePostReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SAVE_POST:
      state = [...action.payload];
      return [...state];
    case ADD_TO_SAVE_POST:
      return [...state, action.payload];
    case REMOVE_FROM_SAVE_POST:
      return state.filter(savePost => savePost !== action.payload);
    default:
      return state;
  }
};

export default savePostReducer;
