import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoDcc from '../../assets/icons/logo.png';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
          checkNavigation();
        }, 1000);
    }, [navigation]);

    const checkNavigation = async () => {
      try {
        const onboarded = await AsyncStorage.getItem('onboarded');
        console.log(onboarded);
        if (onboarded == '1') {
          // hide onboarding
            navigation.replace('MainScreen');
        } else {
          // show onboarding
            navigation.replace('OnboardingScreen');
        }
      } catch (error) {
        console.error('Failed to fetch the data from storage', error);
      }
    };

    return (
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#d4f0fe', '#14b1ff']}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1.3}}>
          <Image source={LogoDcc} style={styles.logo} />
          <Text style={styles.teks}>DIPANEGARA COMPUTER CLUB</Text>

          {/* <ActivityIndicator size={'large'} style={{marginTop: 100}} /> */}
          <View style={{height: 30, marginVertical: 50}}>
            <PacmanIndicator color="blue" size={80} />
          </View>

          {/* <Text style={{textAlign: 'center'}}>Create By Dipanegara Computer Club</Text> */}
        </LinearGradient>
      </View>
    );
};

export default Splash;
const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: 200,
    },
    teks: {
        fontWeight: 'bold',
        fontSize: 19,
        paddingTop: 1,
        color: 'black',
 
    },
});
