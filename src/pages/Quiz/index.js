import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Modal,
  Clipboard,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import bgAnimation from '../../assets/animation/bgsoal.json';
import axios from 'axios';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import playwithoutcode from '../../assets/icons/playwithoutcode.png';
import playwithcode from '../../assets/icons/playwithcode.png';


const Quiz = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const lastscore = route.params?.lastscore;
  const lastscorecode = route.params?.lastscorecode;
  const stambukreceive = route.params?.stambuksend;
  
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  
  const [nim, setNim] = useState('');
  const [nimModalVisible, setNimModalVisible] = useState(true);
  const [nimConfirmationModalVisible, setNimConfirmationModalVisible] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');

  console.log('stambuk',nim);
  console.log('stambuk receive',stambukreceive);

  useEffect(() => {
    if (stambukreceive != null && stambukreceive != undefined) {
      setNim(stambukreceive);
    }
  },);
  
  useEffect(() => {
    if (typeof lastscore === 'number' || typeof lastscorecode === 'number') {
      setNimModalVisible(false);
    }
  }, [lastscore]);

  // Fetch quiz data
  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'https://dcc-testing.campa-bima.online/public/api/cek-kode-unik',
        { kode_unik: inputCode },
      );
      const quizData = res.data.quizzes;
      if (quizData && quizData.length > 0) {
        setLoading(false);
        navigation.replace('Question', { soal: quizData,kode_unik : uniqueCode, stambuk : nim});
      } else {
        setLoading(false);
        Alert.alert('Kode Salah', 'Kode unik yang Anda masukkan tidak valid.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil data.');
    }
  };

  // Fetch NIM data
  const getDataCalgot = async () => {
    try {
      const res = await axios.post(
        'https://dcc-testing.campa-bima.online/public/api/cek-stambuk',
        { stambuk: nim },
      );
      const data = res.data;
      if (data.status) {
        const { kode_unik } = data.result;
        setUniqueCode(kode_unik); 
        setNimModalVisible(false); 
        setNimConfirmationModalVisible(true);
      } else {
        Alert.alert('NIM Tidak Ditemukan', 'NIM yang Anda masukkan tidak terdaftar.');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat mengambil data NIM.');
    }
  };

  const handleEnterCode = async () => {
    await fetchQuizData();
  };

  const handleConfirmNim = () => {
    if (nim.trim() === '') {
      Alert.alert('Error', 'NIM tidak boleh kosong!');
      return;
    }
    getDataCalgot(); 
  };

  const handleCloseConfirmationModal = () => {
    setNimConfirmationModalVisible(false);
  };


  const copyToClipboard = () => {
    Clipboard.setString(uniqueCode);
    Alert.alert('Berhasil', 'Kode Unik berhasil disalin ke clipboard.');
  };

  return (
    <View style={styles.container}>
      <LottieView source={bgAnimation} autoPlay loop style={styles.background} />
      <View style={styles.content}>
        <Text style={styles.title}>Do You Wanna Play This Quiz?</Text>

        {/* play without code */}
        <TouchableOpacity
          // style={styles.button}
          onPress={() => navigation.replace('Question2',{stambuk : nim})}
        >
          <Image source={playwithoutcode} style={{width: 200,height: 100,}} resizeMode='contain'/>
          {/* <Text style={styles.buttonText}>PLAY WITHOUT CODE</Text> */}
        </TouchableOpacity>

        {/* play with code */}
        {buttonVisible && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your code"
              placeholderTextColor="#888"
              value={inputCode}
              onChangeText={setInputCode}
              textAlign="center"
            />
            <TouchableOpacity
              // style={styles.enterCodeButton}
              onPress={handleEnterCode}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                // <Text style={styles.enterCodeButtonText}>PLAY WITH CODE</Text>
                <Image source={playwithcode} style={{width: 180,height: 100,marginLeft: w(5),}} resizeMode='contain'/>
              )}
            </TouchableOpacity>
          </View>
        )}

        {lastscore !== undefined && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <Text style={styles.score}>{lastscore}</Text>
          </View>
        )}
      </View>

      {/* Modal for NIM input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nimModalVisible}
        onRequestClose={() => setNimModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your NIM</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Nim"
              placeholderTextColor="#888"
              value={nim}
              onChangeText={setNim}
              textAlign="center"
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmNim}
            >
              <Text style={styles.confirmButtonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for showing unique code */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nimConfirmationModalVisible}
        onRequestClose={handleCloseConfirmationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NIM Anda</Text>
            <Text style={styles.nimText}>{nim}</Text>
            <Text style={styles.modalTitle}>Kode Unik Anda</Text>
            <Text style={styles.nimText}>{uniqueCode}</Text>

            {/* Inform user they can copy the code */}
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Text style={styles.copyButtonText}>COPY KODE UNIK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleCloseConfirmationModal}
            >
              <Text style={styles.confirmButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: w(200),
    height: w(202),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: w(10),
  },
  title: {
    fontSize: w(10),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: h(4),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: h(3),
    borderRadius: w(5),
    marginBottom: h(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: w(5),
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: h(4),
    // marginRight: w(5),
  },
  input: {
    height: h(6),
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: w(5),
    paddingHorizontal: w(4),
    fontSize: w(4.5),
    color: 'black',

  },
  enterCodeButton: {
    backgroundColor: '#4CAF50',
    marginLeft: w(2),
    paddingVertical: h(2.5),
    paddingHorizontal: w(5),
    borderRadius: w(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  enterCodeButtonText: {
    color: 'white',
    fontSize: w(4.5),
  },
  scoreContainer: {
    marginTop: h(4),
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: w(6),
    fontWeight: 'bold',
    color: 'white',
  },
  score: {
    fontSize: w(10),
    fontWeight: 'bold',
    color: 'yellow',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: w(6),
    borderRadius: w(5),
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: w(5),
    fontWeight: 'bold',
    marginBottom: h(2),
    color: '#333',
  },
  nimText: {
    fontSize: w(4),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: h(2),
  },
  confirmButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: h(2.5),
    paddingHorizontal: w(5),
    borderRadius: w(5),
    marginTop: h(2),
  },
  confirmButtonText: {
    color: 'white',
    fontSize: w(4.5),
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: h(2.5),
    paddingHorizontal: w(5),
    borderRadius: w(5),
    marginBottom: h(2),
  },
  copyButtonText: {
    color: 'white',
    fontSize: w(4.5),
  },
});

export default Quiz;
