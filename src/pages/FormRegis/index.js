import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LogoImage from '../../assets/icons/logo.png';

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

  // fungsi ini dijalankan ketika tombol Next ditekan
  const handleSubmission = async () => {
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
    };
    return navigation.navigate('Form2', {newParticipant});
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
    }
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
        </View>
      );
    });
  };

  const ubahKelamin = (nilai, jenis) => {
    jenis == 'Laki-Laki' ? setPria(nilai) : setPria(null);
    jenis == 'Perempuan' ? setWanita(nilai) : setWanita(null);
    setJenisKelamin(jenis);
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
          }}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={pria ? '#5B85D8' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={nilai => ubahKelamin(nilai, 'Laki-Laki')}
            value={pria}
            style={{marginLeft: w(6)}}
          />
          <Text>Laki-Laki</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={wanita ? '#5B85D8' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={nilai => ubahKelamin(nilai, 'Perempuan')}
            value={wanita}
            style={{marginLeft: w(6)}}
          />
          <Text>Perempuan</Text>
        </View>
      </View>
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
