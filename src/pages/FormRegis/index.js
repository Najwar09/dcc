import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Alert,
  Linking,
  Pressable,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  const route = useRoute();
  const cekStambuk = route.params?.dataStb;
  const newStambuk = route.params?.newNim;
  // console.log(newStambuk);

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
  const [nameFoto, setNameFoto] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [speed, setSpeed] = useState(0.8);

  console.log('variabel nim ', nim);
  console.log('new stambk ', newStambuk);
  
  useEffect(() => {
    if (newStambuk) {
      setNim(newStambuk);
    }
  },[newStambuk])
  
  // Arahkan ke FORM 2
  const handleSubmission = () => {
    if (
      !nama ||
      !nim ||
      !noTelpon ||
      !tempatLahir ||
      !tanggalLahir ||
      !jenisKelamin ||
      !alamat
    ) {
      Alert.alert('Failed', 'Isi semua Kolom Inputan anda');
    } else {
      validasiStambuk();
    }
  };
  
  const validasiStambuk = () => {
    // Validasi agar Stambuk yg di Input tidak sama dengan stambuk yg ad di API
    const cekStambuk2 = cekStambuk.find(item => item.stambuk == nim);

    if (cekStambuk2) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        Alert.alert('Failed', 'Stambuk yang anda Input sudah terdaftar', [
          {
            text: 'OKE',
            onPress: () => setCurrentForm(1),
          },
        ]);
      }, 3000);
    } else {
      setCurrentForm(2);
    }
  };

  // fungsi ini dijalankan ketika tombol DAFTAR ditekan
  const handleSubmission2 = async () => {
    // // membuat kode random
    // const kode_unik = Math.floor(10000 + Math.random() * 90000);

    // Validasi utk mnghindari kolom inputan yg tdk di isi
    if (
      !asal ||
      !agama ||
      !namaAyah ||
      !namaIbu ||
      !organisasi ||
      !alasanDaftar ||
      !foto
    ) {
      Alert.alert('FAILED', 'Anda harus mengisi semua kolom inputan !');
    } else {
      const formData = new FormData();
      formData.append('stambuk', nim);
      formData.append('nama', nama);
      formData.append('tempat_lahir', tempatLahir);
      formData.append('tgl_lahir', tanggalLahir);
      formData.append('jkl', jenisKelamin);
      formData.append('agama', agama);
      formData.append('no_telp', noTelpon);
      formData.append('alamat', alamat);
      formData.append('ket', '-');
      formData.append('asal', asal);
      formData.append('nama_ayah', namaAyah);
      formData.append('nama_ibu', namaIbu);
      formData.append('organisasi', organisasi);
      formData.append('alasan', alasanDaftar);

      formData.append('foto', {
        uri: foto,
        type: 'image/jpg',
        name: nameFoto,
      });

      formData.append('angkatan', '27');

      try {
        const response = await axios.post(
          'https://dcc-testing.campa-bima.online/public/api/calgot/store',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          navigation.replace('AfterForm', {formData});
        }, 3500);

        // console.log(response.data.data.id);
      } catch (error) {
        Alert.alert('Error', 'Gagal mengirim data');
        console.error(
          'Error sending data: ',
          error.response?.data || error.message,
        );
      }

      console.log(formData);
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
      // {
      //   placeholder: 'Masukkan Email Anda',
      //   label: 'Email',
      //   type: 'email-address',
      // },
      {
        placeholder: 'Masukkan No.hp Anda',
        label: 'Nomor Hp',
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
    ];
    return data.map(({placeholder, label}, key) =>
      inputKolom(placeholder, label, key),
    );
  };

  const inputKolom = (placeholder, label, key, type,value) => {
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
            placeholderTextColor={'black'}
            style={style.TextInput}
            onPress={() => validasiDate()}></TextInput>
        ) : (
          <TextInput
            editable={label == 'Nim' ? false : true}
            keyboardType={type}
            placeholder={placeholder}
            placeholderTextColor={'black'}
            maxLength={label == 'Nim' ? 6 : null}
            value={label == 'Nim' ? newStambuk : null}
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
      setNim(newStambuk);
    } else if (label == 'Email') {
      setEmail(data);
    } else if (label == 'Nomor Hp') {
      setNoTelpon(data);
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
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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
            onPress={() => ubahKelamin('L')}>
            {pria == 'L' ? (
              <Image
                source={require('../../assets/icons/check.png')}
                style={{width: w(6), height: h(3)}}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={{color: 'black'}}>Pria</Text>
          <TouchableOpacity
            style={style.radioBoxKelamin}
            onPress={() => ubahKelamin('P')}>
            {wanita == 'P' ? (
              <Image
                source={require('../../assets/icons/check.png')}
                style={{width: w(6), height: h(3)}}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={{color: 'black'}}>Wanita</Text>
        </View>
      </View>
    );
  };

  const ubahKelamin = jenis => {
    jenis == 'L' ? setPria(jenis) : setPria(null);
    jenis == 'P' ? setWanita(jenis) : setWanita(null);
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
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('No photo selected');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        // Memastikan image adalah objek, bukan array
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          const urin =
            // Platform.OS === "android"
            //   ? selectedImage.uri
            //   : selectedImage.uri.replace("file://", "");\\const uri =
            Platform.OS === 'android' ? uri : uri.replace('file:///', '');
          const filename = uri.split('/').pop();
          const match = /\.(\w+)$/.exec(filename);
          const ext = match?.[1];
          const type = match ? `image/${match[1]}` : `image`;
          // console.log('cek :',type)
          setNameFoto(filename);
          setFoto(urin);
        }
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
              placeholderTextColor={'black'}
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
              placeholderTextColor={'black'}
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
                  label="--- Pilih Agama ---"
                  value=""
                  // enabled={false}
                  style={{color: 'black'}}
                />
                <Picker.Item label="Islam" value="I" style={{color: 'black'}} />
                <Picker.Item
                  label="Kristen"
                  value="KK"
                  style={{color: 'black'}}
                />
                <Picker.Item
                  label="Katholik"
                  value="KP"
                  style={{color: 'black'}}
                />
                <Picker.Item label="Hindu" value="H" style={{color: 'black'}} />
                <Picker.Item
                  label="Buddha"
                  value="B"
                  style={{color: 'black'}}
                />
                <Picker.Item
                  label="Konghucu"
                  value="KH"
                  style={{color: 'black'}}
                />
                <Picker.Item
                  label="Lainnya"
                  value="U"
                  style={{color: 'black'}}
                />
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
            <Text style={style.labelInput}>Pengalaman Organisasi</Text>
            <TextInput
              placeholder="Ceritakan jika ada"
              style={{
                width: w(93),
                height: h(10),
                backgroundColor: '#F0F4F7',
                elevation: 2,
                borderRadius: w(4),
                paddingLeft: w(4),
                fontStyle: 'italic',
                color: 'black',
              }}
              multiline={true}
              numberOfLines={2}
              placeholderTextColor={'black'}
              onChangeText={value =>
                validasiInput(value, 'Pengalaman Organisasi')
              }
            />
          </View>
          <View
            style={{
              marginTop: h(3),
              flex: 1,
              marginLeft: w(4),
              height: h(8),
              marginBottom: h(5),
            }}>
            <Text style={style.labelInput}>Alasan Daftar</Text>
            <TextInput
              placeholder="Masukkan Alasan Anda Bergabung"
              placeholderTextColor={'black'}
              style={{
                width: w(93),
                height: h(10),
                backgroundColor: '#F0F4F7',
                elevation: 2,
                borderRadius: w(4),
                paddingLeft: w(4),
                fontStyle: 'italic',
                color: 'black',
              }}
              multiline={true}
              numberOfLines={2}
              onChangeText={value => validasiInput(value, 'Alasan')}
            />
          </View>
          
          <View
            style={{
              marginTop: h(5),
              flex: 1,
              marginLeft: w(4),
              height: h(8),
              marginBottom: h(5),
              justifyContent: 'center',
              paddingLeft: w(2),
            }}>
            {foto ? (
              <Image
                source={{uri: foto}}
                resizeMode="cover"
                style={{
                  height: h(12),
                  width: w(30),
                }}
              />
            ) : (
              <Text style={{color: 'black'}}>Tidak Foto yang di Pilih</Text>
              // <Text style={style.labelInput}>Alasan</Text>
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
                Masukkan Foto
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
    color: 'black',
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
    color: 'black',
  },
  button: {
    height: h(6),
    width: w(42),
    borderRadius: w(8),
    backgroundColor: '#3570E4',
    marginBottom: h(4),
    marginTop: h(0.5),
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
    width: w(6),
    height: h(3),
    borderRadius: w(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: w(0.6),
    marginRight: w(2),
    marginLeft: w(4),
  },
});