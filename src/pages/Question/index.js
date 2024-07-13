import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import quizData from '../../../db.json';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const Question = () => {
    const route = useRoute();
    const navigation = useNavigation();


    const [questions, setQuestions] = useState([]); //semua soal
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //index soal saat ini
    const [selectedAnswer, setSelectedAnswer] = useState(null); //index dari jawaban
    const [score, setScore] = useState(0);//score soal
    const [timeRemaining, setTimeRemaining] = useState(30);

    // Get Data Soal

    const DataQuestions = async (agama) => {

        if (agama === 'Islam') {
            const res = await axios.get('http://192.168.60.241:3000/agama_questions');
            const shuffledQuestions = shuffleArray(res.data).slice(0, 5);
            setQuestions(shuffledQuestions);
        } else {
            const res = await axios.get('http://192.168.60.241:3000/pkn_questions');
            const shuffledQuestions = shuffleArray(res.data).slice(0, 5);
            setQuestions(shuffledQuestions);
        }

    }
    // Pertama Kali dijalankan ketika halaman ini terbuka
    useEffect(() => {
        const agama = route.params?.agama;
        DataQuestions(agama);

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
                                onPress: () => navigation.replace('Quiz', { lastscore: score }),
                            },
                        ],
                        { cancelable: false }
                    );
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigation, score]);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {

        if (selectedAnswer !== null) {
            // jika jawaban yg dipilih sesuai denga kunci jawaban maka score+1
            if (questions[currentQuestionIndex].options[selectedAnswer] === questions[currentQuestionIndex].answer) {
                setScore(score + 1);
            }

            setSelectedAnswer(null);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                Alert.alert(
                    'Quiz Completed!',
                    'You have finished the quiz.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Quiz', { lastscore: score }),
                        },
                    ],
                    { cancelable: false }
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

                {questions.length > 0 && questions[currentQuestionIndex].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.option, selectedAnswer === index ? styles.selectedOption : null]}
                        onPress={() => handleAnswerSelect(index)}
                    >
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.optionBackground}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                    <LinearGradient
                        colors={['#FF512F', '#DD2476']}
                        style={styles.nextButtonBackground}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export default Question;
