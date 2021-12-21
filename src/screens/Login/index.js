/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
// import {useForm, Controller} from 'react-hook-form';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {API} from '../../utils/constant';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {onLogin, getUser} from '../../redux/action/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Input, Icon} from 'native-base';

const regexEmail = /^[\w-\._\+%]+@fpt.edu.vn/;

const validateEmail = email => {
  // console.log(String(email).toLowerCase().match(regexEmail));
  return email.toLowerCase().match(regexEmail);
};

const Login = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  React.useEffect(() => {
    if (route.params) {
      setEmail(route.params.email);
      setPassword(route.params.password);
    }
  }, [route.params]);

  const showToast = () => {
    Toast.show({
      topOffset: windowHeight / 40,
      type: 'success',
      text1: 'Tài khoản hoặc mật khẩu không chính xác 👋',
    });
  };
  const dispatch = useDispatch();

  const checkUser = useCallback(async () => {
    const user = await AsyncStorage.getItem('user');
    dispatch(getUser(JSON.parse(user)));
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, [navigation, dispatch]);

  const onSubmit = async () => {
    if (!validateEmail(email)) {
      setErrorEmail(true);
      return;
    }
    if (password.length < 6) {
      setErrorPassword(true);
      return;
    }
    if (validateEmail(email)) {
      setLoading(true);
      try {
        const res = await axios.post(`${API}auth/login`, {
          email: email,
          password: password,
        });
        const user = res.data;
        dispatch(onLogin({isLogin: true, user}));
        checkUser();
      } catch (error) {
        showToast();
      }
      setLoading(false);
    } else {
      Alert.alert('Vui lòng kiểm tra lại thông tin đăng nhập');
    }
  };
  React.useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <ScrollView style={{backgroundColor: '#FFFF'}}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.jpg')}
        />

        <Text
          style={{
            fontSize: 18,
            color: '#E67E21',
            marginBottom: 40,
            fontFamily: '../../assets/fonts/GreatVibes',
          }}>
          ĐĂNG TIN MIỄN PHÍ - TÍN TIN NHƯ Ý
        </Text>

        <View style={styles.inputText}>
          <Input
            style={styles.textPass}
            placeholder="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            InputLeftElement={
              <Icon
                as={<FontAwesome name="user" />}
                size={6}
                ml="2"
                color="black"
              />
            }
            variant="underlined"
          />
          {errorEmail && (
            <Text style={{color: 'red'}}>Vui lòng sử dụng mail của trường</Text>
          )}
        </View>

        <View style={styles.inputTextPass}>
          <Input
            style={styles.textPass}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
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
            <Text style={{color: 'red'}}>Mật khẩu phải trên 6 ký tự</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.forgotPass}>Quên mật khẩu ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF'}}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.textNotHaveAccount}>
            Bạn chưa có tài khoản? Đăng Ký
          </Text>
        </TouchableOpacity>
        {loading ? <ActivityIndicator color="#E67E21" size="large" /> : <></>}
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: windowWidth / 2 + 200,
    height: windowHeight / 4,
    marginTop: windowHeight / 30,
  },
  inputText: {
    width: windowWidth - 50,
    height: windowHeight / 15,
    marginTop: 20,
  },
  inputTextPass: {
    width: windowWidth - 50,
    height: windowHeight / 15,
    marginTop: 25,
  },
  forgotPass: {
    fontSize: 22,
    marginTop: 20,
    marginLeft: windowWidth - 210,
    color: '#E67E21',
  },
  button: {
    width: windowWidth - 160,
    height: windowHeight / 12,
    backgroundColor: '#E67E21',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
  },
  textNotHaveAccount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E67E21',
    marginTop: 30,
  },
  errorTitleEmail: {
    color: '#ff0000',
    marginLeft: windowWidth / 2,
    position: 'absolute',
    top: 50,
  },
  textPass: {
    fontSize: 16,
  },
});
