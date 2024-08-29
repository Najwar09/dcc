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
import axios from 'axios';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LogoImage from '../../assets/icons/logo.png';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {Buffer} from 'buffer'; // Import Buffer if needed for base64 encoding

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
  const [photoUri, setPhotoUri] = useState('');

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('No photo selected');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        // Convert the selected image to base64
        const source = response.assets[0];
        const {uri} = source;
        // Use `fetch` to convert the image to base64
        fetch(uri)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64data = reader.result.split(',')[1]; // Get base64 part
              setPhotoUri(base64data);
            };
            reader.readAsDataURL(blob);
          });
      }
    });
  };

  const PostDatas = async () => {
    const data2 = {
      stambuk: Nim,
      nama: Name,
      tempat_lahir: TempatLahir,
      tgl_lahir: TglLahir,
      jkl: Jkel,
      agama: Religion,
      no_telp: NoHp,
      alamat: address,
      ket: 'Belum Lulus',
      asal: Origin,
      nama_ayah: Father,
      nama_ibu: Mother,
      organisasi: Organization,
      alasan: Reason,
      foto: "photoUri",
      pembayaran: 'belum',
      status: 'pendaftar',
      registrasi: 'belum',
      angkatan: '27',
      kode_unik: 'some-unique-code', 
      skor_quiz: 0,
      answer: 'some-answer', 
    };
    console.log(data2);

    try {
      const response = await axios.post(
        'https://dcc-testing.campa-bima.online/public/api/calgot/store',
        data2,
      );
      console.log('Response:', response.data);
      if (response.data.status) {
        Alert.alert('Success', 'Data berhasil dikirim');
      } else {
        Alert.alert('Error', response.data.message || 'Gagal mengirim data');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert(
        'Error',
        'Gagal mengirim data. Periksa koneksi atau format data.',
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
        <View style={styles.logoContainer}>
          <Image
            source={LogoImage}
            style={styles.logoImage}
            resizeMode="center"
          />
          <Text style={styles.title}>Form Pendaftaran</Text>
        </View>
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
            <Image
              source={{uri: `data:image/jpeg;base64,${photoUri}`}}
              style={styles.imagePreview}
            />
          ) : null}
        </View>
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
  logoContainer: {
    alignItems: 'center',
    marginVertical: h(2),
  },
  logoImage: {
    width: w(35),
    height: h(35),
    marginBottom: h(2),
  },
  title: {
    textTransform: 'uppercase',
    color: 'black',
    fontSize: w(4.5),
    fontWeight: 'bold',
  },
  formGroup: {
    marginHorizontal: w(5),
    marginBottom: h(2),
  },
  label: {
    fontSize: w(4),
    color: 'black',
    marginBottom: h(1),
  },
  input: {
    height: h(6),
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: w(2),
    fontSize: w(3.5),
    color: 'black',
  },
  pickerContainer: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
  },
  picker: {
    height: h(6),
    width: '100%',
  },
  textArea: {
    height: h(10),
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: w(2),
    fontSize: w(3.5),
    color: 'black',
    textAlignVertical: 'top',
  },
  imagePicker: {
    height: h(6),
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  imagePickerText: {
    fontSize: w(3.5),
    color: '#007bff',
  },
  imagePreview: {
    width: w(30),
    height: h(20),
    marginTop: h(1),
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: h(2),
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: h(1.5),
    paddingHorizontal: w(5),
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: w(4),
    fontWeight: 'bold',
  },
});

export default Form2;
