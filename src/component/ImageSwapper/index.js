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
    <View style={styles.shadowContainer}>
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
    </View>
  );
};

export default ImageSwipper;

const styles = StyleSheet.create({
  shadowContainer: {
    width: w(90),
    height: h(25),
    alignSelf: 'center',
    marginVertical: h(2),
    borderRadius: 10,
    // Efek bayangan
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
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
  },
});
