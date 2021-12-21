/* eslint-disable react-native/no-inline-styles */
// import React, {useState, useRef} from 'react';
// import {ScrollView} from 'react-native';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
// } from 'react-native';
// import {Input} from 'react-native-elements';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {windowHeight, windowWidth} from '../../utils/Dimensions';
// import {API, checkEmailRegister} from '../../utils/constant';
// import axios from 'axios';
// import Animated from 'react-native-reanimated';
// import ImagePicker from 'react-native-image-crop-picker';
// import storage from '@react-native-firebase/storage';
// import BottomSheet from 'reanimated-bottom-sheet';
// import {useForm, Controller} from 'react-hook-form';
// import Toast from 'react-native-toast-message';
// //import {useNavigation} from '@react-navigation/core';
// const Register = () => {
//   // const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [retypePassword, setRetypePassword] = useState('');
//   const bs = useRef(null);
//   const fall = new Animated.Value(1);
//   const [images, setImages] = useState([]);

//   const showToast = () => {
//     Toast.show({
//       topOffset: windowHeight / 2,
//       type: 'success',
//       text1: 'Gmail phải là gmail abc@fpt.edu.vn 👋',
//     });
//   };
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm();

//   const onSubmit = async data => {
//     if (checkEmailRegister(data.email)) {
//       console.log('Email ok');
//       try {
//         await axios.post(`${API}auth/register`, {
//           name: data.name,
//           email: data.email,
//           password: data.password,
//           avatar: images[0] ?? '',
//           isAdmin: false,
//           address: data.address,
//           phone: data.phone,
//           place: 'Ha Noi',
//         });
//         setLoading(true);
//       } catch (error) {
//         console.log('loi');
//       }
//     } else {
//       showToast();
//       console.log('Email loi');
//     }
//   };

//   const takePhotoFromCamera = async () => {
//     ImagePicker.openCamera({
//       cropping: true,
//       compressImageQuality: 0.7,
//     }).then(async image => {
//       let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
//       const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
//       const extension = filename.split('.').pop();
//       const name = filename.split('.').slice(0, -1).join('.');
//       filename = name + Date.now() + '.' + extension;
//       const storageRef = storage().ref(filename);
//       const task = storageRef.putFile(imageUri);
//       task.on('state_changed', taskSnapshot => {
//         console.log(
//           `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
//         );
//       });

//       try {
//         await task;
//         const url = await storageRef.getDownloadURL();
//         setImages([...images, url]);
//         bs.current.snapTo(1);
//       } catch (e) {
//         console.log(e);
//         return null;
//       }
//     });
//   };

//   const choosePhotoFromLibrary = async () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       compressImageQuality: 0.7,
//     }).then(async image => {
//       let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
//       const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
//       const extension = filename.split('.').pop();
//       const name = filename.split('.').slice(0, -1).join('.');
//       filename = name + Date.now() + '.' + extension;
//       const storageRef = storage().ref(filename);
//       const task = storageRef.putFile(imageUri);
//       task.on('state_changed', taskSnapshot => {
//         console.log(
//           `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
//         );
//       });

//       try {
//         await task;
//         const url = await storageRef.getDownloadURL();
//         bs.current.snapTo(1);
//         setImages([...images, url]);
//       } catch (e) {
//         console.log(e);
//         return null;
//       }
//     });
//   };

//   const renderInner = () => (
//     <ScrollView style={styles.panel}>
//       <View style={styles.panelContainer}>
//         <Text style={styles.panelTitle}>Tải lên </Text>
//         <Text style={styles.panelSubtitle}>Chọn ảnh bạn muốn tải lên</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.panelButton}
//         onPress={takePhotoFromCamera}>
//         <Text style={styles.panelButtonTitle}>Chụp ảnh</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.panelButton}
//         onPress={choosePhotoFromLibrary}>
//         <Text style={styles.panelButtonTitle}>Chọn từ thư viện</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.panelButton}
//         onPress={() => bs.current.snapTo(1)}>
//         <Text style={styles.panelButtonTitle}>Trở về</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderHeader = () => (
//     <View style={styles.panelHeader}>
//       <View style={styles.panelHandle} />
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <BottomSheet
//         ref={bs}
//         snapPoints={[330, 0]}
//         renderContent={renderInner}
//         renderHeader={renderHeader}
//         initialSnap={1}
//         callbackNode={fall}
//         enabledGestureInteraction={true}
//       />
//       <Image
//         style={styles.logo}
//         source={require('../../assets/images/logo.png')}
//       />
//       <Text style={styles.textRegisterFree}>
//         ĐĂNG TIN MIỄN PHÍ - TÍN ĐỒ NHƯ Ý
//       </Text>

