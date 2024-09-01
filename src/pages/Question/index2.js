import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Question2 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const navigation = useNavigation();

  const GetData = async () => {
    try {
      const res = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/quiz_without_code',
      );
      const soal = res.data.data;
      const parsedQuestions = soal.map(item => ({
        question: item.questions,
        options: Object.values(JSON.parse(item.choice)),
        answer: item.is_right_choice,
      }));
      setQuestions(shuffleArray(parsedQuestions));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
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
                onPress: () => navigation.replace('Quiz', {lastscore: score}),
              },
            ],
            {cancelable: false},
          );
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation, score]);

  if (!questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleAnswerSelection = answer => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestionIndex].answer) {
        setScore(prevScore => prevScore + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        Alert.alert(
          'Quiz Completed!',
          `Your score is ${
            score +
            (selectedAnswer === questions[currentQuestionIndex].answer ? 1 : 0)
          }.`,
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Quiz', {lastscore: score}),
            },
          ],
          {cancelable: false},
        );
      }
    } else {
      Alert.alert('Select an answer first!');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/bgsoal.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timeRemaining} seconds</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.question}>
          {questions[currentQuestionIndex].question}
        </Text>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === option ? styles.selectedOption : null,
            ]}
            onPress={() => handleAnswerSelection(option)}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
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
    width: w(100),
    height: h(100),
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: w(90),
  },
  question: {
    fontSize: w(5),
    fontWeight: 'bold',
    marginBottom: h(2),
    textAlign: 'center',
    color: '#333',
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
});

export default Question2;
