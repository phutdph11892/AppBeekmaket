import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {windowWidth} from '../../../../utils/Dimensions';

const Banner = () => {
  const bannerData = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/img18/Wireless/OPPOF11Pro/OpenSale/LP/PC/2._CB469241851_.jpg',
    'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
    'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
    'https://bvndong.thuathienhue.gov.vn/UploadFiles/videoclip/anhminhhoa/thongdiep5k.jpg',
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper showButtons={false}>
            {bannerData.map((item, index) => {
              return (
                <Image
                  key={index}
                  style={styles.imageBanner}
                  source={{uri: item}}
                  resizeMode="contain"
                />
              );
            })}
          </Swiper>
        </View>
      </View>
    </ScrollView>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiper: {
    width: windowWidth,
    alignItems: 'center',
    height: 150,
  },
  imageBanner: {
    height: 150,
    width: windowWidth,
  },
});
