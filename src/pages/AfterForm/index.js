import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import successAnimation from '../../assets/animation/done.json'; // Ganti dengan path animasi Lottie yang sesuai

const AfterForm = ({navigation}) => {
  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Ganti Image dengan LottieView */}
      <LottieView
        source={successAnimation} // Sumber file animasi Lottie
        autoPlay
        loop={true} // Set loop false jika animasi hanya berjalan sekali
        style={styles.animation}
      />
      <Text style={styles.title}>Pendaftaran Berhasil!</Text>
      <Text style={styles.subtitle}>
        Terima kasih telah mendaftar dengan kami.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Lanjutkan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AfterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: w(5),
  },
  animation: {
    width: w(80),
    height: h(40),
    marginBottom: h(5),
  },
  title: {
    fontSize: w(8),
    fontWeight: 'bold',
    marginBottom: h(2),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: w(5),
    marginBottom: h(5),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0088FF',
    paddingVertical: h(2),
    paddingHorizontal: w(10),
    borderRadius: w(5),
  },
  buttonText: {
    color: 'white',
    fontSize: w(5),
    fontWeight: 'bold',
  },
});
