import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import axios from 'axios';
import {API, checkEmailRegister} from '../../utils/constant';

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);

  const onSubmit = async () => {
    if (!checkEmailRegister(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    const res = await axios.post(`${API}email/forgot`, {
      email: email.trim(),
    });
    console.log(res.data);
    if (res.data.isExist === false) {
      Alert.alert('Tài khoản không tồn tại');
      return;
    }
    navigation.navigate('EnterCode', {
      code: res.data.code,
      id: res.data.userID,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'chevron-left'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Quên mật khẩu</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.title}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.jpg')}
          />
          <Text style={styles.textTitle}>Chúng tôi gửi OTP vào</Text>
          <Text style={styles.textTitleEmai}>email của bạn !</Text>
          <TextInput
            style={styles.inputText}
            mode="outlined"
            label="Email khôi phục"
            value={email}
            onChangeText={text => setEmail(text)}
            outlineColor="#E67E21"
            activeOutlineColor="#E67E21"
          />
          {emailError && (
            <Text style={{color: 'red', marginTop: 20}}>
              Vui lòng sử dụng mail của trường
            </Text>
          )}
          <TouchableOpacity style={styles.buttonOnclick} onPress={onSubmit}>
            <Text>Gửi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  scrollView: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    top: windowHeight / 16,
    marginHorizontal: 20,
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
  title: {
    flexDirection: 'column',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  logo: {
    width: windowWidth / 2 + 200,
    height: windowHeight / 4,
  },
  inputText: {
    height: 45,
    width: windowWidth - 30,
    alignSelf: 'center',
  },
  buttonOnclick: {
    marginTop: 100,
    width: windowWidth - 200,
    height: 40,
    backgroundColor: '#E67E21',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textTitle: {
    fontSize: 24,
    marginTop: 50,
  },
  textTitleEmai: {fontSize: 24},
});
