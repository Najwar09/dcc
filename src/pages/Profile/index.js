import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import najwar from '../../assets/images/najwar.jpeg';
import ellipse from '../../assets/images/ellipse.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w } from '../../../responsive';

const CustomRadioButton = ({ label, value, selectedValue, onPress }) => {
    return (
        <TouchableOpacity style={styles.radioButtonContainer} onPress={() => onPress(value)}>
            <Icon
                name={selectedValue === value ? "radio-button-on" : "radio-button-off"}
                size={24}
                color={selectedValue === value ? "#0088FF" : "#ccc"}
            />
            <Text style={styles.radioButtonText}>{label}</Text>
        </TouchableOpacity>
    );
};

const Profile = () => {
    const [gender, setGender] = useState('male');

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* image */}
                <View>
                    <Image source={ellipse} style={{ width: w(100), position: 'relative' }} />
                    <Image source={najwar} style={styles.profileImage} />
                </View>
                {/* end image */}

                {/* form */}
                <View style={{ marginTop: w(20) }}>

                    {/* stambuk */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Stambuk</Text>
                        <View style={styles.inputContainer}>
                            <TextInput value='202018' style={styles.input} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end stambuk */}

                    {/* nama lengkap */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nama Lengkap</Text>
                        <View style={styles.inputContainer}>
                            <TextInput value='Muh. Najwar Ramadhan' style={styles.input} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end nama lengkap */}

                    {/* no anggota */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>No Anggota</Text>
                        <View style={styles.inputContainer}>
                            <TextInput value='DCC.12I7.G3J.GK4' style={styles.input} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end no anggota */}

                    {/* angkatan */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Angkatan</Text>
                        <View style={styles.inputContainer}>
                            <TextInput value='24' style={styles.input} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end angkatan */}

                    {/* tempat lahir */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tempat Lahir</Text>
                        <View style={styles.inputContainer}>
                            <TextInput value='Makassar' style={styles.input} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end tempat lahir */}

                    {/* tanggal lahir */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tanggal Lahir</Text>
                        <View style={styles.inputContainer}>
                            <TextInput value='20 Januari 2002' style={styles.input} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end tanggal lahir */}

                    {/* jenis kelamin */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Jenis Kelamin</Text>
                        <View style={styles.radioContainer}>
                            <CustomRadioButton label="Laki-laki" value="male" selectedValue={gender} onPress={setGender} />
                            <CustomRadioButton label="Perempuan" value="female" selectedValue={gender} onPress={setGender} />
                        </View>
                    </View>
                    {/* end jenis kelamin */}
                </View>
                {/* end form */}
            </ScrollView>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    profileImage: {
        width: w(40),
        height: w(40),
        borderRadius: w(20),
        backgroundColor: 'red',
        position: 'absolute',
        bottom: w(-15),
        right: w(32),
    },
    formGroup: {
        margin: w(2),
    },
    label: {
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
    },
    icon: {
        marginLeft: w(10),
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    radioButtonText: {
        marginLeft: 8,
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});
