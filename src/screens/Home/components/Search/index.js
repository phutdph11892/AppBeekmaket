/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {View, Text} from 'native-base';
// import {useNavigation} from '@react-navigation/native';
import {windowWidth} from '../../../../utils/Dimensions';
import SearchItem from './components/SearchItem';
const Search = ({postFiltered}) => {
  // const navigation = useNavigation();
  return (
    <View style={{width: windowWidth, backgroundColor: '#f2f2f1'}}>
      {postFiltered.length > 0 ? (
        <FlatList
          data={postFiltered}
          renderItem={item => <SearchItem item={item} />}
          keyExtractor={item => item._id}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{alignSelf: 'center'}}>Không tìm thấy sản phẩm</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(Search);

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});
