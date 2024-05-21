import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
// import Modal from 'react-native-modal';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import Icon from 'react-native-vector-icons/Ionicons';

const KotakLogin = () => {
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#00A9FF',
                    paddingTop: 30,
                    paddingBottom: 25,
                }}>
                LOGIN
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View style={styles.bulat}>
                    <Icon name="person-outline" size={30} color="#4F8EF7" />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={text => setUsername(text)}
                />
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View style={styles.bulat}>
                    <Icon name="lock-closed-outline" size={30} color="#4F8EF7" />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.hide}>
                    <Icon name="eye-outline" size={30} color="#4F8EF7" />
                    {/* <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text> */}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 110, marginBottom: 20 }}>
                <Text style={{ color: '#00A9FF' }}>Forget Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default KotakLogin;


const tinggi = Dimensions.get('window').height;
const lebar = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#00A9FF',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,

        elevation: 19,
        marginTop: -tinggi * 0.04,
    },
    input: {
        shadowColor: '#00A9FF',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 230,
        paddingLeft: 40,
        height: 50,
    },
    bulat: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -lebar * 0.07,
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 100,
        shadowColor: '#00A9FF',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
    },
    hide: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -lebar * 0.07,
        position: 'relative',
        zIndex: 1,
    },
    orang: {
        width: 30,
        height: 30,
    },
    kunci: {
        width: 18,
        height: 23,
    },
    loginButton: {
        backgroundColor: '#00A9FF',
        borderRadius: 10,
        width: 150,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modall: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 250,
        height: 180,
        borderRadius: 20,
    },
});
