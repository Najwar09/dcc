import React from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as w } from '../../../responsive';

// images
const images = [
  { id: 1, uri: require("./../../assets/images/satu.jpg") },
  { id: 2, uri: require("./../../assets/images/tes.jpg") },
  { id: 3, uri: require("./../../assets/images/tiga.jpg") },
];

const ImageSwipper = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        dotColor="#ffffff"
        activeDotColor="red"
        showsPagination={false}
      >
        {images?.map((image) => (
          <View key={image?.id} style={styles.slide}>
            <Image source={image.uri} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

export default ImageSwipper;

const styles = StyleSheet.create({
  container: {
    width: w(80),
    height: w(43),
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 315,
    height: 168,
    backgroundColor: '#9DD6EB',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
