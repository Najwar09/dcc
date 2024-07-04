import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import logo from '../../assets/icons/logo.png'; // Pastikan file logo.png sudah tersedia di folder assets/icons

const BeforeForm = ({navigation}) => {
  const handlePress = () => {
    // Navigasi ke halaman form registrasi bisa ditambahkan di sini
    navigation.navigate('FormRegis');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.subtitle}>
        Silakan isi form pendaftaran untuk bergabung dengan kami.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Mulai Pendaftaran</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BeforeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: w(5),
  },
  logo: {
    width: w(40),
    height: w(40),
    resizeMode: 'contain',
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
