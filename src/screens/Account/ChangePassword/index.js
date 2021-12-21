import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Input, Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {API} from '../../../utils/constant';
import {useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
  const [password, setPassword] = React.useState('');
  const [passwordOld, setPasswordOld] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [errorRePass, setErrorRePass] = React.useState(false);
  const [errorRePass2, setErrorRePass2] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const userInfo = useSelector(state => state.user.user);
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    setLoading(true);
    if (password.length < 6) {
      setErrorPassword(true);
      return;
    }
    if (rePassword.length < 6) {
      setErrorRePass(true);
      return;
    }
    if (rePassword !== password) {
      setErrorRePass2(true);
      return;
    }
    setErrorPassword(false);
    setErrorRePass2(false);
    setErrorRePass(false);
    try {
      const res = await axios.put(
        `https://beemarket.herokuapp.com/api/user/password/${userInfo.id}`,
        {
          passwordOld: passwordOld,
          password: password,
        },
      );
      if (res.data.password === false) {
        Alert.alert('Mật khẩu cũ chưa chính xác');
        return;
      }
      setLoading(false);
      Alert.alert('Đổi mật khẩu thành công');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.text}>Đổi mật khẩu</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.jpg')}
      />

      <View style={styles.inputText}>
        <Input
          style={styles.textPass}
          placeholder="Mật khẩu cũ"
          value={passwordOld}
          onChangeText={text => {
            setPasswordOld(text);
          }}
          secureTextEntry
          InputLeftElement={
            <Icon
              as={<FontAwesome name="lock" />}
              size={6}
              ml="2"
              color="black"
            />
          }
          variant="underlined"
        />
        {errorPassword && (
          <Text style={styles.textError}>Mật khẩu phải trên 6 ký tự</Text>
        )}
      </View>

      <View style={styles.inputText}>
        <Input
          style={styles.textPass}
          placeholder="Mật khẩu mới"
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          secureTextEntry
          InputLeftElement={
            <Icon
              as={<FontAwesome name="lock" />}
              size={6}
              ml="2"
              color="black"
            />
          }
          variant="underlined"
        />
        {errorPassword && (
          <Text style={styles.textError}>Mật khẩu phải trên 6 ký tự</Text>
        )}
      </View>

      <View style={styles.inputTextPass}>
        <Input
          style={styles.textPass}
          placeholder="Nhập lại mật khẩu mới"
          secureTextEntry
          value={rePassword}
          onChangeText={text => setRePassword(text)}
          InputLeftElement={
            <Icon
              as={<FontAwesome name="lock" />}
              size={6}
              ml="2"
              color="black"
            />
          }
          variant="underlined"
        />
        {errorRePass && (
          <Text style={styles.textError}>Mật khẩu phải trên 6 ký tự</Text>
        )}
        {errorRePass2 && (
          <Text style={styles.textError}>
            Hai mật khẩu chưa trùng khớp với nhau
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.buttonOnclick} onPress={onSubmit}>
        <Text>Đổi mật khẩu</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator color="#E67E21" size="large" /> : <></>}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  buttonOnclick: {
    marginTop: 100,
    width: windowWidth - 200,
    height: 40,
    backgroundColor: '#E67E21',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
  },
  textError: {color: 'red'},
  inputText: {
    fontSize: 16,
    width: windowWidth - 30,
    alignSelf: 'center',
    marginTop: 30,
  },
  logo: {
    width: windowWidth / 2 + 200,
    height: windowHeight / 4,
  },
  inputTextPass: {
    width: windowWidth - 30,
    alignSelf: 'center',
    marginTop: 30,
  },
  textPass: {fontSize: 16},
});
