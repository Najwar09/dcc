import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoDcc from '../../../assets/icons/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../../responsive';
import KotakLogin from '../../../component/KotakLogin';




const Login = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
            <ScrollView>
                <View>
                    <LinearGradient
                        style={styles.header}
                        colors={['#d4f0fe', '#14b1ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1.4 }}>
                        <Image source={LogoDcc} style={styles.logo} />
                        <Text style={styles.teks}>Welcome !</Text>
                    </LinearGradient>
                    <KotakLogin />

                    {/* login fb dan google */}
                    <View>
                        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20, color: '#00A9FF' }}>or Sign in with</Text>
                        <View style={{flexDirection: 'row',justifyContent: 'center',}}>
                        <Icon name="logo-facebook" size={30} color="#4F8EF7" size={w(10)}/>
                        <Icon name="logo-google" size={30} color="#4F8EF7" size={w(10)}/>
                        </View>
                    </View>
                    {/* end login fb dan google */}
                    <Text
                        style={{ color: '#00A9FF', marginVertical: 80, textAlign: 'center' }}>
                        Product By Dipanegara Computer Club
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
const styles = StyleSheet.create({
    header: {
        height: 214,
        width: '100%',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 110,
        width: 150,
    },
    teks: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400',
    },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
    },
});
