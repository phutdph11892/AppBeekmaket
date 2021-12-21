/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Searchbar = React.memo(({handleSearch, style}) => {
  const [query, setQuery] = useState();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <Icon
          name="ios-search"
          size={24}
          color="#838181"
          style={{paddingLeft: 10}}
        />
        <TextInput
          value={query}
          placeholder="Search"
          style={styles.textInput}
          onChangeText={text => {
            setQuery(text);
            handleSearch(text);
          }}
        />
        {query ? (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              handleSearch('');
            }}
            style={styles.vwClear}>
            <Icon name="close" size={24} color="#838181" />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
    </View>
  );
});

export default Searchbar;

const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#000',
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '95%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  container: {
    height: 50,
    alignItems: 'center',
    marginTop: 10,
  },
});
