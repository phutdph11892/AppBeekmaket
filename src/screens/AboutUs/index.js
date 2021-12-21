import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import {windowHeight, windowWidth} from '../../utils/Dimensions';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'chevron-left'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Về chúng tôi</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.viewAbout}>
          <View style={styles.title}>
            <Text style={styles.titleBeeMarket}>Bee Market</Text>
            <Text style={styles.titleInformation}>
              ĐĂNG TIN MIỄN PHÍ - TÌM TIN NHƯ Ý
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.titleAboutBeeMarket}>Về Bee Market</Text>
            <Text style={styles.label}>1. Bee Market là gì?</Text>
            <Text style={styles.textContent}>
              BeeMarket.vn là kênh mua bán đồ củ của sinh viên poly như đồ công
              nghệ, sách vở, phương tiện... Được quản lý và vận hành bởi Công Ty
              Cổ Phần Đầu Tư Và Thương Mại Điện Tử Amazon. Được thành lập 2019
              với khẩu hiệu "Mua bán an toàn đồ gì củng có đã có BeeMarket" đến
              hết nay BeeMarket đã tối ưu tất cả danh mục mục nhằm phục vụ việc
              tìm kiếm và đánh giá sản phẩm, giúp cho quý khách hàng lựa chọn
              được sản phẩm với giá hời tốt nhất trên thị trường.
            </Text>

            <Text style={styles.label}>2. Trụ sợ của BeeMarket ở đâu?</Text>

            <Text style={styles.textContent}>
              Dưới đây là trụ sở của BeeMarket có trên thị trường{'\n'}- Văn
              phòng Hà Nội:Tầng 4, B50, Lô 6, KĐT Định Công - Hoàng Mai - Hà Nội
              {'\n'}- Văn phòng Hồ Chí Minh:52 - 54 Nguyễn Thị Minh Khai, P. Đa
              Kao, Q. 1, Tp. Hồ Chí Minh
            </Text>

            <Text style={styles.label}>
              3. BeeMarket có những nền tảng nào?
            </Text>

            <Text style={styles.textContent}>
              Hiện tại BeeMarket đã có 2 nền tảng:- Android Mobile - Ios Mobile
            </Text>

            <Text style={styles.label}>
              4. Ứng dụng BeeMarket do ai phát triển?
            </Text>
            <Text style={styles.textContent}>
              Dự án BeeMarket Mobile do PolyMarket Team - Thuộc trường Cao Đẳng
              Thực Hành FPT Polytechnic Hà Nội xây dựng và phát triển. Dưới sự
              quản lý của Công Ty Cổ Phần Đầu Tư Và Thương Mại Điện Tử Amazon.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default AboutUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  scrollView: {
    width: windowWidth,
    height: windowHeight,
    marginHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'center',
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
  },
  buttonBack: {
    width: windowWidth / 15,
    height: windowHeight / 35,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  title: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    padding: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textContent: {
    fontSize: 14,
    width: windowWidth - 20,
    marginLeft: 10,
  },
  titleBeeMarket: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E67E21',
  },
  titleInformation: {
    fontSize: 15,
    color: '#E67E21',
  },
  titleAboutBeeMarket: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewAbout: {
    width: windowWidth,
    height: windowHeight,
  },
});
