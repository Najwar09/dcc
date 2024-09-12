import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { setItem } from '../../../utils/asyncStorate';

const Question = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [idCalgot, setIdCalgot] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  console.log("id calgotnya : ", idCalgot);

  useEffect(() => {
    const soal = route.params?.soal;
    const idCalgotReceive = route.params?.idCalgotSend;
    console.log('id calgot receive ', idCalgotReceive);
    if (idCalgotReceive != null && idCalgotReceive != undefined) {
      setIdCalgot(idCalgotReceive);
    }
    if (soal) {
      const parsedQuestions = soal.map(item => ({
        id: item.id,
        question: item.questions,
        options: Object.values(JSON.parse(item.choice)),
        answer: item.is_right_choice,
      }));
      setQuestions(shuffleArray(parsedQuestions));
    }
  }, [route.params?.soal]);

  useEffect(() => {
    let timer;
    if (!isModalVisible) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timer);
            Alert.alert(
              'Time Up!',
              'You have completed the quiz.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    handleQuizCompletion();
                  },
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
  }, [timeRemaining, isModalVisible]);

  useEffect(() => {
    const kode_unik = route.params?.kode_unik;
    if (kode_unik) {
      GetDatasAll(kode_unik);
    }
  }, [route.params?.kode_unik]);

  const GetDatasAll = async (kode_unik) => {
    try {
      const response = await axios.get('https://dcc-testing.campa-bima.online/public/api/calgot');
      const data = response.data.data;
      const datacalgot = data.find(item => item.kode_unik === kode_unik);
      if (datacalgot) {
        setIdCalgot(datacalgot.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerSelect = index => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const correctAnswer = currentQuestion.answer;
      const selectedOption = Object.keys(
        JSON.parse(route.params.soal[currentQuestionIndex].choice),
      )[selectedAnswer];

      setSelectedAnswers(prevAnswers => [
        ...prevAnswers,
        { id: currentQuestion.id, answer: selectedOption },
      ]);

      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }

      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleQuizCompletion();
      }
    } else {
      Alert.alert('Select an answer first!');
    }
  };

  const handleQuizCompletion = async () => {
    try {
      await UpdateScore();
      navigation.replace('Quiz', { lastscorecode: score, disable: false });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the score.');
    }
  };

  const UpdateScore = async () => {
    if (idCalgot) {
      console.log('Data yang akan dikirim:', { answer: selectedAnswers });
      try {
        await axios.post(
          `https://dcc-testing.campa-bima.online/public/api/calgot/${idCalgot}/quiz/submit`,
          { answer: selectedAnswers },
        );
      } catch (error) {
        Alert.alert('Error', 'An error occurred while updating the score.');
      }
    }
  };

  const closeModalAndStartTimer = async () => {
    setIsModalVisible(false);
    await setItem('disable', JSON.stringify(false));
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/bgsoal.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => { }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Petunjuk Pengerjaan Soal</Text>
            <Text style={styles.modalText}>
              1. Quiz Play With Code hanya bisa dikerjakan sekali.{'\n'}
              2. Terdapat 20 pertanyaan yang harus dikerjakan.{'\n'}
              3. Tekan tombol "Next" untuk melanjutkan ke pertanyaan berikutnya.{'\n'}
              4. Waktu pengerjaan adalah 15 Menit. Pastikan Anda menjawab sebelum waktu habis.{'\n'}
              5. Setelah selesai, skor Anda akan ditampilkan.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModalAndStartTimer}>
              <LinearGradient
                colors={['#FF512F', '#DD2476']}
                style={styles.closeButtonBackground}>
                <Text style={styles.closeButtonText}>Mulai Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timeRemaining} seconds</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>
          {questions.length > 0 && questions[currentQuestionIndex].question}
        </Text>

        {questions.length > 0 &&
          questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedAnswer === index ? styles.selectedOption : null,
              ]}
              onPress={() => handleAnswerSelect(index)}>
              <LinearGradient
                colors={
                  selectedAnswer === index
                    ? ['#FFD700', '#FFA500', '#FF4500']
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
            <Text style={styles.nextButtonText}>Next</Text>
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
    fontSize: w(6),
    fontWeight: 'bold',
    marginBottom: h(3),
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
    fontSize: w(5),
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
  },
  nextButtonText: {
    fontSize: w(5),
    color: '#FFF',
  },
  timerContainer: {
    position: 'absolute',
    top: h(5),
    right: w(5),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: w(2),
    borderRadius: w(2),
  },
  timerText: {
    fontSize: w(4),
    color: 'white',
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
    color: 'black',
  },
  modalText: {
    fontSize: w(4),
    marginBottom: h(4),
    textAlign: 'left',
    color: 'black',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default Question;
