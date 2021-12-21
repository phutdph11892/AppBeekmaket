import {GET_USER, LOGIN, LOGOUT, EDIT_USER} from '../../utils/constant';

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    // saving error
  }
};

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      state = action.payload;
      return {...state};

    case LOGIN:
      state = {
        isLogin: action.payload.isLogin,
        user: {
          id: action.payload.user._id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          avatar: action.payload.user.avatar,
          address: action.payload.user.address,
          phone: action.payload.user.phone,
          dateJoin: action.payload.user.dateJoin,
        },
      };
      storeData({...state});
      return {
        ...state,
      };

    case LOGOUT:
      AsyncStorage.removeItem('user');
      return {
        ...state,
      };
    case EDIT_USER:
      state.user.address = action.payload.data.address;
      state.user.name = action.payload.data.fullname;
      state.user.phone = action.payload.data.phone;
      state.user.avatar = action.payload.images;
      storeData({...state});
      // console.log('State Edit', state);
      return {...state};

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
