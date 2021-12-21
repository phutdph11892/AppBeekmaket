/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/core';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {onEdit} from '../../../redux/action/userAction';
import axios from 'axios';
import {API} from '../../../utils/constant';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import storage from '@react-native-firebase/storage';

const EditAccount = () => {
  const userInfo = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [images, setImages] = React.useState(userInfo.avatar);

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);
  const [loading, setLoading] = React.useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    await axios.put(`${API}user/${userInfo.id}`, {
      address: data.address,
      name: data.fullname,
      phone: data.phone,
      avatar: images,
    });
    reset({
      firstName: '',
      address: '',
      phone: '',
    });
    dispatch(onEdit(data));
    setLoading(false);
    Alert.alert('Sua thong tin thanh cong');
  };

  const navigation = useNavigation();

  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.7,
    }).then(async image => {
      setLoadingImg(true);
      let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      const storageRef = storage().ref(filename);
      const task = storageRef.putFile(imageUri);
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
      try {
        await task;
        const url = await storageRef.getDownloadURL();
        setImages(url);
        bs.current.snapTo(1);
        setLoadingImg(false);
      } catch (e) {
        console.log(e);
        return null;
      }
    });
  };

  const choosePhotoFromLibrary = async () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.7,
    }).then(async image => {
      setLoadingImg(true);
      let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      const storageRef = storage().ref(filename);
      const task = storageRef.putFile(imageUri);
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      try {
        await task;
        const url = await storageRef.getDownloadURL();
        bs.current.snapTo(1);
        setImages(url);
        setLoadingImg(false);
      } catch (e) {
        console.log(e);
        return null;
      }
    });
  };

  const renderInner = () => (
    <ScrollView style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Tải lên </Text>
        <Text style={styles.panelSubtitle}>Chọn ảnh bạn muốn tải lên</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Chụp ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Chọn từ thư viện</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Trở về</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderHeader = () => (
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={styles.accountContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Main', {screen: 'Account'});
          }}>
          <Icon name={'chevron-left'} style={styles.inputIcon} />
        </TouchableOpacity>
        <View
          style={{
            width: 100,
            height: 100,
            marginTop: 72,
            alignItems: 'center',
          }}>
          <Image style={styles.avatar} source={{uri: images}} />
          <>
            {loadingImg ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{width: 50, height: 40}}>
                  <ActivityIndicator
                    color="black"
                    accessible={loading}
                    size="large"
                  />
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => bs.current.snapTo(0)}
                style={{
                  backgroundColor: 'black',
                  opacity: 0.7,
                  position: 'absolute',
                  bottom: 1,
                  width: 68,
                  alignItems: 'center',
                  borderBottomRightRadius: 50,
                  borderBottomLeftRadius: 50,
                }}>
                <AntDesign name="camera" size={25} color="#ffffff" />
              </TouchableOpacity>
            )}
          </>
        </View>
        <Text style={styles.text}>{userInfo.name}</Text>
        <Text style={{fontSize: 13, color: '#FFFFFF'}}>
          {userInfo.email ?? ''}
        </Text>
      </View>

      <View style={[styles.inputContainer, {paddingTop: 20}]}>
        <Text style={styles.label}>Họ Tên</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{width: windowWidth - 16, alignSelf: 'center'}}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Họ tên"
              outlineColor="#E67E21"
              activeOutlineColor="#E67E21"
            />
          )}
          name="fullname"
          defaultValue=""
        />
        {errors.fullname && <Text>Vui lòng không để trống</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{width: windowWidth - 16, alignSelf: 'center'}}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Địa chỉ"
              outlineColor="#E67E21"
              activeOutlineColor="#E67E21"
            />
          )}
          name="address"
          defaultValue=""
        />
        {errors.address && <Text>Vui lòng không để trống</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{width: windowWidth - 16, alignSelf: 'center'}}
              value={value}
              keyboardType={'phone-pad'}
              onChangeText={onChange}
              onBlur={onBlur}
              mode="outlined"
              label="Số điện thoại"
              outlineColor="#E67E21"
              activeOutlineColor="#E67E21"
            />
          )}
          name="phone"
          defaultValue=""
        />
        {errors.phone && <Text>Vui lòng không để trống</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.label, {color: '#fff'}]}>Lưu</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator color="#E67E21" size="large" /> : <></>}
    </ScrollView>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    flexDirection: 'column',
    width: windowWidth,
    height: 230,
    alignItems: 'center',
    backgroundColor: '#E67E21',
    marginTop: -40,
  },
  buttonContainer: {
    position: 'absolute',
    top: 51.5,
    left: 15.5,
    width: windowWidth / 25,
    height: windowHeight / 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: windowWidth / 40,
    padding: 8,
  },
  text: {
    fontSize: 23,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  textInput: {
    width: windowWidth - 50,
    color: '#000',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 25,
    paddingLeft: windowHeight / 10,
    fontSize: 20,
  },
  button: {
    width: 170,
    height: 45,
    backgroundColor: '#E67E21',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  inputIcon: {
    fontSize: windowWidth / 15,
    color: '#FFFFFF',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },
  panelHeader: {
    alignItems: 'center',
    marginTop: 90,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: -5,
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
});
