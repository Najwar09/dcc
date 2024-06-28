import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import quizData from '../../../db.json'; // Ganti dengan path sesuai tempat menyimpan file JSON
import { useNavigation } from '@react-navigation/native'


const Question = () => {
    const navigation = useNavigation();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10); // Waktu pengerjaan dalam detik

    // Mengambil 5 soal secara acak saat komponen dimuat
    useEffect(() => {
        const shuffledQuestions = shuffleArray(quizData.it_questions).slice(0, 5);
        setQuestions(shuffledQuestions);
    }, []);

    // Timer untuk menghitung mundur waktu pengerjaan
    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
            } else {
                // Logika jika waktu habis, misalnya menampilkan hasil atau navigasi ke halaman lain
                Alert.alert(
                    'Waktu Habis!',
                    'Anda telah menyelesaikan quiz.',
                    [
                      {
                        text: 'OK',
                        onPress: () => navigation.navigate('Quiz', { lastscore: 90 }),// Ganti 'DestinationScreen' dengan nama screen tujuan
                      },
                    ],
                    { cancelable: false }
                  );
                console.log(score);
            }
        }, 1000);

        // Membersihkan timer saat komponen dibongkar
        return () => clearTimeout(timer);
    }, [timeRemaining]);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            // Menambah skor jika jawaban benar
            if (questions[currentQuestionIndex].options[selectedAnswer] === questions[currentQuestionIndex].answer) {
                setScore(score + 1);
            }

            // Pindah ke soal berikutnya
            setSelectedAnswer(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Jika sudah pada soal terakhir, Anda bisa menavigasi ke halaman lain atau menampilkan hasil skor di sini
                Alert.alert(
                    'Quiz Selesai!',
                    'Anda telah menyelesaikan quiz.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Quiz', { lastscore: 89 }),
                            // Ganti 'DestinationScreen' dengan nama screen tujuan
                        },
                    ],
                    { cancelable: false }
                );
                console.log(score);
                // navigation.replace('Quiz');

            }
        } else {
            alert('Pilih jawaban terlebih dahulu!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                {questions.length > 0 && questions[currentQuestionIndex].question}
            </Text>
            {questions.length > 0 && questions[currentQuestionIndex].options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, selectedAnswer === index ? styles.selectedOption : null]}
                    onPress={() => handleAnswerSelect(index)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            <Text style={styles.timer}>Waktu Tersisa: {timeRemaining} detik</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    option: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
    },
    selectedOption: {
        backgroundColor: '#4CAF50',
    },
    nextButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    timer: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

// Fungsi untuk mengacak array
const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Salin array agar tidak mengubah array asli
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export default Question;
