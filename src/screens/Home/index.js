import React, {useState, useEffect} from 'react';
import {Heading, Text, View} from 'native-base';
import PostCard from './components/PostCard';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Banner from './components/Banner';
import Search from './components/Search';
import SearchBar from './components/SearchBar';
import CategoryList from './components/Categories';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import {API} from '../../utils/constant';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import {getPost} from '../../redux/action/savePostAction';
import {useDispatch} from 'react-redux';

const Home = () => {
  const [textSearch, setTextSearch] = useState('');
  const [postList, setPostList] = useState([]);
  const [postFiltered, setPostFiltered] = useState([]);
  const [postCtg, setPostCtg] = useState([]);
  const [categories, setCategories] = useState([]);
  const items = ['Gần đây nhất', 'A-Z', 'Z-A', 'Giá tăng dần', 'Giá giảm dần'];
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      await axios.post(`${API}notification/createNotification`, {
        token,
      });
    } catch (err) {
      //Do nothing
      console.log(err.response.data);
      return;
    }
  };

  useEffect(() => {
    sendFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const handleSearch = value => {
    setTextSearch(value);
    setPostFiltered(
      postList.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const onSelectDropDown = async value => {
    switch (value) {
      case 0:
        let res = await axios.get(`${API}post`);
        setPostList(res.data);
        setPostFiltered(res.data);
        setPostCtg(res.data);
        break;
      case 1:
        res = await axios.get(`${API}sort/title-az`);
        setPostList(res.data);
        setPostFiltered(res.data);
        setPostCtg(res.data);
        break;
      case 2:
        res = await axios.get(`${API}sort/title-za`);
        setPostList(res.data);
        setPostFiltered(res.data);
        setPostCtg(res.data);
        break;
      case 3:
        res = await axios.get(`${API}sort/price-asc`);
        setPostList(res.data);
        setPostFiltered(res.data);
        setPostCtg(res.data);
        break;
      case 4:
        res = await axios.get(`${API}sort/price-desc`);
        setPostList(res.data);
        setPostFiltered(res.data);
        setPostCtg(res.data);
        break;
      default:
        getAllPost();
        break;
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${API}category`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}post`);
      setPostList(res.data);
      setPostFiltered(res.data);
      setPostCtg(res.data);
      setRefresh(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setRefresh(false);
    }
  };

  const handleFilterPostOfCategory = category => {
    category === 'all'
      ? setPostCtg(postList)
      : setPostCtg(postList.filter(item => item.category === category));
  };

  useEffect(() => {
    getAllPost();
    getAllCategory();
  }, [isFocused]);

  return (
    <View flex="1">
      <View backgroundColor="#E67E21">
        <Heading size={'md'} m="1.5" ml="3" color="#fff">
          Bee Market
        </Heading>
        <SearchBar handleSearch={handleSearch} />
      </View>
      {textSearch !== '' ? (
        <Search postFiltered={postFiltered} text={textSearch} />
      ) : (
        <FlatList
          ListHeaderComponent={
            <View>
              <Banner />
              <CategoryList
                categories={categories}
                categoryFilter={handleFilterPostOfCategory}
              />
              <View flexDirection="row" justifyContent="space-between" mt="2">
                <Text fontSize="lg" fontWeight="bold" ml="5">
                  Tin mới nhất
                </Text>
                <View>
                  <Text fontSize="sm" fontWeight="bold" mb="2">
                    Sắp xếp theo ▼
                  </Text>
                  <ModalDropdown
                    style={styles.dropDownContainer}
                    options={items}
                    textStyle={styles.bold}
                    dropdownStyle={styles.dropDown}
                    defaultValue={items[0]}
                    dropdownTextStyle={styles.dropDownText}
                    onSelect={onSelectDropDown}
                  />
                </View>
              </View>
              <View style={styles.lineRule} mt="2" />
              {postCtg.length === 0 ? (
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
                    <Text style={styles.textNone}>Không có tin nào</Text>
                  )}
                </>
              ) : null}
            </View>
          }
          data={postCtg}
          renderItem={item => <PostCard item={item} postList={postCtg} />}
          keyExtractor={(item, index) => item._id}
          numColumns={2}
          key={2}
          onRefresh={() => {
            getAllCategory();
            setRefresh(true);
          }}
          refreshing={refresh}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  dropDownContainer: {
    width: 95,
    marginRight: 30,
    borderWidth: 0.7,
    borderRadius: 5,
  },
  dropDown: {
    width: 95,
    maxHeight: 200,
    borderWidth: 0,
    backgroundColor: '#f2f2f1',
  },
  bold: {
    paddingHorizontal: 4,
    fontWeight: '700',
  },
  dropDownText: {
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#f2f2f1',
    fontSize: 12,
    borderTopWidth: 1,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
  lineRule: {
    borderTopColor: 'black',
    width: '90%',
    alignSelf: 'center',
    borderTopWidth: 1,
  },
  textNone: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 60,
    fontSize: 19,
    fontWeight: 'bold',
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
});
