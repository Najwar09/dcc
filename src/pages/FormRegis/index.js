import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LogoImage from '../../assets/icons/logo.png'; // Pastikan logo.png sudah ada di direktori assets/icons

const CustomRadioButton = ({label, value, selectedValue, onPress}) => {
  return (
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
};

const FormRegis = () => {
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
  const [foto, setFoto] = useState(null);

  const navigation = useNavigation();

  const handleSubmission = () => {
    navigation.navigate('AfterForm');
    console.log('Data Pendaftaran:', {
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
      foto,
    });
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
          onChangeText={text => setStambuk(text)}
          placeholder="Masukkan Stambuk"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          value={nama}
          onChangeText={text => setNama(text)}
          placeholder="Masukkan Nama Lengkap"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Angkatan</Text>
        <TextInput
          style={styles.input}
          value={angkatan}
          onChangeText={text => setAngkatan(text)}
          placeholder="Masukkan Angkatan"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tempat Lahir</Text>
        <TextInput
          style={styles.input}
          value={tempatLahir}
          onChangeText={text => setTempatLahir(text)}
          placeholder="Masukkan Tempat Lahir"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tanggal Lahir</Text>
        <TextInput
          style={styles.input}
          value={tanggalLahir}
          onChangeText={text => setTanggalLahir(text)}
          placeholder="Masukkan Tanggal Lahir"
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
          onChangeText={text => setAgama(text)}
          placeholder="Masukkan Agama"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>No Telpon</Text>
        <TextInput
          style={styles.input}
          value={noTelpon}
          onChangeText={text => setNoTelpon(text)}
          placeholder="Masukkan No Telpon"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Masukkan Email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Alamat</Text>
        <TextInput
          style={[styles.input, {height: h(10)}]}
          value={alamat}
          onChangeText={text => setAlamat(text)}
          placeholder="Masukkan Alamat"
          multiline
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Asal</Text>
        <TextInput
          style={styles.input}
          value={asal}
          onChangeText={text => setAsal(text)}
          placeholder="Masukkan Asal"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Ayah</Text>
        <TextInput
          style={styles.input}
          value={namaAyah}
          onChangeText={text => setNamaAyah(text)}
          placeholder="Masukkan Nama Ayah"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nama Ibu</Text>
        <TextInput
          style={styles.input}
          value={namaIbu}
          onChangeText={text => setNamaIbu(text)}
          placeholder="Masukkan Nama Ibu"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Organisasi</Text>
        <TextInput
          style={styles.input}
          value={organisasi}
          onChangeText={text => setOrganisasi(text)}
          placeholder="Masukkan Organisasi"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Alasan Mendaftar</Text>
        <TextInput
          style={[styles.input, {height: h(10)}]}
          value={alasanDaftar}
          onChangeText={text => setAlasanDaftar(text)}
          placeholder="Masukkan Alasan Mendaftar"
          multiline
        />
      </View>

      {/* Foto */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Foto</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Foto</Text>
        </TouchableOpacity>
        {foto && <Image source={{uri: foto}} style={styles.uploadedImage} />}
      </View>
      {/* End Foto */}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.submitText}>Daftar</Text>
      </TouchableOpacity>
      {/* End Submit Button */}
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
  uploadButton: {
    backgroundColor: '#0088FF',
    padding: w(3),
    borderRadius: w(2),
    alignItems: 'center',
    marginBottom: h(1),
  },
  uploadText: {
    color: 'white',
    fontSize: w(4.5),
  },
  uploadedImage: {
    width: '100%',
    height: h(30),
    resizeMode: 'cover',
    borderRadius: w(2),
    marginTop: h(1),
  },
  submitButton: {
    backgroundColor: '#0088FF',
    padding: w(4),
    borderRadius: w(2),
    alignItems: 'center',
    marginTop: h(3),
  },
  submitText: {
    color: 'white',
    fontSize: w(5),
    fontWeight: 'bold',
  },
});
