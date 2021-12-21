/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import formatMoney from '../../../../utils/formatMoney';
import {useNavigation} from '@react-navigation/native';
import {API} from '../../../../utils/constant';

const EditPostCardList = ({item}) => {
  const data = item.item;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={{
            uri:
              data.image ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OBrHxEKxP5bLGvzP4bfDM7vKAYVX-2vRyc9RDMByT-l_zq1mCk0cFoRm7AY9SMmB5EY&usqp=CAU',
          }}
        />
        <View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.product}>
                {data.price && formatMoney(data.price)}
              </Text>
              <Text style={styles.product1}>đ</Text>
            </View>
          </View>
          <Text style={styles.description || ''}>
            {data.description && data.description.length > 45
              ? data.description.substring(0, 45 - 3) + '...'
              : data.description}
            .
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditPost', {item: data});
          }}
          style={{
            position: 'absolute',
            right: 5,
            fontSize: 18,
            marginTop: 30,
            marginRight: 10,
            borderWidth: 1,
            padding: 5,
            borderColor: '#E67E21',
            borderRadius: 10,
          }}>
          <Text style={{color: '#E67E21'}}>Sửa tin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineRule} />
      <View style={styles.line} />
    </View>
  );
};

export default React.memo(EditPostCardList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: 95,
    height: 75,
    borderRadius: 20,
    margin: 8,
  },
  title: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: 'bold',
  },
  product: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
    color: '#AA0000',
  },
  product1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
    color: '#000000',
    marginLeft: 2,
  },
  price: {
    fontSize: 20,
    marginTop: 20,
    marginEnd: 40,
  },
  description: {
    fontSize: 13,
    marginTop: 5,
    marginStart: 3,
    color: '#B2B2B2',
  },
  lineRule: {
    borderBottomColor: '#707070',
    width: '100%',
    alignSelf: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#d4cfcf',
  },
});
