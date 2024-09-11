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
  ScrollView,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import logo from '../../assets/icons/logo.png';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

const CekStambuk = ({navigation}) => {
  const [stambuk, setStambuk] = useState('');
  const [modal, setModal] = useState(false);

  // Fungsi untuk mengecek stambuk di API
  const handleCheckStambuk = async () => {
    if (!stambuk) {
      Alert.alert('Peringatan', 'Masukkan Stambuk Anda Dulu');
      return;
    }

    // Proses Validasi Format NIM
    const isNumericString = value => {
      // Mengonversi string menjadi angka dan cek apakah hasilnya adalah angka yang valid
      const number = Number(value);
      return (
        !Number.isNaN(number) &&
        /^\d+$/.test(number) &&
        number.toString() === value
      );
    };

    if (!isNumericString(stambuk)) {
      Alert.alert(
        'Peringatan',
        'Stambuk harus berbentuk ANGKA dan sesuai Format NIM !',
      );
      return;
    }

    try {
      const response = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/calgot', // Ganti dengan endpoint yang sesuai jika diperlukan
      );
      const data = response.data.data;

      // Mencari stambuk yang diinput dalam data yang diterima dari API
      const stambukTerdaftar = data.find(item => item.stambuk === stambuk);

      if (stambuk.length == 6) {
        if (stambukTerdaftar) {
          // Jika stambuk ditemukan, arahkan ke MainScreen
          Alert.alert('INFO', 'Stambuk Anda sudah terdaftar sebelumnya', [
            {
              text: 'OK',
              onPress: () =>
                navigation.replace('AfterForm', {stambukTerdaftar}),
            },
          ]);
        } else {
          // Jika stambuk tidak ditemukan, tampilkan alert dan arahkan ke BeforeForm
          Alert.alert('INFO', 'Stambuk anda belum terdaftar Ayo DAFTAR', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('BeforeForm', {stambuk}),
            },
          ]);
        }
      } else {
        Alert.alert('INFO', 'Stambuk yang Anda Input harus 6 Digit!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const visibleModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F5F7F8'}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#F5F7F8'} />
        <View
          style={{
            alignItems: 'center',
            marginTop: h(6),
          }}>
          <Image source={logo} style={{width: 141, height: 87}} />
          <Text
            style={{
              color: '#0000FE',
              fontSize: w(5),
              fontFamily: 'Inter-Regular',
              fontWeight: 'bold',
              marginTop: h(1.3),
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
            height: w(142),
            marginTop: h(-9),
            borderTopRightRadius: w(13),
            elevation: 2,
            alignItems: 'center',
            paddingTop: h(3),
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
              keyboardType="number-pad"
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
              backgroundColor: '#595959',
              elevation: 3,
              position: 'absolute',
              top: h(30),
            }}
            onPress={handleCheckStambuk} // Panggil fungsi pengecekan stambuk
          >
            <Text
              style={{fontSize: w(5), color: '#ffffff', fontWeight: 'bold'}}>
              Cek Stambuk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: h(2.5),

              width: w(32.5),
              height: h(30.2),
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
            onPress={visibleModal}>
            <Image
              source={require('../../assets/images/event/Penerimaa.jpeg')}
              resizeMode="center"
              style={{
                width: w('100%'),
                height: h('30%'),
              }}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={hideModal}>
            <View style={styles.modalOverlay}>
              <Image
                source={require('../../assets/images/event/Penerimaa.jpeg')}
                // resizeMode="contain"
                style={{width: w(90), height: w(165)}}
              />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: h(3),
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
    fontSize: w(4.5),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay color
  },
  // modalView: {
  //   margin: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
});

export default CekStambuk;
