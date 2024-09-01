import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import bgAnimation from '../../assets/animation/bgsoal.json';
import axios from 'axios';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Quiz = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const lastscore = route.params?.lastscore;

  const [inputCode, setInputCode] = useState('');
  const [question, setQuestion] = useState(null);

  const fetchQuizData = async () => {
    try {
      const res = await axios.post(
        'https://dcc-testing.campa-bima.online/public/api/cek-kode-unik',
        {kode_unik: inputCode},
      );
      console.log('Fetched data:', res.data); // Log data yang diterima
      setQuestion(res.data.quizzes);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleEnterCode = async () => {
    await fetchQuizData(); // Tunggu hingga data diambil
    console.log('Entered code:', inputCode);

    if (question && question.length > 0) {
      navigation.replace('Question', {soal: question});
    } else {
      Alert.alert('Invalid Code', 'Please check the code and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={bgAnimation}
        autoPlay
        loop
        style={styles.background}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Do You Wanna Play This Quiz?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Question2')}>
          <Text style={styles.buttonText}>PLAY WITHOUT CODE</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your code"
            placeholderTextColor="#888"
            value={inputCode}
            onChangeText={setInputCode}
            keyboardType="numeric"
            textAlign="center"
          />
          <TouchableOpacity
            style={styles.enterCodeButton}
            onPress={handleEnterCode}>
            <Text style={styles.enterCodeButtonText}>PLAY WITH CODE</Text>
          </TouchableOpacity>
        </View>

        {lastscore !== undefined && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <Text style={styles.score}>{lastscore}</Text>
          </View>
        )}
      </View>
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
    textShadowOffset: {width: 2, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
  },
  input: {
    flex: 1,
    height: h(6),
    borderWidth: 1,
    borderColor: '#ccc',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  enterCodeButtonText: {
    color: 'white',
    fontSize: w(4.5),
    fontWeight: 'bold',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: w(8),
    color: 'white',
    marginBottom: h(1),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  score: {
    fontSize: w(15),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Quiz;
