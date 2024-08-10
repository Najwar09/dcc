import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import AfterForm from '../AfterForm';
import LogoImage from '../../assets/icons/logo.png';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import animasiLoading from '../../assets/animation/LoaderPendaftaranCalgot.json';

const Form2 = newParticipant => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.newParticipant;

  const [asal, setAsal] = useState('');
  const [agama, setAgama] = useState('');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [alasanDaftar, setAlasanDaftar] = useState('');

  const [isLoading, setLoading] = useState(false);

  // const [loading, setLoading] = useState(false);

  const handleRegis = async ({
    nama,
    nim,
    email,
    noTelpon,
    angkatan,
    tempatLahir,
    tanggalLahir,
    jenisKelamin,
    alamat,
  }) => {
    // membuat kode random
    setLoading(true);
    const uniqueNumber = Math.floor(10000 + Math.random() * 90000);

    const newParticipant2 = {
      nama,
      nim,
      email,
      noTelpon,
      angkatan,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
      asal,
      agama,
      namaAyah,
      namaIbu,
      organisasi,
      alasanDaftar,
      uniqueNumber,
    };
    // POST DATA
    try {
      await axios.post('http://10.0.2.2:3000/participants', newParticipant2);
      // setelah data berhasil disimpan, kemudian pindah ke afterForm dan kirim nilai uniquNumberset

      setTimeout(() => {
        navigation.replace('afterForm', {newParticipant2});
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const validasiInput = (data, label) => {
    if (label == 'Asal') {
      setAsal(data);
    } else if (label == 'Agama') {
      setAgama(data);
    } else if (label == 'Nama Ayah') {
      setNamaAyah(data);
    } else if (label == 'Nama Ibu') {
      setNamaIbu(data);
    } else if (label == 'Pengalaman Organisasi') {
      setOrganisasi(data);
    } else if (label == 'Alasan') {
      setAlasanDaftar(data);
    }
  };

  const inputKolom = () => {
    const data = [
      {
        placeholder: 'Masukkan Asal Anda',
        label: 'Asal',
      },
      {
        placeholder: 'Masukkan Agama Anda',
        label: 'Agama',
      },
      {
        placeholder: 'Masukkan Nama Ayah Anda',
        label: 'Nama Ayah',
      },
      {
        placeholder: 'Masukkan Nama Ibu Anda',
        label: 'Nama Ibu',
      },
      {
        placeholder: 'Masukkan Pengalaman Organisasi Anda',
        label: 'Pengalaman Organisasi',
      },
      {
        placeholder: 'Alasan Anda Bergabung Dengan DCC',
        label: 'Alasan',
      },
    ];

    return data.map(({placeholder, label}, key) => {
      return (
        <View
          key={key}
          style={{
            marginTop: label == 'Asal' ? h(5) : h(3),
            flex: 1,
            marginLeft: w(4),
            height: h(10),
          }}>
          <Text
            style={{
              fontSize: w(4),
              color: '#000000',
              fontWeight: 'bold',
              marginLeft: w(4),
              bottom: h(1),
            }}>
            {label}
          </Text>
          <TextInput
            keyboardType={'default'}
            placeholder={placeholder}
            placeholderTextColor={'#595959'}
            style={{
              width: w(93),
              height: h(6),
              backgroundColor: '#F0F4F7',
              elevation: 2,
              borderRadius: w(4),
              paddingLeft: w(4),
              fontStyle: 'italic',
            }}
            onChangeText={data => validasiInput(data, label)}
          />
        </View>
      );
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#ffffff'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#ffffff'}
        showHideTransition={'slide'}
      />
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={LogoImage}
          style={{width: w(35), height: h(35), marginTop: h(-6)}}
          resizeMode="center"
        />
        <Text
          style={{
            textTransform: 'uppercase',
            color: 'black',
            fontWeight: 'bold',
            fontSize: w(6),
            marginTop: h(-10),
          }}>
          Form Pendaftaran
        </Text>
      </View>
      {inputKolom()}
      {isLoading ? (
        <LottieView
          source={'../../assets/animation/LoaderPendaftaranCalgot.json'}
          autoPlay
          loop
          resizeMode="center"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -1,
          }}
        />
      ) : null}

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: h(6),
            width: w(42),
            borderRadius: w(8),
            backgroundColor: '#3570E4',
            marginBottom: h(3),
            marginTop: h(4),
            justifyContent: 'center',
            elevation: 3,
          }}
          onPress={() => handleRegis(data)}>
          <Text
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontSize: w(5),
              marginTop: h(-0.3),
              fontWeight: '600',
              textTransform: 'uppercase',
            }}>
            SELESAI
          </Text>
        </TouchableOpacity>
        {/* U */}
      </View>
    </ScrollView>
  );
};

export default Form2;