//       <View style={styles.inputText}>
//         <Controller
//           control={control}
//           rules={{
//             required: true,
//           }}
//           render={({field: {onChange, onBlur, value}}) => (
//             <Input
//               placeholder="Email"
//               leftIcon={<FontAwesome name="user" size={24} color="black" />}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="email"
//         />
//         {errors.email && <Text>This is required.</Text>}
//       </View>

//       <View style={styles.inputText}>
//         <Controller
//           control={control}
//           rules={{
//             required: true,
//           }}
//           render={({field: {onChange, onBlur, value}}) => (
//             <Input
//               placeholder="Ho Ten"
//               leftIcon={<FontAwesome name="user" size={24} color="black" />}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="name"
//         />
//         {errors.name && <Text>This is required.</Text>}
//       </View>

//       <View style={styles.inputText}>
//         <Controller
//           control={control}
//           rules={{
//             required: true,
//           }}
//           render={({field: {onChange, onBlur, value}}) => (
//             <Input
//               leftIcon={
//                 <FontAwesome5 name="phone-alt" size={24} color="black" />
//               }
//               keyboardType="numeric"
//               maxLength={11}
//               placeholder="Phone"
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="phone"
//         />
//         {errors.phone && <Text>This is required.</Text>}
//       </View>

//       <View style={styles.inputText}>
//         <Controller
//           control={control}
//           rules={{
//             required: true,
//           }}
//           render={({field: {onChange, onBlur, value}}) => (
//             <Input
//               placeholder="Quê quán"
//               leftIcon={
//                 <FontAwesome5 name="map-marker-alt" size={24} color="black" />
//               }
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="address"
//         />
//         {errors.address && <Text>This is required.</Text>}
//       </View>

//       <View style={styles.inputText}>
//         <Controller
//           control={control}
//           rules={{
//             required: true,
//             minLength: 6,
//             maxLength: 16,
//           }}
//           render={({field: {onChange, onBlur, value}}) => (
//             <Input
//               placeholder="Mật Khẩu"
//               leftIcon={<FontAwesome5 name="lock" size={24} color="black" />}
//               secureTextEntry
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="password"
//         />
//         {errors.address && <Text>This is required.</Text>}
//       </View>

