import {EDIT_USER, GET_USER, LOGIN, LOGOUT} from '../../utils/constant';

export const getUser = payload => {
  return {
    type: GET_USER,
    payload,
  };
};

export const onLogin = payload => {
  return {
    type: LOGIN,
    payload,
  };
};

export const onLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const onEdit = payload => {
  return {
    type: EDIT_USER,
    payload,
  };
};
