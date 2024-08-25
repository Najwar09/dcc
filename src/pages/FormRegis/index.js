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
  Button,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const FormRegis = () => {
  const navigation = useNavigation();

  const [currentForm, setCurrentForm] = useState(1);

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
  const [foto, setFoto] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [speed, setSpeed] = useState(0.8);

  // Arahkan ke FORM 2
  const handleSubmission = () => {
    setCurrentForm(2);
  };

  // fungsi ini dijalankan ketika tombol DAFTAR ditekan
  const handleSubmission2 = async () => {
    // membuat kode random
    const kode_unik = Math.floor(10000 + Math.random() * 90000);
    // membuat const untuk menampung semua nilai dari useState form
    const newParticipant = {
      nama,
      stambuk: nim,
      email,
      no_telp: noTelpon,
      angkatan,
      tempat_lahir: tempatLahir,
      tgl_lahir: tanggalLahir,
      jkl: jenisKelamin,
      alamat,
      asal,
      agama,
      nama_ayah: namaAyah,
      nama_ibu: namaIbu,
      organisasi,
      alasan: alasanDaftar,
      foto,
      kode_unik,
    };
    // POST DATA
    try {
      await axios.post(
        'https://dcc-testing.campa-bima.online/public/api/documentation#/Calgot/44a193a9f586b13837e9da930bef1769',
        newParticipant,
      );
      // setelah data berhasil disimpan, kemudian pindah ke afterForm dan kirim nilai uniquNumberset
      setLoading(true);
      setTimeout(() => {
        navigation.replace('AfterForm', {newParticipant});
      }, 3500);
    } catch (error) {
      console.log(error);
      console.log(newParticipant);
      alert(error.message);
    }
  };

  const viewInputForm1 = () => {
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

    return data.map(({placeholder, label, type}, key) =>
      inputKolom(placeholder, label, key, type),
    );
  };

  const viewInputForm2 = () => {
    const data = [
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
    ];
    return data.map(({placeholder, label}, key) =>
      inputKolom(placeholder, label, key),
    );
  };

  const inputKolom = (placeholder, label, key, type) => {
    return (
      <View
        key={key}
        style={{
          marginTop: label == 'Nama' ? h(5) : h(3),
          flex: 1,
          marginLeft: w(4),
          height: h(10),
        }}>
        <Text style={style.labelInput}>{label}</Text>
        {label == 'Tanggal Lahir' ? (
          <TextInput
            value={tanggalLahir}
            keyboardType={type}
            placeholder={placeholder}
            placeholderTextColor={'#595959'}
            style={style.TextInput}
            onPress={() => validasiDate()}></TextInput>
        ) : (
          <TextInput
            keyboardType={type}
            placeholder={placeholder}
            placeholderTextColor={'#595959'}
            style={style.TextInput}
            onChangeText={data => validasiInput(data, label)}
          />
        )}
      </View>
    );
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
    } else if (label == 'Asal') {
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

  // TIPE Inputan Tanggal Lahir
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

  // RadioBoxKelamin
  const inputKelamin = () => {
    return (
      <View
        style={{
          marginTop: h(3),
          flex: 1,
          marginLeft: w(4),
          height: h(8),
        }}>
        <Text style={style.labelInput}>Jenis Kelamin</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: h(0.6),
          }}>
          <TouchableOpacity
            style={style.radioBoxKelamin}
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
            style={style.radioBoxKelamin}
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

  const ubahKelamin = jenis => {
    jenis == 'Pria' ? setPria(jenis) : setPria(null);
    jenis == 'Wanita' ? setWanita(jenis) : setWanita(null);
    setJenisKelamin(jenis);
  };

  // const openCamera = () => {
  //   launchCamera({}, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       setFoto(response.assets[0].uri);
  //     }
  //   });
  // };

  const openImageLibrary = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setFoto(response.assets[0].uri);
      }
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
      {currentForm == 1 && (
        <View>
          {viewInputForm1()}
          {inputKelamin()}
          <View
            style={{
              marginTop: h(2),
              flex: 1,
              marginLeft: w(4),
              height: h(10),
              marginBottom: h(1),
            }}>
            <Text style={style.labelInput}>Alamat</Text>
            <TextInput
              keyboardType={'default'}
              placeholder={'Masukkan Alamat Anda'}
              placeholderTextColor={'#595959'}
              style={style.TextInput}
              onChangeText={data => setAlamat(data)}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={style.button}
              onPress={() => handleSubmission()}>
              <Text style={style.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {currentForm == 2 && (
        <View>
          <View
            style={{
              marginTop: h(5),
              flex: 1,
              marginLeft: w(4),
              height: h(9.5),
            }}>
            <Text style={style.labelInput}>Asal</Text>
            <TextInput
              value={asal}
              keyboardType={'default'}
              placeholder={'Masukkan Asal Anda'}
              placeholderTextColor={'#595959'}
              style={style.TextInput}
              onChangeText={value => validasiInput(value, 'Asal')}></TextInput>
          </View>
          <View
            style={{
              marginTop: h(3),
              flex: 1,
              marginLeft: w(4),
              height: h(9.5),
            }}>
            <Text style={style.labelInput}>Agama</Text>
            <View style={style.pickerContainer}>
              <Picker
                style={style.picker}
                selectedValue={agama}
                onValueChange={label => setAgama(label)}>
                <Picker.Item
                  label="Pilih Agama Anda"
                  value=""
                  enabled={false}
                />
                <Picker.Item label="Islam" value="Islam" />
                <Picker.Item label="Kristen" value="Kristen" />
                <Picker.Item label="Katholik" value="Katholik" />
                <Picker.Item label="Hindu" value="Hindu" />
                <Picker.Item label="Buddha" value="Buddha" />
                <Picker.Item label="Konghucu" value="Konghucu" />
              </Picker>
            </View>
          </View>
          {viewInputForm2()}
          <View
            style={{
              marginTop: h(3),
              flex: 1,
              marginLeft: w(4),
              height: h(8),
              marginBottom: h(5),
            }}>
            <Text style={style.labelInput}>Alasan</Text>
            <TextInput
              placeholder="Masukkan Alasan Anda Bergabung"
              style={{
                width: w(93),
                height: h(10),
                backgroundColor: '#F0F4F7',
                elevation: 2,
                borderRadius: w(4),
                paddingLeft: w(4),
                fontStyle: 'italic',
              }}
              multiline={true}
              numberOfLines={2}
              onChangeText={value => validasiInput(value, 'Alasan')}
            />
          </View>

          <View
            style={{
              marginTop: h(2),
              flex: 1,
              marginLeft: w(4),
              height: h(8),
              marginBottom: h(1),
              justifyContent: 'center',
              paddingLeft: w(2),
            }}>
            {foto ? (
              <Image
                source={{uri: foto}}
                style={{
                  height: h(20),
                  width: w(20),
                }}
              />
            ) : (
              <Text>Tidak Foto yang di Pilih</Text>
            )}
            <TouchableOpacity
              style={{
                width: w(50),
                height: h(4),
                backgroundColor: '#3570E4',
                justifyContent: 'center',
                paddingLeft: w(4),
                paddingBottom: h(0.5),
                borderRadius: w(1),
                elevation: 1,
                marginTop: h(0.5),
              }}
              onPress={openImageLibrary}>
              <Text
                style={{
                  color: 'white',
                  fontSize: w(3.5),
                  fontFamily: 'Poppins-Reguler',
                  textTransform: 'uppercase',
                }}>
                Open Album
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={style.button}
              onPress={() => handleSubmission2()}>
              <Text style={style.buttonText}>Daftar</Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <Modal
              transparent={true}
              visible={isLoading}
              onRequestClose={() => setLoading(false)}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <LottieView
                source={animasiLoading}
                autoPlay
                loop={true}
                speed={speed}
                resizeMode="center"
                style={{
                  width: w(60),
                  height: h(30),
                  marginBottom: h(3),
                }}
              />
            </Modal>
          ) : null}
        </View>
      )}
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
  labelInput: {
    fontSize: w(4),
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: w(4),
    bottom: h(1),
  },
  TextInput: {
    width: w(93),
    height: h(6),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    paddingLeft: w(4),
    fontStyle: 'italic',
  },
  button: {
    height: h(6),
    width: w(42),
    borderRadius: w(8),
    backgroundColor: '#3570E4',
    marginBottom: h(3),
    marginTop: h(3),
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: w(6.5),
    marginTop: h(-0.3),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  radioBoxKelamin: {
    width: w(5),
    height: h(2.5),
    borderRadius: w(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: w(0.6),
    marginRight: w(2),
    marginLeft: w(4),
  },
});