//       <View style={styles.inputText}>
//         <Input
//           secureTextEntry
//           leftIcon={<FontAwesome5 name="lock" size={24} color="black" />}
//           placeholder="Nhập lại mật khẩu"
//           value={retypePassword}
//           onChangeText={text => setRetypePassword(text)}
//           style={{height: windowHeight / 16}}
//         />
//       </View>
//       <View style={[styles.inputContainer]}>
//         <TouchableOpacity
//           style={styles.buttonContainerDang}
//           onPress={() => bs.current.snapTo(0)}>
//           <Text style={styles.titleBtnImage}>Bấm vào đây để chọn ảnh</Text>
//         </TouchableOpacity>
//       </View>
//       {images.length !== 0 && (
//         <ScrollView>
//           {images.map((item, index) => (
//             <Image
//               source={{uri: item}}
//               style={styles.imageAvatar}
//               key={index}
//             />
//           ))}
//         </ScrollView>
//       )}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
//         <Text style={styles.titleBtnRegister}>Đăng ký</Text>
//       </TouchableOpacity>
//       <Toast ref={ref => Toast.setRef(ref)} />
//       {loading ? <ActivityIndicator color="#00ff00" size="large" /> : <></>}
//       <Text style={styles.titleNull} />
//     </ScrollView>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   logo: {
//     width: windowWidth / 2 + 200,
//     height: windowHeight / 4,
//     marginTop: windowHeight / 30,
//   },
//   inputText: {
//     width: windowWidth - 50,
//     height: windowHeight / 16,
//     marginTop: 20,
//     alignSelf: 'center',
//   },
//   button: {
//     width: windowWidth - 160,
//     height: windowHeight / 14,
//     backgroundColor: '#E67E21',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//     marginTop: windowHeight / 15,
//     alignSelf: 'center',
//   },
//   textRegisterFree: {
//     fontSize: 18,
//     color: '#E67E21',
//     alignSelf: 'center',
//   },
//   titleBtnRegister: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   inputContainer: {
//     padding: 10,
//     width: '95%',
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   panelHeader: {
//     alignItems: 'center',
//   },
//   panelHandle: {
//     width: 40,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#00000040',
//     marginBottom: -5,
//   },
//   imageAvatar: {
//     width: 100,
//     height: 100,
//     marginHorizontal: 7,
//     borderRadius: 5,
//     marginLeft: 40,
//   },
//   titleBtnImage: {
//     color: '#000',
//     fontWeight: '700',
//     marginLeft: 20,
//   },
//   panel: {
//     backgroundColor: '#FFFFFF',
//     paddingTop: 5,
//   },
//   panelTitle: {
//     fontSize: 15,
//     height: 20,
//   },
//   panelSubtitle: {
//     fontSize: 14,
//     color: 'gray',
//     height: 30,
//     marginBottom: 10,
//   },
//   panelButton: {
//     width: '80%',
//     alignSelf: 'center',
//     borderRadius: 10,
//     backgroundColor: '#E67E21',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   panelContainer: {
//     alignItems: 'center',
//   },
//   titleNull: {
//     width: windowWidth,
//     height: windowHeight / 15,
//   },
// });
import React, {useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {API} from '../../utils/constant';
import axios from 'axios';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {CheckIcon, Select} from 'native-base';
import {Input, Icon} from 'native-base';

const regexEmail = /^[\w-\._\+%]+@fpt.edu.vn/;

const validateEmail = email => {
  // console.log(String(email).toLowerCase().match(regexEmail));
  return email.toLowerCase().match(regexEmail);
};

const validatePhone = phone => {
  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return regexPhone.test(phone);
};

const Register = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const place = [
    'Cơ sở Hà Nội',
    'Cơ sở Đà Nẵng',
    'Cơ sở Tây Nguyên',
    'Cơ sở Hồ Chí Minh',
    'Cơ sở Cần thơ',
  ];

  const [selectPlace, setPlaceSelect] = useState();

  const onSubmit = async data => {
    if (!validateEmail(data.email)) {
      setErrorEmail(true);
      return;
    }
    if (!validatePhone(data.phone)) {
      setErrorPhone(true);
      return;
    }
    setErrorEmail(false);
    setErrorPhone(false);
    setLoading(true);
    await axios.post(`${API}auth/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar:
        'https://cdn.nap.edu.vn/avatar/202192/trend-avatar-facebook-1-1630566628626.jpg',
      isAdmin: false,
      address: data.address,
      phone: data.phone,
      isBlocked: false,
      place: data.place,
    });
    setLoading(false);
    Alert.alert('Đắng kí thành công,đang chuyển tới màn hình đăng nhập');
    navigation.push('Login', {email: data.email, password: data.password});
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 150, height: 150}}>
            <ActivityIndicator
              color="#E67E21"
              accessible={loading}
              size="large"
            />
          </View>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.jpg')}
          />
          <Text style={styles.textRegisterFree}>
            ĐĂNG TIN MIỄN PHÍ - TÍN TIN NHƯ Ý
          </Text>

          <View style={styles.inputText}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  style={{fontSize: 16}}
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="envelope" />}
                      size={6}
                      ml="2"
                      color="black"
                    />
                  }
                  variant="underlined"
                />
              )}
              name="email"
            />
            {errors.email && <Text>Đây là trường bắt buộc.</Text>}
            {errorEmail && (
              <Text style={{color: 'red'}}>
                Vui lòng sử dụng mail của trường
              </Text>
            )}
          </View>

          <View style={styles.inputText}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  style={{fontSize: 16}}
                  placeholder="Họ Tên"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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
              )}
              name="name"
            />
            {errors.name && <Text>Đây là trường bắt buộc.</Text>}
          </View>

          <View style={styles.inputText}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  style={{fontSize: 16}}
                  keyboardType="numeric"
                  maxLength={11}
                  placeholder="Số điện thoại"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="phone" />}
                      size={6}
                      ml="2"
                      color="black"
                    />
                  }
                  variant="underlined"
                />
              )}
              name="phone"
            />
            {errors.phone && <Text>Đây là trường bắt buộc.</Text>}
            {errorPhone && (
              <Text style={{color: 'red'}}>
                Vui lòng sử dụng đúng số điện thoại
              </Text>
            )}
          </View>

          <View style={styles.inputText}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  style={{fontSize: 16}}
                  placeholder="Quê quán"
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="map-marker" />}
                      size={6}
                      ml="2"
                      color="black"
                    />
                  }
                  variant="underlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="address"
            />
            {errors.address && <Text>Đây là trường bắt buộc.</Text>}
          </View>

          <View style={styles.inputText}>
            <Text style={{marginLeft: 10, fontSize: 17, fontWeight: 'bold'}}>
              Cơ sở
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Select
                  selectedValue={selectPlace}
                  defaultValue={selectPlace}
                  placeholder={'Chọn cơ sở'}
                  minWidth="200"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => {
                    setPlaceSelect(itemValue);
                    setValue('place', itemValue);
                  }}>
                  {place.map((item, index) => (
                    <Select.Item label={item} value={item} key={index} />
                  ))}
                </Select>
              )}
              name="place"
            />
          </View>

          <View style={styles.inputPass}>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải hơn 6 ký tự ',
                },
                maxLength: {
                  value: 16,
                  message: 'Mật khẩu phải ít hơn 16 ký tự ',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  style={{fontSize: 16, marginTop: 10}}
                  placeholder="Mật Khẩu"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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
              )}
              name="password"
            />
            {errors.password && <Text>Mật khẩu phải hơn 6 ký tự</Text>}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.titleBtnRegister}>Đăng ký</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{color: 'black', alignSelf: 'center', marginTop: 30}}
            onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 17}}>Đã có tài khoản? Đăng nhập thôi</Text>
          </TouchableOpacity>
          <Text style={styles.titleNull} />
        </ScrollView>
      )}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  logo: {
    width: windowWidth / 2 + 200,
    height: windowHeight / 4,
    marginTop: windowHeight / 30,
  },
  inputText: {
    width: windowWidth - 50,
    height: windowHeight / 16,
    marginTop: 20,
    alignSelf: 'center',
  },
  inputPass: {
    width: windowWidth - 50,
    height: windowHeight / 16,
    marginTop: 30,
    alignSelf: 'center',
  },
  button: {
    width: windowWidth - 160,
    height: windowHeight / 14,
    backgroundColor: '#E67E21',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: windowHeight / 15,
    alignSelf: 'center',
  },
  textRegisterFree: {
    fontSize: 18,
    color: '#E67E21',
    alignSelf: 'center',
  },
  titleBtnRegister: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputContainer: {
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: -5,
  },
  imageAvatar: {
    width: 100,
    height: 100,
    marginHorizontal: 7,
    borderRadius: 5,
    marginLeft: 40,
  },
  titleBtnImage: {
    color: '#000',
    fontWeight: '700',
    marginLeft: 20,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },
  panelTitle: {
    fontSize: 15,
    height: 20,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#E67E21',
    alignItems: 'center',
    marginVertical: 8,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelContainer: {
    alignItems: 'center',
  },
  titleNull: {
    width: windowWidth,
    height: windowHeight / 15,
  },
});
