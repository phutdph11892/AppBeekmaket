/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import {useNavigation} from '@react-navigation/core';
import io from 'socket.io-client';
import {API} from '../../../utils/constant';
import {formatTimeAgo} from '../../../utils/timeago';

const Messages = ({route}) => {
  const id = route.params.id;
  const avatar = route.params.avatar;
  const name = route.params.name;
  const members = route.params.members;

  const userInfo = useSelector(state => state.user.user);
  const navigation = useNavigation();
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [listMess, setListMess] = useState([]);
  const [input, setInput] = useState('');

  const scrollViewRef = useRef();
  useEffect(() => {
    socket.current = io('https://beemarket.herokuapp.com');
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      members.includes(arrivalMessage.sender) &&
      setListMess(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage, members]);

  const sendMessage = async () => {
    const mess = {
      sender: userInfo.id,
      text: input,
      conversationID: id,
    };
    const receiverId = members.find(member => member !== userInfo.id);

    console.log('ReceiverID', receiverId);
    console.log('Mess', mess);

    const res = await axios.post(`${API}message`, mess);
    setListMess([...listMess, res.data]);
    setInput('');

    socket.current.emit('sendMessage', {
      senderId: userInfo.id,
      receiverId,
      text: input,
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API}message/${id}`);
      setListMess(res.data);
    };
    getData();
  }, [id]);

  useEffect(() => {
    socket.current?.emit('addUser', userInfo.id);
    socket.current?.on('getUser', users => {
      // console.log('Get user', users);
    });
  }, [userInfo.id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'chevron-left'} size={20} color="white" />
        </TouchableOpacity>

        <View style={{marginLeft: 20}}>
          <Avatar
            rounded
            size="small"
            title={'Nam'}
            source={{
              uri: avatar,
            }}
          />
        </View>

        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 4,
          }}>
          {name}
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              style={{marginTop: 15}}
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current.scrollToEnd({animated: true});
              }}>
              {listMess.map((item, index) => {
                return item.sender === userInfo.id ? (
                  <View key={index} style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: userInfo.avatar,
                      }}
                    />
                    <Text style={styles.receiverText}>{item.text}</Text>
                    <Text style={styles.receiverText}>
                      {formatTimeAgo(item.createdAt)}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.receiver} key={index}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{
                        uri: avatar,
                      }}
                    />
                    <Text style={styles.senderText}>{item.text}</Text>
                    <Text style={styles.receiverText}>
                      {formatTimeAgo(item.createdAt)}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                style={styles.textInput}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder="Nhập tin nhắn"
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#E67E21" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 10,
    alignSelf: 'center',
  },
  buttonBack: {
    width: windowWidth / 25,
    height: windowHeight / 25,
    marginLeft: 15,
    marginTop: 8,
  },
  sender: {
    padding: 15,
    backgroundColor: '#E67E21',
    alignSelf: 'flex-end',
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  receiver: {
    padding: 15,
    backgroundColor: '#707070',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  textMessage: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "'rgba(158, 150, 150, .2)'",
  },
  textInput: {
    bottom: 0,
    height: 35,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    color: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
  },
});
