import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from '../BottomNavigation';
import PostDetail from '../../screens/Home/components/PostDetail';
import Stall from '../../screens/Home/components/Stall';
import Login from '../../screens/Login';
import {useSelector, useDispatch} from 'react-redux';
import EditAccount from '../../screens/Account/EditAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../redux/action/userAction';
import Messages from '../../screens/Chat/Messages';
import AboutUs from '../../screens/AboutUs';
import HelpBee from '../../screens/Help';
import Register from '../../screens/Register';
import Reports from '../../screens/Home/components/Reports';
import Notify from '../../screens/Notify';
import ForgotPassword from '../../screens/ForgotPassword';
import EnterCode from '../../screens/ForgotPassword/EnterCode';
import NewPassword from '../../screens/ForgotPassword/EnterCode/NewPassword';
import AccountDetail from '../../screens/Account/AccountDetail';
import ChangePassword from '../../screens/Account/ChangePassword';
import EditPostCard from '../../screens/EditPost/EditPostCard';
import EditPost from '../../screens/EditPost';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  const checkUser = useCallback(async () => {
    const user = await AsyncStorage.getItem('user');
    dispatch(getUser(JSON.parse(user)));
    const isExist = userInfo.hasOwnProperty('isLogin');
    return isExist;
  }, [dispatch, userInfo]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const userInfo = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Stall"
          component={Stall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={EditAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Help"
          component={HelpBee}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountDetail"
          component={AccountDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notify"
          component={Notify}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterCode"
          component={EnterCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditPostCard"
          component={EditPostCard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
