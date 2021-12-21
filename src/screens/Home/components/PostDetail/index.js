/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View, Text} from 'native-base';
import {Avatar, ListItem} from 'react-native-elements';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {format, register} from 'timeago.js';
import {windowWidth} from '../../../../utils/Dimensions';
import formatMoney from '../../../../utils/formatMoney';
import {useNavigation} from '@react-navigation/core';
import localeFunc from '../../../../utils/formatTime';
import {useDispatch, useSelector} from 'react-redux';
import {addSavePost} from '../../../../redux/action/savePostAction';
import axios from 'axios';
import {API} from '../../../../utils/constant';
import Toast from 'react-native-toast-message';

register('my-locale', localeFunc);

const PostDetail = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const item = route.params.item.item;
  const user = item.userID;
  const userInfo = useSelector(state => state.user.user);
  const [count, setCount] = React.useState(0);

  const showToast = () => {
    Toast.show({
      topOffset: 60,
      text2: 'Bạn đã thêm tin này vào tin lưu 👋',
    });
  };

  const dataSavePost = {
    user: userInfo.id,
    title: item.title,
    price: item.price,
    category: item.category,
    image: item.image,
    images: item.images,
    description: item.description,
    phone: item.phone,
    address: item.address,
    userID: user._id,
  };

  const addSavePostToDb = async data => {
    const res = await axios.post(`${API}savepost`, data);
    dispatch(addSavePost(res.data));
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API}post/userPost/${user._id}`);
      setCount(res.data.postCount);
    };
    getData();
  }, [user._id]);

  const handleAddConversation = async () => {
    if (user._id === userInfo.id) {
      return console.log('day la chinh ban');
    }
    //check xem co nhan tin chua
    const res = await axios.get(`${API}conversation/checkConversation`, {
      params: {userID: userInfo.id, receiverID: user._id},
    });
    const data = res.data;
    if (data.length > 0) {
      const member = data[0].members.find(value => value !== userInfo.id);
      const response = await axios.get(`${API}user/${member}`);
      const memberInfo = response.data;
      return navigation.navigate('Messages', {
        id: data[0]._id,
        avatar: memberInfo !== undefined ? memberInfo.avatar : '',
        name: memberInfo !== undefined ? memberInfo.name : '',
        members: data[0]?.members,
      });
    }
    //neu chua thi tao 1 cuoc hoi thoai
    const create = await axios.post(`${API}conversation`, {
      senderID: userInfo.id,
      receiverID: user._id,
    });
    const member = create.data.members.find(value => value !== userInfo.id);
    const response = await axios.get(`${API}user/${member}`);
    const memberInfo = response.data;
    return navigation.navigate('Messages', {
      id: create.data._id,
      avatar: memberInfo !== undefined ? memberInfo.avatar : '',
      name: memberInfo !== undefined ? memberInfo.name : '',
      members: create.data?.members,
    });
  };

  const callNumber = () => {
    console.log('callNumber ----> ', user.phone);
    let phoneNumber = user.phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${user.phone}`;
    } else {
      phoneNumber = `tel:${user.phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <ScrollView flex="1" bg="white">
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Icon name={'chevron-left'} size={29} color="white" />
        </TouchableOpacity>
        <Text style={styles.textTitleSP}>Chi tiết sản phẩm</Text>
        <View flexDirection="row">
          <TouchableOpacity
            style={styles.buttonReport}
            onPress={() => {
              addSavePostToDb(dataSavePost);
              showToast();
            }}>
            <Icon name="heart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReport}
            onPress={() => {
              navigation.navigate('Reports', {item});
            }}>
            <Icon name="warning" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.swiper}>
        <Swiper style={{height: windowWidth / 2.5}} showButtons={false}>
          {item.images.map((value, index) => {
            return (
              <Image
                key={index}
                style={styles.imageBanner}
                source={{uri: value}}
              />
            );
          })}
        </Swiper>
      </View>

      <View style={styles.headContent}>
        <Text style={styles.textTitle}>{item.title ?? ''}</Text>
        <Text style={styles.textPrice}>{formatMoney(item.price ?? 0)}Đ</Text>
        <Text style={styles.textAddress} italic>
          {item.address ?? ''}
        </Text>
        <Text style={styles.textAt} italic>
          {format(item.createdAt ?? '', 'my-locale') || ''}
        </Text>
      </View>

      <ListItem>
        <Avatar
          rounded
          source={{
            uri:
              user.avatar ??
              'https://i1.sndcdn.com/avatars-UwyGKT2UGEqwmTML-1u0WXg-t500x500.jpg',
          }}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{fontWeight: 'bold', color: '#000', fontSize: 15}}>
            {user.name ?? ''}
          </ListItem.Title>
        </ListItem.Content>

        <TouchableOpacity
          style={styles.buttonViewPage}
          onPress={() => navigation.navigate('Stall', {user})}>
          <Text color="#E67E21" fontWeight="bold">
            Xem trang
          </Text>
        </TouchableOpacity>
      </ListItem>

      <View style={styles.statistical}>
        <View style={[styles.statisticalContent, styles.lineRight]}>
          <Text style={{marginTop: -5}} fontWeight="bold" color="#7a7676">
            Số bài đăng
          </Text>
          <Text style={styles.text}>{count}</Text>
        </View>

        <View style={[styles.statisticalContent, {marginTop: 2}]}>
          <Text fontWeight="bold" color="#7a7676">
            Ngày tham gia
          </Text>
          <Text style={styles.text}>{user.dateJoin ?? ''}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonCall} onPress={() => callNumber()}>
        <IonIcons
          name="call"
          size={24}
          color="#FFFFFF"
          style={{marginRight: 10}}
        />
        <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>
          {user.phone ?? ''}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonChat}
        onPress={handleAddConversation}>
        <Icon name="message" size={24} color="#E67E21" />
        <Text style={{fontWeight: 'bold', color: '#E67E21', marginLeft: 5}}>
          Chat với người bán
        </Text>
      </TouchableOpacity>

      <Text style={styles.description}>{item.description}</Text>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View style={styles.notice}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dgrdmwvc4/image/upload/v1631946345/battay_yi3ifq.png',
          }}
          style={{width: 55, height: 55}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            padding: 5,
          }}>
          NÊN gặp mặt trực tiếp kiếm tra hàng trước khi giao dịch
        </Text>
      </View>
    </ScrollView>
  );
};

export default React.memo(PostDetail);

const styles = StyleSheet.create({
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
    textAlign: 'justify',
  },
  buttonCall: {
    flexDirection: 'row',
    width: windowWidth - 50,
    height: 40,
    alignSelf: 'center',
    borderRadius: 12,
    margin: 4,
    backgroundColor: '#E67E21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChat: {
    flexDirection: 'row',
    width: windowWidth - 50,
    height: 40,
    alignSelf: 'center',
    borderRadius: 12,
    margin: 4,
    borderWidth: 2,
    borderColor: '#E67E21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#E67E21',
    fontSize: 15,
    fontWeight: '700',
  },
  lineRight: {
    borderRightColor: '#707070',
    width: '50%',
    height: 30,
    alignSelf: 'center',
    borderRightWidth: 1,
  },
  headerContainer: {
    width: windowWidth,
    height: 40,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBack: {
    marginLeft: 15,
  },
  buttonReport: {
    marginRight: 15,
  },
  swiper: {
    width: windowWidth - 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageBanner: {
    height: windowWidth / 2.5,
    width: windowWidth - 40,
    alignSelf: 'center',
    borderRadius: 8,
  },
  headContent: {
    width: windowWidth - 40,
    alignSelf: 'center',
  },
  textTitle: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  textPrice: {
    paddingVertical: 8,
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  textAddress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#707070',
  },
  textAt: {
    fontSize: 15,
    color: '#707070',
  },
  buttonViewPage: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#E67E21',
    borderRadius: 25,
  },
  statistical: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: windowWidth,
    marginBottom: 20,
  },
  statisticalContent: {
    alignItems: 'center',
    width: windowWidth / 2,
  },
  textTitleSP: {
    fontSize: 20,
    color: '#FFFFFF',
    marginRight: 50,
  },
});
