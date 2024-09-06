import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import logo from '../../assets/icons/logo.png';
import axios from 'axios';

const CekStambuk = ({navigation}) => {
  const [stambuk, setStambuk] = useState('');

  // Fungsi untuk mengecek stambuk di API
  const handleCheckStambuk = async () => {
    if (!stambuk) {
      Alert.alert('Peringatan', 'Masukkan Stambuk Anda Dulu');
      return;
    }

    try {
      const response = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/calgot', // Ganti dengan endpoint yang sesuai jika diperlukan
      );
      const data = response.data.data;

      // Mencari stambuk yang diinput dalam data yang diterima dari API
      const stambukTerdaftar = data.find(item => item.stambuk === stambuk);

      if (stambukTerdaftar) {
        // Jika stambuk ditemukan, arahkan ke MainScreen
        Alert.alert('INFO', 'Stambuk Anda sudah terdaftar sebelumnya', [
          {
            text: 'OK',
            onPress: () => navigation.replace('AfterForm', {stambukTerdaftar}),
          },
        ]);
      } else {
        // Jika stambuk tidak ditemukan, tampilkan alert dan arahkan ke BeforeForm
        Alert.alert('INFO', 'Stambuk anda belum terdaftar Ayo DAFTAR', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BeforeForm', {data}),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F7F8'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F5F7F8'} />
      <View
        style={{
          alignItems: 'center',
          marginTop: h(10),
        }}>
        <Image source={logo} style={{width: 141, height: 87}} />
        <Text
          style={{
            color: '#0000FE',
            fontSize: w(5),
            fontFamily: 'Inter-Regular',
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          Dipanegara Computer Club
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          height: h(10),
          marginTop: h(3),
          borderTopRightRadius: w(12),
          opacity: 0.7,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#79A1ED',
          height: w(135),
          marginTop: h(-9),
          borderTopRightRadius: w(13),
          elevation: 2,
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: w(10), color: '#ffffff', fontWeight: '600'}}>
          Selamat Datang!
        </Text>
        <Text
          style={{
            marginTop: 15,
            marginLeft: 54,
            marginRight: 54,
            color: '#ffffff',
            paddingHorizontal: 1,
            fontSize: w(4),
            fontStyle: 'italic',
          }}>
          Silahkan Cek Stambuk Anda
        </Text>
        <View style={styles.addressContainer}>
          <TextInput
            keyboardType="default"
            placeholder="Masukkan Stambuk Anda"
            placeholderTextColor={'#595959'}
            style={styles.addressInput}
            maxLength={6}
            onChangeText={text => setStambuk(text)} // Simpan teks input
            value={stambuk} // Tambahkan ini untuk memastikan TextInput mengontrol state
          />
        </View>

        <TouchableOpacity
          style={{
            width: w(50),
            height: h(6),
            borderRadius: w(20),
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 1,
            backgroundColor: '#ffffff',
            elevation: 3,
            position: 'absolute',
            top: h(30),
          }}
          onPress={handleCheckStambuk} // Panggil fungsi pengecekan stambuk
        >
          <Text style={{fontSize: w(5), color: '#3570E4', fontWeight: 'bold'}}>
            Cek Stambuk
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: h(4),
    flex: 1,
    height: h(10),
  },
  addressInput: {
    width: w(60),
    height: h(8),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    fontStyle: 'italic',
    color: '#000000',
    textAlign: 'center',
    fontSize: w(5),
  },
});

export default CekStambuk;
