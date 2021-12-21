/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostCard from '../PostCard';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API} from '../../../../utils/constant';
import {windowHeight, windowWidth} from '../../../../utils/Dimensions';
import {FlatList} from 'native-base';
const Stall = ({route}) => {
  const navigation = useNavigation();
  const user = route.params.user;
  const [count, setCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPostOfUser = async () => {
    setLoading(true);
    const res = await axios.get(`${API}post/userPost/${user._id}`);
    setCount(res.data.postCount);
    setPostList(res.data.postList);
    setLoading(false);
  };

  useEffect(() => {
    getPostOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <SafeAreaView>
          <View style={styles.viewContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-left'} size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.text}>Gian hàng của {user.name ?? ''}</Text>
          </View>

          {postList.length !== 0 ? (
            <FlatList
              ListHeaderComponent={
                <>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(158, 150, 150, .3)',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        padding: 15,
                        marginLeft: 10,
                      }}>
                      <Avatar
                        rounded
                        size="medium"
                        title={'Nam'}
                        source={{
                          uri: user.avatar ?? '',
                        }}
                      />
                      <View style={{paddingLeft: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                          {user.name ?? ''}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#E67E21',
                            padding: 5,
                            borderRadius: 10,
                            width: 130,
                          }}>
                          <Ionicons name="person" size={12} color="white" />
                          <Text
                            style={{
                              marginLeft: 5,
                              fontSize: 12,
                              color: 'white',
                            }}>
                            Thông tin cá nhân
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                      <View style={styles.infoContent}>
                        <FontAwesome
                          name="calendar"
                          size={24}
                          color="#E67E21"
                        />
                        <Text style={styles.textInfo}>Ngày tham gia :</Text>
                        <Text>{user.dateJoin ?? ''}</Text>
                      </View>
                      <View style={styles.infoContent}>
                        <Entypo name="location-pin" size={24} color="#E67E21" />
                        <Text style={[styles.textInfo]}>Địa chỉ : </Text>
                        <Text>{user.address ?? ''}</Text>
                      </View>
                      <View style={styles.infoContent}>
                        <Entypo
                          name="shopping-cart"
                          size={24}
                          color="#E67E21"
                        />
                        <Text style={styles.textInfo}>Đang bán :</Text>
                        <Text>{count}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={{fontSize: 24, fontWeight: 'bold', margin: 5}}>
                    Đang bán
                  </Text>
                </>
              }
              data={postList}
              renderItem={item => <PostCard item={item} postList={postList} />}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
          ) : (
            <View style={[styles.center, {height: windowHeight / 2}]}>
              <Text>Không có tin nào</Text>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default React.memo(Stall);

const styles = StyleSheet.create({
  viewContainer: {
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
    alignSelf: 'center',
  },
  buttonBack: {
    marginLeft: 15,
  },
  infoContent: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  textInfo: {
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
  },
  listContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
