// import React, { useState, useEffect } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TouchableOpacity,
//     ScrollView,
//     Dimensions,
// } from 'react-native';
// import Swiper from 'react-native-swiper';
// import StickyHeader from '../../component/Header/index';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import satu from '../../assets/images/satu.jpg';
// import tiga from '../../assets/images/tiga.jpg';

// const gambar = [satu, tiga];

// const Home = () => {


//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             const nextIndex = (currentIndex + 1) % gambar.length;
//             setCurrentIndex(nextIndex);
//         }, 2000);
//         return () => clearInterval(intervalId);
//     }, [currentIndex]);

//     return (
//         <View style={styles.container}>
//             <LinearGradient
//                 style={{ flex: 1, width: '100%' }}
//                 colors={['white', '#d4f0fe']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 0, y: 1 }}>

//                 {/* KOMPONEN HEADER */}
//                 <StickyHeader title={'Muh. Najwar Ramadhan'} />
//                 {/* AKHIR KOMPONEN HEADER */}

//                 <ScrollView
//                     style={{
//                         width: '100%',
//                     }}>
//                     <View style={styles.container}>
//                         <Image
//                             source={gambar[currentIndex]}
//                             style={{
//                                 marginTop: 10,
//                                 borderRadius: 20,
//                                 resizeMode: 'cover',
//                             }}
//                         />

//                         <View style={styles.menu}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Kategori</Text>
//                         </View>
//                         <View
//                             style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                                 width: '80%',
//                                 paddingTop: 20,
//                             }}>
//                             <TouchableOpacity style={{ alignItems: 'center' }}>
//                                 <Image source={uang} style={styles.fitur} />
//                                 <Text style={styles.teks}>Treasurer</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ alignItems: 'center' }}>
//                                 <Image source={surat} style={styles.fitur} />
//                                 <Text style={styles.teks}>Secretary</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={{ alignItems: 'center' }}
//                                 onPress={menuanggota}>
//                                 <Image source={anggota} style={styles.fitur} />
//                                 <Text style={styles.teks}>Member</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ alignItems: 'center' }}>
//                                 <Image source={skejul} style={styles.fitur} />
//                                 <Text style={styles.teks}>Schejuled</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View
//                             style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                                 width: '80%',
//                                 paddingTop: 20,
//                             }}>
//                             <TouchableOpacity style={{ alignItems: 'center' }}>
//                                 <Image source={absensi} style={styles.fitur} />
//                                 <Text style={styles.teks}>Presence</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ alignItems: 'center' }}>
//                                 <Image source={organisasi} style={styles.fitur} />
//                                 <Text style={styles.teks}>Organization</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={{ alignItems: 'center' }}
//                                 onPress={menukepanitiaan}>
//                                 <Image source={panitia} style={styles.fitur} />
//                                 <Text style={styles.teks}>Committee</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={{ alignItems: 'center' }}>
//                                 <Image source={lain} style={styles.fitur} />
//                                 <Text style={styles.teks}>More</Text>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.menu}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
//                                 Latest Post
//                             </Text>
//                             <TouchableOpacity>
//                                 <Text style={{ fontSize: 15 }}>More</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <ScrollView
//                             horizontal={true}
//                             style={{ flexDirection: 'row', paddingVertical: 20 }}>
//                             <Image
//                                 source={konten}
//                                 style={{
//                                     width: 250,
//                                     height: 150,
//                                     marginHorizontal: 15,
//                                     borderRadius: 20,
//                                 }}
//                             />
//                             <Image
//                                 source={konten}
//                                 style={{
//                                     width: 250,
//                                     height: 150,
//                                     marginHorizontal: 15,
//                                     borderRadius: 20,
//                                 }}
//                             />
//                             <Image
//                                 source={konten}
//                                 style={{
//                                     width: 250,
//                                     height: 150,
//                                     marginHorizontal: 15,
//                                     borderRadius: 20,
//                                 }}
//                             />
//                         </ScrollView>
//                     </View>
//                 </ScrollView>
//             </LinearGradient>
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // justifyContent: 'center',
//         alignItems: 'center',
//     },
//     foto: {
//         marginTop: 10,
//         borderRadius: 20,
//         resizeMode: 'cover',
//     },
//     menu: {
//         width: '100%',
//         flexDirection: 'row',
//         // backgroundColor: 'red',
//         justifyContent: 'space-between',
//         marginTop: 30,
//         paddingHorizontal: 40,
//         alignItems: 'center',
//     },
//     fitur: {
//         width: 40,
//         height: 40,
//     },
//     teks: {
//         color: 'black',
//     },
// });
