import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {API} from '../../../utils/constant';
import {windowWidth} from '../../../utils/Dimensions';

const ChatItems = item => {
  const data = item.item.item;
  const userInfo = useSelector(state => state.user.user);
  const member = data.members.find(value => value !== userInfo.id);
  const [memberChat, setMemberChat] = React.useState();
  const navigation = useNavigation();

  React.useEffect(() => {
    const getCurrentChat = async () => {
      const res = await axios.get(`${API}user/${member}`);
      setMemberChat(res.data);
    };
    getCurrentChat();
  }, [member]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Messages', {
            id: data._id,
            avatar: memberChat !== undefined ? memberChat.avatar : '',
            name: memberChat !== undefined ? memberChat.name : '',
            members: data?.members,
          })
        }>
        <View style={styles.containerAvatar}>
          <Avatar
            style={styles.avatar}
            source={{uri: memberChat !== undefined ? memberChat.avatar : ''}}
            rounded
            size="large"
          />
          <Text style={styles.text}>
            {memberChat !== undefined ? memberChat.name : ''}{' '}
          </Text>
        </View>
        <View style={styles.lineRule} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatItems;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: '#EEEEEE',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  containerAvatar: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    padding: 6,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginTop: 20,
  },
  lineRule: {
    borderBottomColor: '#FFF',
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 4,
  },
});
