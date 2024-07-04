import React from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Image, View} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

// images
const images = [
  {id: 1, uri: require('./../../assets/images/satu.jpg')},
  {id: 2, uri: require('./../../assets/images/tes.jpg')},
  {id: 3, uri: require('./../../assets/images/tiga.jpg')},
];

const ImageSwipper = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        dotColor="#ccc"
        activeDotColor="#ff6347"
        showsPagination={true}>
        {images.map(image => (
          <View key={image.id} style={styles.slide}>
            <Image source={image.uri} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSwipper;

const styles = StyleSheet.create({
  container: {
    width: w(90),
    height: h(25),
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: h(2),
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
