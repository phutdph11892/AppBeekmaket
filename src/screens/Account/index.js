/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/core';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {onLogout} from '../../redux/action/userAction';

const Account = () => {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  React.useEffect(() => {}, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => {
            navigation.navigate('AccountDetail');
          }}>
          <Icon name="edit" size={24} color={'#fff'} />
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={{
            uri:
              userInfo.avatar ??
              'https://s199.imacdn.com/ta/2018/08/07/8530420992c43a88_b69f1c94f3b72966_5642115336069297185710.jpg',
          }}
        />
        <Text style={styles.text}>{userInfo.name ?? ''}</Text>
        <Text style={{fontSize: 13, color: '#FFFFFF'}}>
          {userInfo.email ?? ''}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Notify');
          }}>
          <Icon name={'bell'} size={24} color={'#E67E21'} />
          <Text style={styles.textOnclick}>Thông báo</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('EditPostCard');
          }}>
          <AntDesign name="heart" size={24} color="#E67E21" />
          <Text style={styles.textOnclick}>Tin đã đăng</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('SAVE_POST');
          }}>
          <Icon name="shopping-cart" size={24} color="#E67E21" />
          <Text style={styles.textOnclick}>Tin lưu</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('AboutUs');
          }}>
          <Icon name={'user-alt'} size={24} color={'#E67E21'} />
          <Text style={styles.textOnclick}>Về chúng tôi</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Help');
          }}>
          <Icon name={'question-circle'} size={24} color={'#E67E21'} />
          <Text style={styles.textOnclick}>Trợ giúp</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            dispatch(onLogout());
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}>
          <Icon name={'sign-out-alt'} size={24} color={'#E67E21'} />
          <Text style={styles.textOnclick}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonEdit: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  accountContainer: {
    flexDirection: 'column',
    width: windowWidth,
    height: windowHeight / 2.75,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#E67E21',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 40,
    borderRadius: 50,
  },

  text: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    width: windowWidth,
    height: 64,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#D1D1D1',
    alignItems: 'center',
    padding: 18,
  },
  textOnclick: {
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 24,
  },
});
