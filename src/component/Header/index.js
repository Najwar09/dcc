import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const StickyHeader = () => {
  // Fungsi untuk mendapatkan waktu dengan format yang diinginkan
  const getFormattedDate = () => {
    const today = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Fungsi untuk menentukan ucapan berdasarkan waktu saat ini
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Selamat pagi!';
    } else if (currentHour < 15) {
      return 'Selamat siang!';
    } else if (currentHour < 18) {
      return 'Selamat sore!';
    } else {
      return 'Selamat malam!';
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.name}>{getFormattedDate()}</Text>
        <Text style={styles.greetingText}>{getGreeting()}</Text>
      </View>

      {/* Animasi Lottie */}
      <LottieView
        source={require('../../assets/animation/typing.json')}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
      {/* Akhir Animasi Lottie */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: w(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#79A1ED',
    borderBottomLeftRadius: w(20),
    width: '100%',
    height: h(20),
    // Properti shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  textContainer: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'anu',
  },
  name: {
    fontSize: w(4),
    color: '#ffffff',
  },
  greetingText: {
    fontFamily: 'anuna',
    color: 'white',
    fontSize: w(4.7),
    marginTop: h(1),
  },
  lottieAnimation: {
    width: w(60),
    height: h(40),
  },
});

export default StickyHeader;
