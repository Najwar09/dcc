import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LinearGradient from 'react-native-linear-gradient';

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
        <Text>Loading...</Text>
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

export default Question2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: w(114),
    height: h(110),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  option: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  optionBackground: {
    padding: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#FFF',
  },
  selectedOption: {
    borderColor: 'gold',
    borderWidth: 5,
  },
  nextButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  nextButtonBackground: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
