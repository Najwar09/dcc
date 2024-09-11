import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoAnimation from '../../assets/animation/bacotoro10.json';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      checkNavigation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const checkNavigation = async () => {
    try {
      const onboarded = await AsyncStorage.getItem('onboarded');
      console.log(onboarded);
      if (onboarded === '1') {
        // sembunyikan onboarding
        navigation.replace('MainScreen');
      } else {
        // tampilkan onboarding
        navigation.replace('OnboardingScreen');
      }
    } catch (error) {
      console.error('Failed to fetch the data from storage', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#d4f0fe', '#14b1ff']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.3}}>
        <LottieView source={logoAnimation} autoPlay loop style={styles.logo} />
      </LinearGradient>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: w(150), 
    height: h(150), 
  },
});
