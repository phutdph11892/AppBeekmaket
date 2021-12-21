import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';

const AccountDetail = () => {
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLayout}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              as={<FontAwesome name="chevron-left" />}
              size={6}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.text}>Thông tin tài khoản</Text>
        </View>
        <View style={styles.layout}>
          <Image
            style={styles.logo}
            source={{
              uri:
                user?.avatar ??
                'https://s199.imacdn.com/ta/2018/08/07/8530420992c43a88_b69f1c94f3b72966_5642115336069297185710.jpg',
            }}
          />
          <Text style={styles.textName}>{user?.name}</Text>
        </View>
        <View style={styles.layoutText}>
          <Icon
            style={styles.imageIcon}
            as={<FontAwesome name="map-marker" />}
            size={6}
            color="#000000"
          />
          <Text style={styles.textTitleAddress}>Địa chỉ :</Text>
          <View style={styles.layoutTextColumn}>
            <Text style={styles.textAddress}>{user?.address}</Text>
          </View>
        </View>
        <View style={styles.layoutText}>
          <Icon
            style={styles.imageIcon}
            as={<FontAwesome name="calendar" />}
            size={6}
            color="#000000"
          />
          <Text style={styles.textTitleTime}>Ngày tham gia :</Text>
          <View style={styles.layoutTextColumn}>
            <Text style={styles.textTime}>{user?.dateJoin}</Text>
          </View>
        </View>
        <View style={styles.layoutText}>
          <Icon
            style={styles.imageIcon}
            as={<FontAwesome name="envelope" />}
            size={6}
            color="#000000"
          />
          <Text style={styles.textTitleEmail}>Email :</Text>
          <View style={styles.layoutTextColumn}>
            <Text style={styles.textEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.layoutText}>
          <Icon
            style={styles.imageIcon}
            as={<FontAwesome name="phone" />}
            size={6}
            color="#000000"
          />
          <Text style={styles.textTitlePhone}>Số điện thoại :</Text>
          <View style={styles.layoutTextColumn}>
            <Text style={styles.textPhone}>{user?.phone}</Text>
          </View>
        </View>
      </View>

      <View style={styles.layoutButton}>
        <TouchableOpacity
          style={styles.buttonOnclickPass}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <Text style={styles.textTitleUpdatePass}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOnclickPass}
          onPress={() => {
            navigation.navigate('Edit');
          }}>
          <Text style={styles.textTitleUpdatePass}>Sửa thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 15,
    marginTop: 10,
  },
  headerContainer: {
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: windowWidth / 25,
    height: windowHeight / 35,
    marginLeft: 15,
    color: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  textName: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#E67E21',
  },
  textTitleAddress: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 8,
  },
  textAddress: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  textTitleTime: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 8,
  },
  textTime: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  textTitleEmail: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 8,
  },
  textEmail: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
  },
  textTitlePhone: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 8,
  },
  textPhone: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 15,
  },
  buttonOnclick: {
    marginTop: 5,
    width: windowWidth - 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    borderWidth: 2,
    marginLeft: 10,
  },
  buttonOnclickPass: {
    width: windowWidth / 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#a8adb8',
  },
  layoutText: {
    flexDirection: 'row',
    marginTop: 10,
  },
  layoutTextName: {
    flexDirection: 'column',
  },
  lineRule: {
    width: '100%',
    height: 1,
    backgroundColor: '#a8adb8',
    marginTop: 2,
  },
  layoutTextColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageIcon: {
    marginLeft: 20,
    marginTop: 10,
  },
  containerLayout: {
    flex: 12,
  },
  layoutButton: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
  },
  textTitleUpdatePass: {
    color: '#000000',
    fontSize: 18,
  },
});
