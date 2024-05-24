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
        <TouchableOpacity style={{marginRight: w(5),borderRadius: w(5),width: w('58%'), height: h('16.4%'),marginTop: w(5),}}>
            <View style={{ width: w('58%'), height: h('16.4%'), borderRadius: w(5)}}>
                <Image source={Content} style={{ resizeMode: 'cover', width: w(58), height: w(33.1),borderRadius: w(5)}} />
            </View>
        </TouchableOpacity>
    )
}


const Home = () => {
    return (
        <View style={{ flex: 1, }}>
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
                    <TouchableOpacity>
                        <Image source={Treasure} style={styles.menu} />
                        <Text style={styles.text}>Treasure</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Secretary} style={styles.menu} />
                        <Text style={styles.text}>Secretary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Members} style={styles.menu} />
                        <Text style={styles.text}>Members</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Schedule} style={styles.menu} />
                        <Text style={styles.text}>Schdule</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity>
                        <Image source={Absen} style={styles.menu} />
                        <Text style={styles.text}>Absen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Organization} style={styles.menu} />
                        <Text style={styles.text}>Organization</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={Kepanitiaan} style={styles.menu} />
                        <Text style={styles.text}>Committee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
        width: w(13),
        height: w(13),
    },
    text: {
        textAlign: 'center',
    }
})