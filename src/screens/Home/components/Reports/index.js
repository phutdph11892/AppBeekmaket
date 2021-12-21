import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/core';
import {windowHeight, windowWidth} from '../../../../utils/Dimensions';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {API} from '../../../../utils/constant';
import Toast from 'react-native-toast-message';
import {TextInput} from 'react-native-paper';

const Reports = ({route}) => {
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(false);
  const showToast = () => {
    Toast.show({
      topOffset: 60,
      text2: 'Tố cáo thành công',
    });
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    const res = await axios.post(`${API}report`, {
      reporterID: userInfo.id,
      postReported: route.params.item._id,
      content: data.content,
      reporterPersonID: route.params.item.userID._id,
      state: 'Chưa xử lý',
    });
    showToast();
    setLoading(false);
    console.log(res.data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Icon name={'chevron-left'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Tố cáo</Text>
      </View>
      <View style={styles.viewContainer}>
        <View style={[styles.inputViewContainer]}>
          <Text style={styles.textInput}>Chi tiết tố cáo:</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                numberOfLines={8}
                multiline
                editable
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                outlineColor="#E67E21"
                activeOutlineColor="#E67E21"
              />
            )}
            name="content"
          />
          {errors.content && <Text>Không được để trống.</Text>}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>Tố cáo</Text>
        </TouchableOpacity>
        {loading ? <ActivityIndicator color="#E67E21" size="large" /> : <></>}
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};
export default Reports;
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

  button: {
    width: windowWidth - 250,
    height: 50,
    backgroundColor: '#E67E21',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight / 5,
    borderRadius: 20,
    marginBottom: 5,
    elevation: 8,
  },
  title: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 22,
    color: '#E67E21',
  },
  textButton: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  input: {
    width: windowWidth - 25,
    height: 250,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E67E21',
    textAlignVertical: 'top',
  },
  inputEmail: {
    width: windowWidth - 25,
    height: 50,
    borderRadius: 20,
    borderColor: '#E67E21',
    borderWidth: 1,
  },
});
