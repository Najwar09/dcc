import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const KotakLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    const navigation = useNavigation();

    // Handle logic login ke MainScreen
    const handleLogin = () => {
        if (username === "A" && password === "A") {
            navigation.replace('MainScreen');
        } else {
            alert('Invalid Username or Password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.loginTitle}>LOGIN</Text>

            <View style={styles.inputContainer}>
                <View style={styles.iconWrapper}>
                    <Icon name="person-outline" size={30} color="#4F8EF7" />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={setUsername}
                    value={username}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.iconWrapper}>
                    <Icon name="lock-closed-outline" size={30} color="#4F8EF7" />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={hidePassword}
                />
                <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}
                    style={styles.eyeIconWrapper}>
                    <Icon name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={30} color="#4F8EF7" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgetPasswordButton}>
                <Text style={styles.forgetPasswordText}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default KotakLogin;

const { height, width } = Dimensions.get('window');
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
        marginTop: -height * 0.04,
    },
    loginTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#00A9FF',
        paddingTop: 30,
        paddingBottom: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -width * 0.07,
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
    eyeIconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -width * 0.07,
        position: 'relative',
        zIndex: 1,
    },
    forgetPasswordButton: {
        marginLeft: 110,
        marginBottom: 20,
    },
    forgetPasswordText: {
        color: '#00A9FF',
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
});
