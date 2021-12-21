import React from 'react';
import {Text, View, Image} from 'native-base';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
export const windowWidth = Dimensions.get('window').width;

const SearchItem = ({item}) => {
  const value = item.item;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PostDetail', {item: item})}>
        <View flexDirection="row" style={styles.viewSearch}>
          <Image
            style={styles.image}
            source={{
              uri:
                value.image ??
                'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
            }}
            alt="Alternate Text"
            size="xl"
          />
          <View style={styles.viewText}>
            <Text style={styles.textTitle}>{value.title}</Text>
            <Text style={styles.textNote} note>
              {value.description.length > 80
                ? value.description.substring(0, 80 - 3) + '...'
                : value.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchItem;
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSearch: {
    margin: 2,
    width: windowWidth - 10,
    backgroundColor: '#f6eeee',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 3,
  },
  viewText: {
    marginLeft: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: windowWidth - 10,
    marginTop: 2,
  },
  textNote: {
    width: windowWidth - 100,
    fontSize: 14,
    marginTop: 5,
  },
});
