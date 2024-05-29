import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import penerimaan from '../../assets/images/penerimaan.png';
import Icon from 'react-native-vector-icons/Ionicons';


const ActivityCard = ({ title, description, imageUri }) => {
    return (
        <View style={styles.card}>
            <Text style={{ textAlign: 'center', fontSize: w(5), fontWeight: 'bold', marginVertical: w(2), }}>Kepanitiaan Penerimaan XXVI</Text>

            {/* gambar */}
            <Image source={penerimaan} style={styles.image} />
            {/* end gambar */}

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>

                {/* details */}
                <View style={{ flexDirection: 'row', }}>
                    {/* icon location */}
                    <View style={{ justifyContent: 'center', }}>
                        <Icon name="location-outline" color="#0088FF" size={w(8)} />
                    </View>
                    {/* end icon location */}

                    <View style={{ flex: 2, }}>
                        <Text>Tempat</Text>
                        <Text>Basecamp DCC, BTN Antara Blok A11 No. 2</Text>
                    </View>
                    {/* button more */}
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ backgroundColor: '#0088FF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, color: 'white' }}>More</Text>
                    </TouchableOpacity>
                    {/* end button more */}
                </View>
                {/* end details */}

                {/* icon date */}
                <View style={{ flexDirection: 'row',}}>
                    <Icon name="calendar-outline" color="#0088FF" size={w(8)} style={{ alignItems: 'center', }} />
                    <View style={{ justifyContent: 'center', }}>
                        <Text >10 Agustus - 23 September 2023</Text>
                    </View>
                </View>
                {/* end icon date */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: w('90%'),
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: h('1%'),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: '100%',
        height: h('20%'),
        resizeMode: 'contain',
    },
    content: {
        padding: w('3%'),
    },
    title: {
        fontSize: w('5%'),
        fontWeight: 'bold',
        marginBottom: h('1%'),
    },
    description: {
        fontSize: w('4%'),
        color: '#666',
    },
});

export default ActivityCard;
