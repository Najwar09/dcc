import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LogoImage from '../../assets/icons/logo.png';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const Form2 = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // data form pertama
  const Name = route.params?.Name2;
  const Nim = route.params?.Nim2;
  const Email = route.params?.Email2;
  const NoHp = route.params?.NoHp2;
  const TempatLahir = route.params?.TempatLahir2;
  const TglLahir = route.params?.TglLahir2;
  const Jkel = route.params?.Jkel2;
  const address = route.params?.address2;

  // data form kedua
  const [Origin, setOrigin] = useState('');
  const [Religion, setReligion] = useState('');
  const [Father, setFather] = useState('');
  const [Mother, setMother] = useState('');
  const [Organization, setOrganization] = useState('');
  const [Reason, setReason] = useState('');
  const [photoUri, setPhotoUri] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('No photo selected');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setPhotoUri(uri);
      }
    });
  };

  // POST DATAS
  const PostDatas = async () => {
    const formData = new FormData();
    formData.append('stambuk', Nim);
    formData.append('nama', Name);
    formData.append('tempat_lahir', TempatLahir);
    formData.append('tgl_lahir', TglLahir);
    formData.append('jkl', Jkel);
    formData.append('agama', Religion);
    formData.append('no_telp', NoHp);
    formData.append('alamat', address);
    formData.append('ket', 'Belum Lulus');
    formData.append('asal', Origin);
    formData.append('nama_ayah', Father);
    formData.append('nama_ibu', Mother);
    formData.append('organisasi', Organization);
    formData.append('alasan', Reason);

    if (photoUri) {
      formData.append('foto', {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
    }

    formData.append('angkatan', 27);

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
      Alert.alert('Success', 'Data berhasil dikirim');
      navigation.navigate('AfterForm',{id : response.data.data.id});
      console.log(response.data);
      // console.log(response.data.data.id);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengirim data');
      console.error(
        'Error sending data: ',
        error.response?.data || error.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'#ffffff'}
          showHideTransition={'slide'}
        />

        {/* Logo */}
        <View style={styles.header}>
          <Image source={LogoImage} style={styles.logo} resizeMode="center" />
          <Text style={styles.title}>Form Pendaftaran</Text>
        </View>
        {/* end logo */}

        {/* form */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Asal</Text>
          <TextInput
            placeholder="Masukkan Asal Anda"
            placeholderTextColor={'#595959'}
            value={Origin}
            onChangeText={setOrigin}
            style={styles.input}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Agama</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Religion}
              onValueChange={setReligion}
              style={styles.picker}>
              <Picker.Item label="---Pilih Agama---" value="" />
              <Picker.Item label="Islam" value="I" />
              <Picker.Item label="Kristen Protestan" value="KP" />
              <Picker.Item label="Katolik" value="KK" />
              <Picker.Item label="Hindu" value="H" />
              <Picker.Item label="Buddha" value="B" />
              <Picker.Item label="Konghucu" value="KH" />
            </Picker>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama Ayah</Text>
          <TextInput
            placeholder="Masukkan Nama Ayah Anda"
            placeholderTextColor={'#595959'}
            value={Father}
            onChangeText={setFather}
            style={styles.input}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama Ibu</Text>
          <TextInput
            placeholder="Masukkan Nama Ibu Anda"
            placeholderTextColor={'#595959'}
            value={Mother}
            onChangeText={setMother}
            style={styles.input}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Pengalaman Organisasi</Text>
          <TextInput
            placeholder="Masukkan Pengalaman Organisasi Anda"
            placeholderTextColor={'#595959'}
            value={Organization}
            onChangeText={setOrganization}
            style={styles.textArea}
            multiline
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Alasan</Text>
          <TextInput
            placeholder="Alasan Anda Bergabung Dengan DCC"
            placeholderTextColor={'#595959'}
            value={Reason}
            onChangeText={setReason}
            style={styles.textArea}
            multiline
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Masukkan Foto</Text>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleChoosePhoto}>
            <Text style={styles.imagePickerText}>Pilih Foto</Text>
          </TouchableOpacity>
          {photoUri ? (
            <Image source={{uri: photoUri}} style={styles.imagePreview} />
          ) : null}
        </View>
        {/* end form */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={PostDatas}>
            <Text style={styles.buttonText}>SELESAI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  title: {
    textTransform: 'uppercase',
    color: 'black',
    fontWeight: 'bold',
    fontSize: w(6),
    marginTop: h(-10),
  },
  formGroup: {
    marginTop: h(3),
    marginHorizontal: w(4),
  },
  label: {
    fontSize: w(4),
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: h(1),
  },
  input: {
    width: w(93),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    paddingLeft: w(4),
    fontStyle: 'italic',
    color: '#000000',
    height: h(7),
  },
  textArea: {
    width: w(93),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    paddingLeft: w(4),
    fontStyle: 'italic',
    color: '#000000',
    textAlignVertical: 'top',
    height: h(18),
  },
  pickerContainer: {
    width: w(93),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    marginTop: h(1),
  },
  picker: {
    width: '100%',
    height: h(6),
  },
  imagePicker: {
    width: w(93),
    height: h(7),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: h(1),
  },
  imagePickerText: {
    color: '#007bff',
    fontSize: w(4),
  },
  imagePreview: {
    width: w(93),
    height: h(25),
    borderRadius: w(4),
    marginTop: h(2),
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: h(2),
  },
  button: {
    backgroundColor: '#007bff',
    width: w(93),
    height: h(7),
    borderRadius: w(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: w(5),
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: w(35),
    height: h(35),
    marginTop: h(-6),
  },
});

export default Form2;
