export const API = 'https://beemarket.herokuapp.com/api/';
export const checkEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const checkEmailRegister = emailRegister => {
  const res = /^[\w-\\._\\+%]+@fpt.edu.vn/;
  return res.test(String(emailRegister).toLowerCase());
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';
export const EDIT_USER = 'EDIT_USER';
export const ADD_TO_SAVE_POST = 'ADD_TO_SAVE_POST';
export const REMOVE_FROM_SAVE_POST = 'REMOVE_FROM_SAVE_POST';
export const GET_SAVE_POST = 'GET_SAVE_POST';
