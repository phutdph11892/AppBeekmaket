import axios from 'axios';
import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {API} from '../../utils/constant';
import ChatItems from './ChatInfomation';
import {useIsFocused} from '@react-navigation/core';

//http://192.168.19.101:9000/api/conversation/

const Chat = () => {
  const userInfo = useSelector(state => state.user.user);
  const [listConversation, setListConversation] = useState([]);
  const isFocused = useIsFocused();

  const getConversation = useCallback(async () => {
    const res = await axios.get(
      `${API}conversation/getConversation/${userInfo.id}`,
    );
    setListConversation(res.data);
  }, [userInfo.id]);

  useEffect(() => {
    getConversation();
  }, [getConversation]);
  React.useEffect(() => {}, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.product2}>
        <Text style={styles.text}>Tin Nhắn</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {listConversation.length === 0 ? (
          <Text style={{textAlign: 'center', marginTop: 250, fontSize: 20}}>
            Bạn chưa có tin nhắn nào
          </Text>
        ) : (
          <FlatList
            style={styles.product}
            data={listConversation}
            renderItem={item => <ChatItems item={item} />}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  product2: {
    width: 420,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  product: {
    width: 400,
    height: 1000,
  },
});
