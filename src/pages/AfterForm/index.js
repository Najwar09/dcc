import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import successAnimation from '../../assets/animation/done.json';
import {useRoute, useNavigation} from '@react-navigation/native';

const AfterForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const code = route.params?.code;

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
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Kode Unik Anda:</Text>
        <Text style={styles.code}>{code}</Text>
      </View>
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
    width: w(60),
    height: h(30),
    marginBottom: h(3),
  },
  title: {
    fontSize: w(8),
    fontWeight: 'bold',
    marginBottom: h(1),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: w(5),
    marginBottom: h(4),
    textAlign: 'center',
    paddingHorizontal: w(10),
  },
  button: {
    elevation: 3,
    borderRadius: w(5),
    overflow: 'hidden',
    marginTop: h(2),
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
  codeContainer: {
    marginTop: h(4),
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: h(1),
    paddingHorizontal: w(5),
    borderRadius: w(2),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  codeLabel: {
    fontSize: w(4.5),
    marginBottom: h(1),
    fontWeight: 'bold',
    color: '#333',
  },
  code: {
    fontSize: w(6),
    color: '#0088FF',
    fontWeight: 'bold',
  },
});
