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
  Platform,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LogoImage from '../../assets/icons/logo.png';
import {useNavigation} from '@react-navigation/native';

// Fungsi untuk memformat tanggal ke dalam format YYYY-MM-DD
const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const FormRegis = () => {
  const navigation = useNavigation();

  // State untuk form
  const [Name, setName] = useState('');
  const [Nim, setNim] = useState('');
  const [Email, setEmail] = useState('');
  const [NoHp, setNoHp] = useState('');
  const [Angkatan, setAngkatan] = useState('');
  const [TempatLahir, setTempatLahir] = useState('');
  const [TglLahir, setTglLahir] = useState(formatDate(new Date()));
  const [Jkel, setJkel] = useState('');
  const [address, setAddress] = useState('');

  // State untuk visibilitas DatePicker
  const [showDatePicker, setShowDatePicker] = useState(false);

  const Datas = {
    Name,
    Nim,
    Email,
    NoHp,
    Angkatan,
    TempatLahir,
    TglLahir,
    Jkel,
    address,
  };

  // Fungsi untuk menampilkan DatePicker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Fungsi untuk menangani perubahan tanggal
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    // Format tanggal dan simpan ke state
    setTglLahir(formatDate(currentDate));
  };

  // Fungsi untuk memilih jenis kelamin
  const selectGender = gender => {
    if (gender == 'Pria') {
      gender = 'L';
      setJkel(gender);
    } else {
      gender = 'P';
      setJkel(gender);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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

      {/* Form */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nama</Text>
        <TextInput
          placeholder={`Masukkan Nama Anda`}
          placeholderTextColor={'#595959'}
          style={styles.input}
          value={Name}
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nim</Text>
        <TextInput
          placeholder={`Masukkan Nim Anda`}
          placeholderTextColor={'#595959'}
          style={styles.input}
          value={Nim}
          onChangeText={value => setNim(value)}
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          placeholder={`Masukkan Email Anda`}
          placeholderTextColor={'#595959'}
          style={styles.input}
          value={Email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>No Hp</Text>
        <TextInput
          placeholder={`Masukkan No Hp Anda`}
          placeholderTextColor={'#595959'}
          style={styles.input}
          value={NoHp}
          onChangeText={value => setNoHp(value)}
          keyboardType="phone-pad"
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Angkatan Kampus</Text>
        <TextInput
          placeholder={`Masukkan Angkatan Kampus Anda`}
          placeholderTextColor={'#595959'}
          style={styles.input}
          value={Angkatan}
          onChangeText={value => setAngkatan(value)}
          maxLength={4}
          keyboardType="number-pad"
        />
      </View> */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tempat Lahir</Text>
        <TextInput
          placeholder={`Masukkan Tempat Lahir Anda`}
          placeholderTextColor={'#595959'}
          style={styles.input}
          value={TempatLahir}
          onChangeText={value => setTempatLahir(value)}
        />
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.inputLabel}>Tanggal Lahir</Text>
        <TouchableOpacity style={styles.datePicker} onPress={showDatepicker}>
          <Text style={styles.dateText}>{TglLahir}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(TglLahir)}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.genderContainer}>
        <Text style={styles.inputLabel}>Jenis Kelamin</Text>
        <View style={styles.genderOptions}>
          {['Pria', 'Wanita'].map(gender => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderButton,
                Jkel === gender && styles.selectedGenderButton,
              ]}
              onPress={() => selectGender(gender)}>
              <Text
                style={
                  Jkel === gender
                    ? styles.selectedGenderText
                    : styles.genderText
                }>
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.inputLabel}>Alamat</Text>
        <TextInput
          placeholder="Masukkan Alamat Anda"
          placeholderTextColor={'#595959'}
          style={styles.addressInput}
          value={address}
          onChangeText={value => setAddress(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Form2', {
              Name2: Name,
              Nim2: Nim,
              Email2: Email,
              NoHp2: NoHp,
              // Angkatan2: Angkatan,
              TempatLahir2: TempatLahir,
              TglLahir2: TglLahir,
              Jkel2: Jkel,
              address2: address,
            })
          }>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: w(35),
    height: h(35),
    marginTop: h(-6),
  },
  title: {
    textTransform: 'uppercase',
    color: 'black',
    fontWeight: 'bold',
    fontSize: w(6),
    marginTop: h(-10),
  },
  inputContainer: {
    marginTop: h(3),
    flex: 1,
    marginLeft: w(4),
    height: h(10),
  },
  inputLabel: {
    fontSize: w(4),
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: w(4),
    bottom: h(1),
  },
  input: {
    width: w(93),
    height: h(6),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    paddingLeft: w(4),
    fontStyle: 'italic',
    color: '#000000',
  },
  dateContainer: {
    marginTop: h(3),
    flex: 1,
    marginLeft: w(4),
    height: h(8),
  },
  datePicker: {
    width: w(93),
    height: h(6),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    justifyContent: 'center',
    paddingLeft: w(4),
  },
  dateText: {
    color: '#595959',
    fontStyle: 'italic',
  },
  genderContainer: {
    marginTop: h(3),
    flex: 1,
    marginLeft: w(4),
    height: h(8),
  },
  genderOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderButton: {
    marginLeft: w(6),
    marginRight: w(2),
    paddingVertical: h(1),
    paddingHorizontal: w(4),
    borderRadius: w(4),
    backgroundColor: '#F0F4F7',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
  },
  selectedGenderButton: {
    backgroundColor: '#009688',
    borderColor: '#00796B',
  },
  genderText: {
    color: '#000000',
  },
  selectedGenderText: {
    color: '#ffffff',
  },
  addressContainer: {
    marginTop: h(3),
    flex: 1,
    marginLeft: w(4),
    height: h(15),
  },
  addressInput: {
    width: w(93),
    height: h(12),
    backgroundColor: '#F0F4F7',
    elevation: 2,
    borderRadius: w(4),
    paddingLeft: w(4),
    fontStyle: 'italic',
    color: '#000000',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: h(5),
    marginLeft: w(4),
  },
  button: {
    backgroundColor: '#009688',
    borderRadius: w(4),
    paddingVertical: h(2),
    paddingHorizontal: w(5),
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: w(5),
  },
});

export default FormRegis;
