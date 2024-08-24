import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LogoImage from '../../assets/icons/logo.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';
import animasiLoading from '../../assets/animation/LoaderPendaftaranCalgot.json';
import {Modal} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const FormRegis = () => {
  const navigation = useNavigation();

  // useState setiap inputan pada form
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [noTelpon, setNoTelpon] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');

  const [jenisKelamin, setJenisKelamin] = useState('');
  const [pria, setPria] = useState('');
  const [wanita, setWanita] = useState('');

  const [alamat, setAlamat] = useState('');
  const [asal, setAsal] = useState('');
  const [agama, setAgama] = useState('');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [alasanDaftar, setAlasanDaftar] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [speed, setSpeed] = useState(0.8);

  // fungsi ini dijalankan ketika tombol Next ditekan
  const handleSubmission = async () => {
    // membuat kode random
    const uniqueNumber = Math.floor(10000 + Math.random() * 90000);
    // membuat const untuk menampung semua nilai dari useState form
    const newParticipant = {
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
      await axios.post('http://10.0.2.2:3000/participants', newParticipant);
      // setelah data berhasil disimpan, kemudian pindah ke afterForm dan kirim nilai uniquNumberset
      setLoading(true);
      setTimeout(() => {
        navigation.replace('AfterForm', {newParticipant});
      }, 3500);
    } catch (error) {
      alert(error.message);
    }
  };

  const validasiInput = (data, label) => {
    if (label == 'Nama') {
      setNama(data);
    } else if (label == 'Nim') {
      setNim(data);
    } else if (label == 'Email') {
      setEmail(data);
    } else if (label == 'Nomor Hp') {
      setNoTelpon(data);
    } else if (label == 'Angkatan') {
      setAngkatan(data);
    } else if (label == 'Tempat Lahir') {
      setTempatLahir(data);
    } else if (label == 'Tanggal Lahir') {
      setTanggalLahir(data);
    } else if (label == 'asal') {
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

  // Inputan Tanggal Lahir
  const validasiDate = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setTanggalLahir(formatDate(selectedDate));
        }
      },
    });
  };

  // Format Inputan Tanggal Lahir
  const formatDate = date => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleString(undefined, options);
  };

  const inputKolom = () => {
    const data = [
      {
        placeholder: 'Masukkan Nama Anda',
        label: 'Nama',
        type: 'default',
      },
      {
        placeholder: 'Masukkan Nim Anda',
        label: 'Nim',
        type: 'number-pad',
      },
      {
        placeholder: 'Masukkan Email Anda',
        label: 'Email',
        type: 'email-address',
      },
      {
        placeholder: 'Masukkan No.hp Anda',
        label: 'Nomor Hp',
        type: 'number-pad',
      },
      {
        placeholder: 'Masukkan Angkatan Anda',
        label: 'Angkatan',
        type: 'number-pad',
      },
      {
        placeholder: 'Masukkan Tempat Lahir Anda',
        label: 'Tempat Lahir',
        type: 'default',
      },
      {
        placeholder: 'Masukkan Tanggal Lahir Anda',
        label: 'Tanggal Lahir',
        type: 'default',
      },
    ];

    return data.map(({placeholder, label, type}, key) => {
      return (
        <View
          key={key}
          style={{
            marginTop: label == 'Nama' ? h(5) : h(3),
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
          {label == 'Tanggal Lahir' ? (
            <TextInput
              value={tanggalLahir}
              keyboardType={type}
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
              onPress={() => validasiDate()}></TextInput>
          ) : (
            <TextInput
              keyboardType={type}
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
          )}
        </View>
      );
    });
  };

  const ubahKelamin = jenis => {
    jenis == 'Pria' ? setPria(jenis) : setPria(null);
    jenis == 'Wanita' ? setWanita(jenis) : setWanita(null);
    setJenisKelamin(jenis);
  };

  const inputKelamin = () => {
    return (
      <View
        style={{
          marginTop: h(3),
          flex: 1,
          marginLeft: w(4),
          height: h(8),
        }}>
        <Text
          style={{
            fontSize: w(4),
            color: '#000000',
            fontWeight: 'bold',
            marginLeft: w(4),
            bottom: h(1),
          }}>
          Jenis Kelamin
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: h(0.6),
          }}>
          <TouchableOpacity
            style={{
              width: w(5),
              height: h(2.5),
              borderRadius: w(8),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              borderWidth: w(0.6),
              marginRight: w(2),
              marginLeft: w(4),
            }}
            onPress={() => ubahKelamin('Pria')}>
            {pria == 'Pria' ? (
              <Image
                source={require('../../assets/icons/check.png')}
                style={{width: w(4), height: h(2)}}
              />
            ) : null}
          </TouchableOpacity>
          <Text>Pria</Text>
          <TouchableOpacity
            style={{
              width: w(5),
              height: h(2.5),
              borderRadius: w(8),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
              borderWidth: w(0.6),
              marginRight: w(2),
              marginLeft: w(4),
            }}
            onPress={() => ubahKelamin('Wanita')}>
            {wanita == 'Wanita' ? (
              <Image
                source={require('../../assets/icons/check.png')}
                style={{width: w(4), height: h(2)}}
              />
            ) : null}
          </TouchableOpacity>
          <Text>Wanita</Text>
        </View>
      </View>
    );
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
      {inputKelamin()}
      <View
        style={{
          marginTop: h(2),
          flex: 1,
          marginLeft: w(4),
          height: h(10),
          marginBottom: h(1),
        }}>
        <Text
          style={{
            fontSize: w(4),
            color: '#000000',
            fontWeight: 'bold',
            marginLeft: w(4),
            bottom: h(1),
          }}>
          Alamat
        </Text>
        <TextInput
          keyboardType={'default'}
          placeholder={'Masukkan Alamat Anda'}
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
          onChangeText={data => setAlamat(data)}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: h(6),
            width: w(42),
            borderRadius: w(8),
            backgroundColor: '#3570E4',
            marginBottom: h(3),
            marginTop: h(3),
            justifyContent: 'center',
            elevation: 3,
          }}
          onPress={() => handleSubmission()}>
          <Text
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontSize: w(6.5),
              marginTop: h(-0.3),
              fontWeight: '500',
              textTransform: 'uppercase',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormRegis;
const style = StyleSheet.create({
  pickerContainer: {
    width: w(93),
    height: h(6),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(12),
    paddingLeft: w(1),
    fontStyle: 'italic',
  },
  picker: {
    marginTop: h(-0.4),
  },
});
