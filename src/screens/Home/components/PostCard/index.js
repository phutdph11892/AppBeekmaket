/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {windowWidth} from '../../../../utils/Dimensions';
import {format, register} from 'timeago.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
const formatMoney = n => n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
import localeFunc from '../../../../utils/formatTime';
import {useNavigation} from '@react-navigation/core';

const PostCard = ({item, postList}) => {
  const post = item.item;
  const navigation = useNavigation();

  register('my-locale', localeFunc);

  return (
    <View
      style={[
        styles.container,
        {marginBottom: item.index === postList.length - 1 ? 55 : 0},
      ]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetail', {item: item})}>
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={{
            uri: post.image
              ? post.image
              : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
          }}
        />
        <Text style={styles.title}>
          {post.title.length > 15
            ? post.title.substring(0, 15 - 3) + '...'
            : post.title || ''}
        </Text>

        <View>
          <View style={[styles.viewText, {marginLeft: 5, marginBottom: 4}]}>
            <Icon name={'university'} size={15} color={'#000000'} />
            <Text style={styles.price}>{formatMoney(post.price) || ''} đ</Text>
          </View>

          <View style={styles.viewContainer}>
            <View style={styles.viewText}>
              <Icon name={'clock'} size={15} color={'#000000'} />
              <Text style={styles.at}>
                {format(post.createdAt, 'my-locale') || ''}
              </Text>
            </View>

            <View style={[styles.viewText]}>
              <Icon name={'map-marker-alt'} size={15} color={'#000000'} />
              <Text style={styles.at}>
                {post.address.length > 10
                  ? post.address.substring(0, 10 - 3) + '...'
                  : post.address || ''}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(PostCard);

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2 - 15,
    height: 200,
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 10,
    elevation: 8,
    backgroundColor: 'white',
    flexDirection: 'column',
    marginBottom: 5,
  },
  image: {
    width: windowWidth / 2 - 15,
    height: 125,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  card: {
    height: windowWidth / 2 - 20 - 90,
    backgroundColor: 'transparent',
    width: windowWidth / 2 - 20 - 10,
  },
  textViewContainer: {
    width: windowWidth / 2 - 20,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  viewText: {
    flexDirection: 'row',
    paddingLeft: 5,
    marginTop: 3,
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  price: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 5,
  },
  at: {
    fontSize: 12,
    color: 'black',
    paddingLeft: 2,
  },
});
