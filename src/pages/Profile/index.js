import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RadioButton } from 'react-native'
import React from 'react'
import najwar from '../../assets/images/najwar.jpeg';
import ellipse from '../../assets/images/ellipse.png';
import addimage from '../../assets/icons/addimage.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import { RadioButton } from 'react-native-paper';


const Profile = () => {
    const [value, setValue] = React.useState('first');

    return (
        <View style={{ flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* image */}
                <View style={{}}>
                    <Image source={ellipse} style={{ width: w(100), position: 'relative', }} />
                    <Image source={najwar} style={{ width: w(40), height: w(40), borderRadius: w(100), backgroundColor: 'red', position: 'absolute', bottom: w(-15), right: w(32), }} />
                </View>
                {/* end image */}

                {/* form */}
                <View style={{ marginTop: w(20) }}>

                    {/* stambuk */}
                    <View style={{ margin: w(2) }}>
                        <Text style={{ fontWeight: 'bold', }}>Stambuk</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <TextInput value='202018' style={{ flex: 1, }} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end stambuk */}

                    {/* nama lengkap */}
                    <View style={{ margin: w(2), }}>
                        <Text style={{ fontWeight: 'bold', }}>Nama Lengkap</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <TextInput value='Muh. Najwar Ramadhan' style={{ flex: 1, }} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end nama lengkap */}

                    {/* no anggota */}
                    <View style={{ margin: w(2), }}>
                        <Text style={{ fontWeight: 'bold', }}>Stambuk</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <TextInput value='DCC.12I7.G3J.GK4' style={{ flex: 1, }} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end no anggota */}

                    {/* angkatan */}
                    <View style={{ margin: w(2), }}>
                        <Text style={{ fontWeight: 'bold', }}>Angkatan</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <TextInput value='24' style={{ flex: 1, }} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end angkatan */}

                    {/* tempat lahir */}
                    <View style={{ margin: w(2), }}>
                        <Text style={{ fontWeight: 'bold', }}>Tempat Lahir</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <TextInput value='Makassar' style={{ flex: 1, }} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end tempat lahir */}

                    {/* tanggal lahir */}
                    <View style={{ margin: w(2), }}>
                        <Text style={{ fontWeight: 'bold', }}>Tanggal Lahir</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <TextInput value='20 Januari 2002' style={{ flex: 1, }} />
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end tanggal lahir */}

                    {/* jenis kelamin */}
                    <View style={{ margin: w(2), }}>
                        <Text style={{ fontWeight: 'bold', }}>Tanggal Lahir</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', }}>
                            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label="First item" value="first" />
                                <RadioButton.Item label="Second item" value="second" />
                            </RadioButton.Group>
                            <TouchableOpacity>
                                <Icon name="create-outline" color="#0088FF" size={w(8)} style={{ marginLeft: w(10) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* end jenis kelamin */}
                </View>
                {/* end form */}

            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})