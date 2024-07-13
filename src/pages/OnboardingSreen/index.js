import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as w} from '../../../responsive';
import {setItem} from '../../../utils/asyncStorate';

const OnboardingSreen = () => {

  const navigation = useNavigation();

  const doneBang = () => {
    navigation.navigate('MainScreen');
    setItem('onboarded','1');
  }

  const doneButton = ({...props}) => {
    return(
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={doneBang}
        onSkip={doneBang}
        DoneButtonComponent={doneButton}
        containerStyles={{paddingHorizontal: 20}}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: '#DA7297',
            image: (
              <View style={styles.animation}>
                <LottieView
                  source={require('../../assets/animation/kelima.json')}
                  style={{flex: 1}}
                  autoPlay
                  loop
                  speed={2}
                />
              </View>
            ),
            title: 'Mobile Dcc',
            subtitle:
              'Memberikan Informasi Seputar Study Club Dipanegara Computer Club (DCC)',
          },
          {
            backgroundColor: '#FDFFD2',
            image: (
              <View style={styles.animation}>
                <LottieView
                  source={require('../../assets/animation/keempat.json')}
                  style={{flex: 1}}
                  autoPlay
                  loop
                  // speed={2}
                />
              </View>
            ),
            title: 'KUIS',
            subtitle:
              'Latih Pengetahuan Kalian Seputar Dunia Teknologi dengan Bermain Kuis dan Raih Skor Tertinggi!',
          },
          {
            backgroundColor: '#A0937D',
            image: (
              <View style={styles.animation}>
                <LottieView
                  source={require('../../assets/animation/enam.json')}
                  style={{flex: 1}}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'E-Learning',
            subtitle:
              'Belajar Secara Online Dimana Pun dan Kapan Pun Secara Gratis!',
          },
          {
            backgroundColor: '#009FBD',
            image: (
              <View style={styles.animation}>
                <LottieView
                  source={require('../../assets/animation/tujuh.json')}
                  style={{flex: 1}}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Open Rekrutment',
            subtitle:
              'Mari Bergabung Dengan Kami,                    #Kita Bertemu Untuk Sesuatu Yang Mulia',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', 
  },
  animation:{
    width: 393,
    height: 400,
  },
  doneButton: {
    padding: w(4),
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
  },
  doneButtonText: {
    fontSize: w(4),
    fontWeight: 'bold',
  }
});
