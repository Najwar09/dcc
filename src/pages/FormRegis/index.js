import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import axios from 'axios';
import LogoImage from '../../assets/icons/logo.png';

// kustom tombol radio button
const CustomRadioButton = ({label, value, selectedValue, onPress}) => (
  <TouchableOpacity
    style={styles.radioButtonContainer}
    onPress={() => onPress(value)}>
    <Icon
      name={selectedValue === value ? 'radio-button-on' : 'radio-button-off'}
      size={24}
      color={selectedValue === value ? '#0088FF' : '#ccc'}
    />
    <Text style={styles.radioButtonText}>{label}</Text>
  </TouchableOpacity>
);

const FormRegis = () => {
  const navigation = useNavigation();

  // useState setiap inputan pada form
  const [stambuk, setStambuk] = useState('');
  const [nama, setNama] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [agama, setAgama] = useState('');
  const [noTelpon, setNoTelpon] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [asal, setAsal] = useState('');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [organisasi, setOrganisasi] = useState('');
  const [alasanDaftar, setAlasanDaftar] = useState('');

  // fungsi ini dijalankan ketika tombol daftar ditekan
  const handleSubmission = async () => {
    // membuat kode random
    const uniqueNumber = Math.floor(10000 + Math.random() * 90000);

    // membuat const untuk menampung semua nilai dari useState form
    const newParticipant = {
      stambuk,
      nama,
      angkatan,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      agama,
      noTelpon,
      email,
      alamat,
      asal,
      namaAyah,
      namaIbu,
      organisasi,
      alasanDaftar,
      uniqueNumber,
    };
    // POST DATA
    try {
      await axios.post(
        'http://192.168.60.252:3000/participants',
        newParticipant,
      );
      // setelah data berhasil disimpan, kemudian pindah ke afterForm dan kirim nilai uniquNumber
      navigation.replace('AfterForm', {code: uniqueNumber});
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getDATA();
  }, [])
  
  // GET DATA
  const getDATA = async () => {
    try {
      const res = await axios.get(
        'http://192.168.60.252:3000/participants/',
      );
      // setDataUser(res.data.data);
      console.log(res.data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.headerText}>Form Pendaftaran</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Stambuk</Text>
        <TextInput
          style={styles.input}
          value={stambuk}
          onChangeText={setStambuk}
          placeholder="Masukkan Stambuk"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          value={nama}
          onChangeText={setNama}
          placeholder="Masukkan Nama"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Angkatan</Text>
        <TextInput
          style={styles.input}
          value={angkatan}
          onChangeText={setAngkatan}
          placeholder="Masukkan Angkatan"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tempat Lahir</Text>
        <TextInput
          style={styles.input}
          value={tempatLahir}
          onChangeText={setTempatLahir}
          placeholder="Masukkan Tempat Lahir"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tanggal Lahir</Text>
        <TextInput
          style={styles.input}
          value={tanggalLahir}
          onChangeText={setTanggalLahir}
          placeholder="Masukkan Tanggal Lahir"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Jenis Kelamin</Text>
        <View style={styles.radioContainer}>
          <CustomRadioButton
            label="Laki-laki"
            value="male"
            selectedValue={jenisKelamin}
            onPress={setJenisKelamin}
          />
          <CustomRadioButton
            label="Perempuan"
            value="female"
            selectedValue={jenisKelamin}
            onPress={setJenisKelamin}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Agama</Text>
        <TextInput
          style={styles.input}
          value={agama}
          onChangeText={setAgama}
          placeholder="Masukkan Agama"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>No Telpon</Text>
        <TextInput
          style={styles.input}
          value={noTelpon}
          onChangeText={setNoTelpon}
          placeholder="Masukkan No Telpon"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan Email"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Alamat</Text>
        <TextInput
          style={styles.input}
          value={alamat}
          onChangeText={setAlamat}
          placeholder="Masukkan Alamat"
          keyboardType="default"
          multiline
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Asal</Text>
        <TextInput
          style={styles.input}
          value={asal}
          onChangeText={setAsal}
          placeholder="Masukkan Asal"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Ayah</Text>
        <TextInput
          style={styles.input}
          value={namaAyah}
          onChangeText={setNamaAyah}
          placeholder="Masukkan Nama Ayah"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Ibu</Text>
        <TextInput
          style={styles.input}
          value={namaIbu}
          onChangeText={setNamaIbu}
          placeholder="Masukkan Nama Ibu"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Organisasi</Text>
        <TextInput
          style={styles.input}
          value={organisasi}
          onChangeText={setOrganisasi}
          placeholder="Masukkan Organisasi"
          keyboardType="default"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Alasan Daftar</Text>
        <TextInput
          style={styles.input}
          value={alasanDaftar}
          onChangeText={setAlasanDaftar}
          placeholder="Masukkan Alasan Daftar"
          keyboardType="default"
          multiline
        />
      </View>

      <Pressable
        style={({pressed}) => [
          {
            transform: pressed ? [{scale: 0.95}] : [{scale: 1}],
          },
          styles.submitButton,
        ]}
        onPress={handleSubmission}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}>
          <Text style={styles.submitText}>Daftar</Text>
        </LinearGradient>
      </Pressable>
    </ScrollView>
  );
};

export default FormRegis;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7F8',
    padding: w(4),
  },
  header: {
    alignItems: 'center',
    marginTop: h(2),
    marginBottom: h(3),
  },
  logo: {
    width: w(20),
    height: w(20),
    marginBottom: h(1),
  },
  headerText: {
    fontSize: w(6),
    fontWeight: 'bold',
    color: '#0088FF',
  },
  formGroup: {
    marginBottom: h(2),
  },
  label: {
    fontSize: w(4.5),
    marginBottom: h(1),
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: h(6),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: w(3),
    borderRadius: w(2),
    fontSize: w(4.5),
    backgroundColor: '#FFF',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: h(1),
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    marginLeft: w(2),
    fontSize: w(4.5),
  },
  submitButton: {
    elevation: 3,
    borderRadius: w(5),
    overflow: 'hidden',
    marginTop: h(3),
  },
  gradient: {
    paddingVertical: h(2),
    paddingHorizontal: w(10),
    borderRadius: w(5),
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: w(5),
    fontWeight: 'bold',
  },
});
