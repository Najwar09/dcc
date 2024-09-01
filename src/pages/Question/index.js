import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import LinearGradient from 'react-native-linear-gradient';

const Question = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    const soal = route.params?.soal;
    if (soal) {
      const parsedQuestions = soal.map(item => ({
        question: item.questions,
        options: Object.values(JSON.parse(item.choice)),
        answer: item.is_right_choice,
      }));

      setQuestions(shuffleArray(parsedQuestions));
    }
  }, [route.params?.soal]);

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

  const handleAnswerSelect = index => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const correctAnswer = questions[currentQuestionIndex].answer;
      const selectedOption = Object.keys(
        JSON.parse(route.params.soal[currentQuestionIndex].choice),
      )[selectedAnswer];

      if (selectedOption === correctAnswer) {
        setScore(score + 1);
      }

      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        Alert.alert(
          'Quiz Completed!',
          `You have finished the quiz with a score of ${score}.`,
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
    paddingVertical: h(2),
  },
  question: {
    fontSize: w(6),
    fontWeight: 'bold',
    marginBottom: h(3),
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
    borderRadius: w(2),
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: w(5),
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
    fontSize: w(5),
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Question;
