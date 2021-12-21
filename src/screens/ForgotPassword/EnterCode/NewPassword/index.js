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
import {windowHeight, windowWidth} from '../../../../utils/Dimensions';
import axios from 'axios';

const EnterCode = ({route}) => {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [errorRePass, setErrorRePass] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [errorRePass2, setErrorRePass2] = React.useState(false);

  const onSubmit = async () => {
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
    setErrorRePass2(false);
    setErrorPassword(false);
    setErrorRePass(false);
    try {
      const res = await axios.put(
        `https://beemarket.herokuapp.com/api/user/password/${route.params.id}`,
        {
          password: password,
        },
      );
      if (res.data.password === false) {
        Alert.alert('Mật khẩu cũ chưa chính xác');
        return;
      }
      Alert.alert('Đổi mật khẩu thành công');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
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
            source={require('../../../../assets/images/logo.jpg')}
          />
          <Text style={styles.textTitle}>Vui lòng nhập mật khẩu mới !</Text>
          <TextInput
            style={styles.inputText}
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
            label="Mật khẩu mới"
            outlineColor="#E67E21"
            activeOutlineColor="#E67E21"
          />

          {errorPassword && (
            <Text style={{color: 'red', marginTop: 20}}>
              Mật khẩu phải trên 6 ký tự
            </Text>
          )}

          <TextInput
            style={styles.inputText}
            mode="outlined"
            label="Xác nhận mật khẩu"
            value={rePassword}
            secureTextEntry
            onChangeText={text => setRePassword(text)}
            outlineColor="#E67E21"
            activeOutlineColor="#E67E21"
          />

          {errorRePass && (
            <Text style={{color: 'red', marginTop: 20}}>
              Mật khẩu phải trên 6 ký tự
            </Text>
          )}
          {errorRePass2 && (
            <Text style={{color: 'red', marginTop: 20}}>
              Hai mật khẩu chưa trùng khớp với nhau
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
export default EnterCode;
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
    marginTop: 8,
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
});
