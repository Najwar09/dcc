import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoDcc from '../../assets/icons/logo.png';

const Splash = ({ navigation }) => {

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.replace('Login');
    //     }, 3000);
    // }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#d4f0fe', '#14b1ff']}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.3 }}>
                <Image source={LogoDcc} style={styles.logo} />
                <Text style={styles.teks}>DIPANEGARA COMPUTER CLUB</Text>
            </LinearGradient>
        </View>
    );
};

export default Splash;
const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: 200,
    },
    teks: {
        fontWeight: 'bold',
        fontSize: 19,
        paddingTop: 1,
        color: 'black',
    },
});
