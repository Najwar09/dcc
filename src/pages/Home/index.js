import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import StickyHeader from '../../component/Header'
import Swiper from 'react-native-swiper';
import ImageSwapper from '../../component/ImageSwapper';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
// gambar
import Treasure from '../../assets/icons/uang.png';
import Secretary from '../../assets/icons/surat.png';
import Members from '../../assets/icons/anggota.png';
import Schedule from '../../assets/icons/skejul.png';
import Absen from '../../assets/icons/absensi.png';
import Organization from '../../assets/icons/organisasi.png';
import Kepanitiaan from '../../assets/icons/panitia.png';
import Another from '../../assets/icons/lain.png';
import Content from '../../assets/images/konten.png';

const Artikel = () => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={Content} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
}

const Home = () => {
    return (
        <View style={{ flex: 1 }}>
            <StickyHeader name="Muh. Najwar Ramadhan" />

            <View style={{ alignItems: 'center', }}>
                <ImageSwapper />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: w(5), }}>
                <Text style={{ fontWeight: 'bold', fontSize: w(4), color: 'black' }}>Kategori</Text>
                <Text style={{ fontWeight: 'bold', fontSize: w(4), color: 'black' }}>More >></Text>
            </View>

            {/* Menu */}
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: w(5), }}>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Treasure} style={styles.menu} />
                        <Text style={styles.text}>Treasure</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Secretary} style={styles.menu} />
                        <Text style={styles.text}>Secretary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Members} style={styles.menu} />
                        <Text style={styles.text}>Members</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Schedule} style={styles.menu} />
                        <Text style={styles.text}>Schdule</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Absen} style={styles.menu} />
                        <Text style={styles.text}>Absen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Organization} style={styles.menu} />
                        <Text style={styles.text}>Organization</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.box}>
                        <Image source={Kepanitiaan} style={styles.menu} />
                        <Text style={styles.text}>Committee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={Another} style={styles.menu} />
                        <Text style={styles.text}>Other</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* end menu */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: w(5), }}>
                <Text style={{ fontWeight: 'bold', fontSize: w(4), color: 'black' }}>Latest Post</Text>
                <Text style={{ fontWeight: 'bold', fontSize: w(4), color: 'black' }}>More >></Text>
            </View>

            {/* artikel */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Artikel />
                <Artikel />
                <Artikel />
                <Artikel />
            </ScrollView>
            {/* end artikel */}


        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    menu: {
        width: w(10),
        height: w(10),
    },
    text: {
        textAlign: 'center',
    },
    box: {
        alignItems: 'center',
    },
    card: {
        marginRight: w(5),
        borderRadius: w(5),
        width: w('58%'),
        height: h('16.4%'),
        marginTop: w(5),

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    imageContainer: {
        width: w('58%'),
        height: h('16.4%'),
        borderRadius: w(5),
        overflow: 'hidden', 
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
})