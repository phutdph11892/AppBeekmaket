/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {API} from '../../utils/constant';
import {View, Select, CheckIcon} from 'native-base';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {useForm, Controller} from 'react-hook-form';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import storage from '@react-native-firebase/storage';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const validatePhone = phone => {
  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return regexPhone.test(phone);
};

const EditPost = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const userInfo = useSelector(state => state.user.user);
  const [selectedCategory, setSelectedCategory] = useState();
  const bs = useRef(null);
  const fall = new Animated.Value(1);
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const [loadingImg, setLoadingImg] = useState(false);

  const [errorPhone, setErrorPhone] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = async data => {
    if (!validatePhone(data.phone)) {
      setErrorPhone(true);
      return;
    }
    setLoading(true);
    setErrorPhone(false);
    await axios.put(`${API}post/${route.params.item._id}`, {
      title: data.title,
      price: Number(data.price),
      category: data.category,
      image: images[0] ?? '',
      images: images,
      description: data.description,
      phone: data.phone,
      address: data.address,
      userID: userInfo.id,
    });
    setLoading(false);
    reset({
      title: '',
      price: '',
      category: '',
      description: '',
      phone: '',
      address: '',
    });
    setImages([]);
    Alert.alert('Bạn đã sửa tin thành công');
  };

  React.useEffect(() => {
    if (route.params) {
      setValue('title', route.params.item.title);
      setValue('price', route.params.item.price);
      setValue('category', route.params.item.category);
      setValue('address', route.params.item.address);
      setValue('phone', route.params.item.phone);
      setValue('description', route.params.item.description);
      setImages(route.params.item.images);
    }
  }, [route.params, setValue]);

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
        setImages([...images, url]);
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
        setImages([...images, url]);
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

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${API}category`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name={'chevron-left'} size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.text}>Sửa Tin</Text>
        </View>

        <View style={[styles.inputContainer, {paddingTop: 0}]}>
          <Text style={styles.title}>Danh mục</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {value}}) => {
              return (
                <Select
                  selectedValue={selectedCategory}
                  placeholder={'Chọn danh mục'}
                  minWidth="200"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => {
                    setSelectedCategory(itemValue);
                    setValue('category', itemValue);
                  }}>
                  {categories.map((item, index) => (
                    <Select.Item
                      label={item.name}
                      value={item._id}
                      key={index}
                    />
                  ))}
                </Select>
              );
            }}
            name="category"
          />
        </View>

        <View style={[styles.inputContainer, {paddingTop: 0}]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{height: 45}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Địa chỉ"
                outlineColor="#E67E21"
                activeOutlineColor="#E67E21"
              />
            )}
            name="address"
          />
          {errors.address && <Text>Đây là trường bắt buộc.</Text>}
        </View>

        <View style={[styles.inputContainer, {paddingTop: 0}]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{height: 45}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Tiêu đề"
                outlineColor="#E67E21"
                activeOutlineColor="#E67E21"
              />
            )}
            name="title"
          />
          {errors.title && <Text>Đây là trường bắt buộc.</Text>}
        </View>

        <View style={[styles.inputContainer, {paddingTop: 0}]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{height: 45}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ? value.toString() : value}
                keyboardType="numeric"
                maxLength={8}
                mode="outlined"
                label="Giá"
                outlineColor="#E67E21"
                activeOutlineColor="#E67E21"
              />
            )}
            name="price"
          />
          {errors.price && <Text>Đây là trường bắt buộc.</Text>}
        </View>

        <View style={[styles.inputContainer, {paddingTop: 0}]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{height: 45}}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                maxLength={11}
                mode="outlined"
                label="Số điện thoại"
                outlineColor="#E67E21"
                activeOutlineColor="#E67E21"
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

        <View style={[styles.inputContainer, {marginTop: 10}]}>
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
                style={styles.buttonContainerDang}
                onPress={() => bs.current.snapTo(0)}>
                <Text style={{color: '#FFF', fontWeight: '700'}}>
                  Bấm vào đây để chọn ảnh
                </Text>
              </TouchableOpacity>
            )}
          </>
        </View>
        {images.length !== 0 && (
          <ScrollView horizontal style={{marginLeft: 20, marginTop: 5}}>
            {images.map((item, index) => (
              <View
                style={{width: 150, height: 150, marginHorizontal: 7}}
                key={index}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 5,
                  }}
                />
                <Text
                  style={{position: 'absolute', top: 0, right: 5}}
                  onPress={() =>
                    setImages(images.filter(value => value !== item))
                  }>
                  X
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={[styles.inputViewContainer, {marginTop: 0}]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                numberOfLines={4}
                multiline
                editable
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                label="Mô tả sản phẩm"
                outlineColor="#E67E21"
                activeOutlineColor="#E67E21"
              />
            )}
            name="description"
          />
          {errors.description && <Text>Đây là trường bắt buộc.</Text>}
        </View>
        <>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: 100, height: 100}}>
                <ActivityIndicator
                  color="black"
                  accessible={loading}
                  size="large"
                />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                marginBottom: 160,
                marginTop: 30,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
                backgroundColor: '#E67E21',
              }}>
              <Text style={{color: '#FFF', fontWeight: '700'}}>Sửa tin</Text>
            </TouchableOpacity>
          )}
        </>
        <Text style={styles.titleNull} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPost;
const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: 90,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
  },
  panelHeader: {
    alignItems: 'center',
    marginTop: 50,
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
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    marginLeft: 10,
  },
  scrollView: {
    width: windowWidth,
    height: windowHeight,
  },
  viewContainer: {
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: windowWidth / 15,
    color: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  inputContainer: {
    padding: 10,
    width: '95%',
    alignSelf: 'center',
  },
  inputPicker: {
    width: '100%',
    height: 30,
    borderRadius: 20,
    borderColor: '#E67E21',
    borderWidth: 1,
    alignSelf: 'center',
  },
  inputEmail: {
    width: '100%',
    height: 30,
    color: '#000',
    borderRadius: 20,
    borderColor: '#E67E21',
    borderWidth: 1,
    alignSelf: 'center',
    fontSize: 12,
    padding: 5,
    paddingLeft: 8,
  },
  input: {
    width: windowWidth - 50,
    height: 200,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E67E21',
    alignItems: 'flex-start',
  },
  textInput: {
    fontSize: 22,
    color: '#E67E21',
  },
  inputViewContainer: {
    width: windowWidth - 50,
    alignSelf: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#E67E21',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerDang: {
    width: windowWidth - 50,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#E67E21',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputDescripTion: {
    width: '100%',
    height: 100,
    color: '#000',
    borderRadius: 20,
    borderColor: '#E67E21',
    borderWidth: 1,
    fontSize: 12,
    textAlignVertical: 'top',
    padding: 8,
    lineHeight: 23,
  },
  titleNull: {
    width: windowWidth,
    height: windowHeight / 15,
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
});
