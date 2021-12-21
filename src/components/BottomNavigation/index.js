/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../../screens/Home';
import Account from '../../screens/Account';
import SavePosts from '../../screens/SavePost';
import CreatePost from '../../screens/CreatePost';
import Chat from '../../screens/Chat';
import EditPosts from '../../screens/EditPost';

const Tab = createBottomTabNavigator();

const Custom = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -20,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#E67E21',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HOME"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#E67E21',
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: '#ffffff',
        },
      }}>
      <Tab.Screen
        name="HOME"
        component={Home}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name={'home'}
                size={24}
                color={focused ? '#E67E21' : '#838181'}
              />
            </View>
          ),
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="SAVE_POST"
        component={SavePosts}
        options={() => ({
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name="cart"
                  size={24}
                  color={focused ? '#E67E21' : '#838181'}
                />
              </View>
            );
          },
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="POST"
        component={CreatePost}
        options={() => ({
          tabBarIcon: () => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="add-outline" size={24} color={'white'} />
            </View>
          ),
          tabBarButton: props => <Custom {...props} />,
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="MESSAGE"
        component={Chat}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="chatbubble-ellipses-outline"
                size={24}
                color={focused ? '#E67E21' : '#838181'}
              />
            </View>
          ),
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="ACCOUNT"
        component={Account}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="person-outline"
                size={24}
                color={focused ? '#E67E21' : '#838181'}
              />
            </View>
          ),
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
