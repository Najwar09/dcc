import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import bg from '../../assets/images/bg.jpg';

const Quiz = () => {
    const root = useRoute();
    const navigation = useNavigation();
    const lastscore = root.params?.lastscore;
    // console.log(lastscore);
    return (
        <ImageBackground
            source={bg}
            style={styles.background}
        >
            <Text style={{ fontSize: 23, fontWeight: 'bold', marginBottom: 20 }}>Do You Wanna Play This Game??</Text>
            <TouchableOpacity style={styles.overlay} onPress={() => navigation.navigate('Question')}>
                <Text style={styles.text}>PLAY</Text>
            </TouchableOpacity>
            <Text style={{fontSize:30}}>Score Anda : {lastscore}</Text>
        </ImageBackground>
    );
};

export default Quiz;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
});
