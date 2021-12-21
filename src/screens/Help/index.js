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

const HelpBee = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name={'chevron-left'} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Trợ giúp</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.title}>
          <Text style={styles.titleBeeMarket}>Bee Market</Text>
          <Text style={styles.titleInformation}>
            ĐĂNG TIN MIỄN PHÍ - TÌM TIN NHƯ Ý
          </Text>
        </View>
        <View style={styles.twoContainer}>
          <Text style={styles.titleHelp}>Hỗ trợ Bee Market</Text>
          <Text style={styles.label}>Các câu hỏi thường gặp</Text>
          <Text style={styles.label}>
            1. Tôi không thể tạo tài khoản trên BeeMarket.vn
          </Text>
          <Text style={styles.textContent}>
            Bạn có thể tạo tài khoản bằng cách click vào nút đăng Ký ở trên màn
            hình Trang chủ hoặc một nới nào đấy bạn có thể thực hiên chức nắng
            dành cho người dùng.
          </Text>
          <Text style={styles.label}>
            2. Tôi không thể đăng tin mới lên được
          </Text>
          <Text style={styles.textContent}>
            Chức năng đăng tin mới là chức năng dành cho người{'\n'}
            dùng BeeMarket.{'\n'}
            Bạn cần đắng ký tài khoản và sử dụng đăng tin mới nào ở màn hình
            trang chủ để tải tin mới lên. Trong quá trình đăng tin bạn phải đợi
            bộ phận kiểm duyệt của chúng tôi xem xét, nếu bài viết của bạn không
            vi phạm các điều khoản của chúng tôi thì chúng tôi sẽ duyệt bài của
            bạn sớm nhất.
          </Text>
          <Text style={styles.label}>
            3. Số lượng tin tối đa mà tôi có thể đăng
          </Text>
          <Text style={styles.textContent}>
            Số lượng tin đăng của bạn là không giới hạn
          </Text>
          <Text style={styles.label}>
            4. Tôi không tìm thấy sản phẩn mình cần.
          </Text>
          <Text style={styles.textContent}>
            Bạn có thể lựa chọn danh mục trong mục chọn tất cả danh mục để tìm
            kiếm sản phẩm mình mong muốn. Ngoài ra bạn có thể tìm kiếm sản phẩm
            của mình trên thanh tìm kiếm
          </Text>
          <Text style={styles.label}>
            5. Khi cần thông tin cần liên hệ với BeeMarket, tôi cần liên hệ như
            thế nào?
          </Text>
          <Text style={styles.textTitleContent}>
            Bạn có thể liên hệ trực tiếp cho BeeMarket trong mục nhanh chat.
            Hoặc liên hệ thông qua địa chỉ{'\n'}
            CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI ĐIỆN TỬ AMAZON{'\n'}- Văn phòng
            Hà Nội:Tầng 4, B50, Lô 6, KĐT Định Công - Hoàng Mai - Hà Nội{'\n'}-
            Văn phòng Hồ Chí Minh:52 - 54 Nguyễn Thị Minh Khai, P. Đa Kao, Q. 1,
            Tp. Hồ Chí Minh{'\n'}
            số điện thoại : 0989999999{'\n'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HelpBee;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  scrollView: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    top: windowHeight / 16,
    marginHorizontal: 20,
  },
  headerContainer: {
    width: windowWidth,
    height: 50,
    backgroundColor: '#E67E21',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: windowWidth / 25,
    height: windowHeight / 35,
    marginLeft: 15,
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  title: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  twoContainer: {
    paddingLeft: 8,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: 14,
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
  titleHelp: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTitleContent: {
    fontSize: 14,
    marginBottom: 60,
  },
});
