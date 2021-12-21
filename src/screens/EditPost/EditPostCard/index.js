import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {API} from '../../../utils/constant';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import EditPostCardList from './EditPostCardList';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
import {
  removeSavePost,
  getSavePost,
} from '../../../redux/action/savePostAction';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const EditPostCard = () => {
  const navigation = useNavigation();
  const [postList, setPostList] = React.useState([]);
  const userInfo = useSelector(state => state.user.user);
  const isFocus = useIsFocused();
  const [loading, setLoading] = useState(true);
  const showToast = () => {
    Toast.show({
      topOffset: 60,
      text2: 'Xóa thành công 👋',
    });
  };
  const getSavePostFromApi = React.useCallback(async () => {
    const res = await axios.get(`${API}post/userPost/${userInfo.id}`);
    setPostList(res.data.postList);
    setLoading(false);
  }, [userInfo.id]);

  React.useEffect(() => {
    getSavePostFromApi();
  }, [getSavePostFromApi, isFocus]);

  const handleDelete = async (id, item) => {
    await axios.delete(`${API}post/${id}`);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => {
          setPostList(postList.filter(value => value._id !== data.item._id));
          showToast();
          handleDelete(data.item._id, data.item);
        }}>
        <Icon name="trash" color={'white'} size={30} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'chevron-left'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Tin Đăng</Text>
      </View>
      <>
        {loading ? (
          <View style={styles.viewLoading}>
            <View style={styles.layoutLoading}>
              <ActivityIndicator
                color="#E67E21"
                accessible={loading}
                size="large"
              />
            </View>
          </View>
        ) : (
          <>
            {postList.length === 0 ? (
              <Text style={{textAlign: 'center', marginTop: 250, fontSize: 20}}>
                Bạn chưa đăng tin nào
              </Text>
            ) : (
              <SwipeListView
                data={postList}
                renderItem={data => <EditPostCardList item={data} />}
                renderHiddenItem={renderHiddenItem}
                disableRightSwipe={true}
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={75}
                stopLeftSwipe={75}
                rightOpenValue={-75}
                keyExtractor={(data, index) => index.toString()}
              />
            )}
          </>
        )}
      </>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default EditPostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 5,
  },
  viewContainer: {
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  buttonReport: {
    marginRight: 15,
  },
  emtyContainer: {
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  product: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  hiddenContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'red',
    right: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutLoading: {
    width: 150,
    height: 150,
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
