/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {List, Text} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryList = React.memo(({categories, categoryFilter}) => {
  return (
    <View style={styles.boxShadow}>
      <Text style={styles.text} fontSize="md" fontWeight="bold">
        DANH MỤC
      </Text>
      <View style={styles.lineRule} />
      <List style={styles.listContainer}>
        <TouchableOpacity
          style={styles.cardItem}
          key={1}
          onPress={() => {
            categoryFilter('all');
          }}>
          <View style={[styles.center, styles.category]}>
            <Icon name="reorder-three-outline" size={24} color="#fff" />
          </View>
          <Text style={{color: '#E67E21'}}>Tất cả</Text>
        </TouchableOpacity>

        {categories ? (
          categories.map((item, index) => (
            <TouchableOpacity
              style={styles.cardItem}
              key={index}
              onPress={() => {
                categoryFilter(item._id);
              }}>
              <View style={[styles.center, styles.category]}>
                <Icon name={item.icon} size={24} color="#fff" />
              </View>
              <Text style={{color: '#E67E21'}}>{item.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View />
        )}
      </List>
    </View>
  );
});

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  lineRule: {
    borderBottomColor: 'black',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -10,
    borderWidth: 0,
  },
  text: {
    marginTop: 20,
    marginLeft: 20,
  },
  cardItem: {
    flexBasis: '32%',
    alignItems: 'center',
    marginBottom: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#E67E21',
    width: 46,
    height: 46,
    borderRadius: 50,
  },
});

export default CategoryList;
