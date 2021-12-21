import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/core';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {API} from '../../utils/constant';
import axios from 'axios';

const Notify = () => {
  const navigation = useNavigation();
  const [notiList, setNotiList] = React.useState([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    setLoading(true);
    const getListNoti = async () => {
      const res = await axios.get(`${API}notification`);
      setNotiList(res.data);
    };
    getListNoti();
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Icon name={'chevron-left'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Thông báo</Text>
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
          <FlatList
            data={notiList}
            renderItem={item => (
              <View style={styles.layout}>
                <Image
                  style={styles.imageLogo}
                  source={{uri: item.item.image}}
                />
                <View style={styles.layoutText}>
                  <Text style={styles.textTitle}>{item.item.title}</Text>
                  <Text style={styles.textBody}>{item.item.body}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => item._id}
          />
        )}
      </>
    </SafeAreaView>
  );
};
export default Notify;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  viewContainer: {
    width: windowWidth,
    height: windowHeight,
  },
  headerContainer: {
    width: windowWidth,
    height: windowHeight / 15,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputViewContainer: {
    width: windowWidth - 25,
    alignSelf: 'center',
    paddingTop: 20,
  },

  buttonBack: {
    width: windowWidth / 25,
    height: windowHeight / 25,
    marginLeft: 15,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  imageLogo: {
    width: 80,
    height: 80,
  },
  layout: {
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: '#d4cfcf',
    marginTop: 2,
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 4,
  },
  layoutText: {
    flexDirection: 'column',
  },
  textTitle: {
    fontSize: 24,
    marginLeft: 16,
    marginTop: 2,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  textBody: {
    fontSize: 18,
    marginTop: 4,
    marginLeft: 16,
    color: '#000',
  },
});
