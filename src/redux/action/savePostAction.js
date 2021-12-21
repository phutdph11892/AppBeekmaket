import {
  ADD_TO_SAVE_POST,
  GET_SAVE_POST,
  REMOVE_FROM_SAVE_POST,
} from '../../utils/constant';

export const addSavePost = payload => {
  return {
    type: ADD_TO_SAVE_POST,
    payload,
  };
};

export const removeSavePost = payload => {
  return {
    type: REMOVE_FROM_SAVE_POST,
    payload,
  };
};

export const getSavePost = payload => {
  return {
    type: GET_SAVE_POST,
    payload,
  };
};

export const getPost = payload => {
  return {
    type: 'GET_POST',
    payload,
  };
};
