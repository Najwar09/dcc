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
  const [modal, setModal] = useState(true);

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
      const response = await axios.post(
        'https://api-mobile.dcc-dp.com/api/cek-stambuk',
        {stambuk}, // Ganti dengan endpoint yang sesuai jika diperlukan
      );
      const data = response.data.status;

      // Mencari stambuk yang diinput dalam data yang diterima dari API
      // const stambukTerdaftar = data.find(item => item.stambuk === stambuk);
      console.log(data);

      if (stambuk.length == 6) {
        if (data == true) {
          Alert.alert('INFO', 'Stambuk anda Telah Terdaftar', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('AfterForm'),
            },
          ]);
        } else {
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
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text
              style={{fontSize: w(10), color: '#ffffff', fontWeight: '600'}}>
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={hideModal}>
              <View style={styles.modalOverlay}>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                  style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderRadius: w(5),
                    width: w(9),
                    height: h(4.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: h(4.8),
                    right: w(2),
                    zIndex: 1,
                    elevation: 6,
                  }}>
                  <Image
                    source={require('../../assets/images/exitX.png')}
                    resizeMode="cover"
                    style={{width: w(6), height: h(3)}}
                  />
                </TouchableOpacity>
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: w(3),
          top: h(83),
          backgroundColor: '#EEEDEB',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: w(12),
          elevation: 5,
        }}
        onPress={visibleModal}>
        <Image
          source={require('../../assets/images/Pamflet.png')}
          resizeMode="center"
          style={{
            marginTop: h(2.5),
            marginRight: w(2),
            marginLeft: w(2),
            width: w(12),
            height: h(6),
          }}
        />
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: 'black',
            fontSize: w(2.5),
            marginBottom: h(2),
            marginRight: w(5),
            marginLeft: w(5),
          }}>
          Lihat Pamflet
        </Text>
      </TouchableOpacity>
    </View>
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
});

export default CekStambuk;
