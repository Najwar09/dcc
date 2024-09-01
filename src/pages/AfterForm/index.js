import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Clipboard,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import successAnimation from '../../assets/animation/done.json';
import {useRoute, useNavigation} from '@react-navigation/native';
import axios from 'axios';

const AfterForm = () => {
  const [Calgot, setCalgot] = useState({});

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  const handleCopyCode = () => {
    Clipboard.setString(Calgot.kode_unik);
    Alert.alert('Copied!', 'Kode unik telah disalin ke clipboard.');
  };

  const GetDataCalgot = async () => {
    try {
      const res = await axios.get(
        `https://dcc-testing.campa-bima.online/public/api/calgot/${id}`,
      );
      setCalgot(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataCalgot();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={successAnimation}
        autoPlay
        loop={true}
        style={styles.animation}
      />
      <Text
        style={{
          fontSize: w(8),
          fontWeight: 'bold',
          color: '#3570E4',
        }}>
        SELAMAT!
      </Text>
      <Text style={styles.title}>Pendaftaran Berhasil!</Text>
      <Text style={styles.subtitle}>
        Terima kasih telah mendaftar dengan kami.
      </Text>

      <View style={{alignItems: 'center', marginTop: h(4.5)}}>
        <Text style={{color: 'black', fontSize: w(4), fontStyle: 'italic'}}>
          Silahkan isi Quiz Dengan
        </Text>
        <Text style={{color: 'black', fontSize: w(4), fontStyle: 'italic'}}>
          Kode Dibawah ini!
        </Text>
      </View>
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Kode Unik Anda:</Text>
        <Pressable onPress={handleCopyCode}>
          <Text style={styles.code}>{Calgot.kode_unik}</Text>
        </Pressable>
      </View>
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
    marginTop: h(-8),
    width: w(60),
    height: h(30),
    marginBottom: h(2),
  },
  title: {
    fontSize: w(8),
    fontWeight: 'bold',
    marginBottom: h(1),
    textAlign: 'center',
    color: '#3570E4',
  },
  subtitle: {
    fontSize: w(5),
    marginBottom: h(-1),
    textAlign: 'center',
    paddingHorizontal: w(10),
    color: 'black',
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
    marginTop: h(1.2),
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
    color: '#3570E4',
    fontWeight: 'bold',
  },
});
