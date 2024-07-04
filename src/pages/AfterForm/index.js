import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import successAnimation from '../../assets/animation/done.json';

const AfterForm = ({navigation}) => {
  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={successAnimation}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <Text style={styles.title}>Pendaftaran Berhasil!</Text>
      <Text style={styles.subtitle}>
        Terima kasih telah mendaftar dengan kami.
      </Text>
      <Pressable
        style={({pressed}) => [
          {
            transform: pressed ? [{scale: 0.95}] : [{scale: 1}],
          },
          styles.button,
        ]}
        onPress={handleContinue}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}>
          <Text style={styles.buttonText}>Lanjutkan</Text>
        </LinearGradient>
      </Pressable>
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
    elevation: 3,
    borderRadius: w(5),
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: h(2),
    paddingHorizontal: w(10),
    borderRadius: w(5),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: w(5),
    fontWeight: 'bold',
  },
});
