import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Question2 = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [modalVisible, setModalVisible] = useState(true);

  const stambuk = route.params?.stambuk;
  console.log(stambuk);

  const GetData = async () => {
    try {
      const res = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/quiz_without_code',
      );
      console.log(res.data);
      const soal = res.data.data;

      const parsedQuestions = soal
        .map(item => {
          try {
            const parsedChoice = JSON.parse(item.choice);
            return {
              question: item.questions,
              options: Object.entries(parsedChoice),
              answer: item.is_right_choice,
              point: parseInt(item.point, 10),
            };
          } catch (parseError) {
            console.error('Error parsing choice:', parseError);
            return null;
          }
        })
        .filter(q => q !== null);

      setQuestions(shuffleArray(parsedQuestions));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    let timer;
    if (!modalVisible) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timer);
            Alert.alert(
              'Waktu Habis!',
              'Anda telah menyelesaikan kuis.',
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.replace('Quiz', {
                      lastscore: correctAnswersCount,
                      stambuksend: stambuk,
                    }),
                },
              ],
              { cancelable: false },
            );
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [modalVisible, navigation, correctAnswersCount, stambuk]);

  if (!questions.length) {
    return (
      <View style={styles.container}>
        {/* Anda bisa menambahkan indikator loading di sini jika diinginkan */}
      </View>
    );
  }

  const handleAnswerSelection = answer => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const correctAnswer = questions[currentQuestionIndex].answer;
      const selectedOption = questions[currentQuestionIndex].options.find(
        option => option[0] === selectedAnswer,
      );

      if (selectedOption && selectedOption[0] === correctAnswer) {
        setCorrectAnswersCount(prevCount => prevCount + 1);
      }

      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        Alert.alert(
          'Kuis Selesai!',
          `Jumlah jawaban benar Anda adalah ${correctAnswersCount}.`,
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.replace('Quiz', {
                  lastscore: correctAnswersCount,
                  stambuksend: stambuk,
                }),
            },
          ],
          { cancelable: false },
        );
      }
    } else {
      Alert.alert('Pilih jawaban terlebih dahulu!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal untuk petunjuk pengerjaan soal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Menangani penutupan modal dengan tombol back
          setModalVisible(false);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Petunjuk Pengerjaan Soal</Text>
              <Text style={styles.modalText}>
                1. Baca setiap pertanyaan dengan seksama.{'\n'}
                2. Pilih salah satu jawaban yang menurut Anda benar.{'\n'}
                3. Tekan tombol "Selanjutnya" untuk melanjutkan ke pertanyaan berikutnya.{'\n'}
                4. Waktu pengerjaan adalah 30 detik. Pastikan Anda menjawab sebelum waktu habis.{'\n'}
                5. Setelah selesai, skor Anda akan ditampilkan.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <LinearGradient
                colors={['#FF512F', '#DD2476']}
                style={styles.closeButtonBackground}>
                <Text style={styles.closeButtonText}>Mulai Kuis</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* End Modal */}

      {/* bg animation */}
      <LottieView
        source={require('../../assets/animation/bgsoal.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />
      {/* end bg animation */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timeRemaining} detik</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.question}>
          {questions[currentQuestionIndex].question}
        </Text>
        {questions[currentQuestionIndex].options.map(([key, option], index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === key ? styles.selectedOption : null,
            ]}
            onPress={() => handleAnswerSelection(key)}>
            <LinearGradient
              colors={
                selectedAnswer === key
                  ? ['#FF512F', '#DD2476'] 
                  : ['#4c669f', '#3b5998', '#192f6a'] 
              }
              style={styles.optionBackground}>
              <Text style={styles.optionText}>{option}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}>
          <LinearGradient
            colors={['#FF512F', '#DD2476']}
            style={styles.nextButtonBackground}>
            <Text style={styles.nextButtonText}>Selanjutnya</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const shuffleArray = array => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: w(4),
    backgroundColor: '#f5f5f5',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: w(115),
    height: h(100),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: w(90),
    paddingVertical: h(2),
  },
  question: {
    fontSize: w(5),
    fontWeight: 'bold',
    marginBottom: h(2),
    textAlign: 'center',
    color: 'white',
  },
  option: {
    width: '100%',
    marginVertical: h(1),
    borderRadius: w(2),
    overflow: 'hidden',
  },
  optionBackground: {
    padding: h(2),
    alignItems: 'center',
  },
  optionText: {
    fontSize: w(4),
    color: '#FFF',
  },
  selectedOption: {
    borderColor: 'gold',
    borderWidth: w(0.5),
  },
  nextButton: {
    marginTop: h(2),
    borderRadius: w(2),
    overflow: 'hidden',
  },
  nextButtonBackground: {
    paddingVertical: h(2),
    paddingHorizontal: w(5),
    alignItems: 'center',
    borderRadius: w(2),
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: w(4),
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: h(2),
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: h(1),
    paddingHorizontal: w(3),
    borderRadius: w(2),
  },
  timerText: {
    fontSize: w(4),
    fontWeight: 'bold',
    color: '#FFF',
  },
  loadingText: {
    fontSize: w(5),
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: w(5),
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: w(2),
    padding: w(5),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: w(6),
    fontWeight: 'bold',
    marginBottom: h(2),
    textAlign: 'center',
    color : 'black',
  },
  modalText: {
    fontSize: w(4),
    marginBottom: h(4),
    textAlign: 'left',
    color : 'black',
  },
  closeButton: {
    width: '100%',
    borderRadius: w(2),
    overflow: 'hidden',
  },
  closeButtonBackground: {
    paddingVertical: h(2),
    alignItems: 'center',
    borderRadius: w(2),
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: w(5),
  },
});

export default Question2;
