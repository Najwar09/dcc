import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import StickyHeader from '../../component/Header';
import ImageSwapper from '../../component/ImageSwapper';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import Treasure from '../../assets/icons/uang.png';
import Secretary from '../../assets/icons/surat.png';
import Members from '../../assets/icons/anggota.png';
import Schedule from '../../assets/icons/skejul.png';
import Absen from '../../assets/icons/absensi.png';
import Organization from '../../assets/icons/organisasi.png';
import Kepanitiaan from '../../assets/icons/panitia.png';
import Another from '../../assets/icons/lain.png';
import Content from '../../assets/images/konten.png';
import {removeItem} from '../../../utils/asyncStorate';

const Artikel = () => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.imageContainer}>
      <Image source={Content} style={styles.image} />
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const navigation = useNavigation();
  const [showLottie, setShowLottie] = useState(true);

  const Reset = async () => {
    await removeItem('onboarded');
    navigation.push('OnboardingScreen');
  };

  const menuItems = [
    {icon: Treasure, label: 'Treasure', action: Reset},
    {icon: Secretary, label: 'Secretary'},
    {
      icon: Members,
      label: 'Members',
      action: () => navigation.navigate('BeforeForm'),
    },
    {icon: Schedule, label: 'Schedule'},
    {icon: Absen, label: 'Absen'},
    {icon: Organization, label: 'Organization'},
    {icon: Kepanitiaan, label: 'Committee'},
    {icon: Another, label: 'Quiz', action: () => navigation.navigate('Quiz')},
  ];

  return (
    <View style={styles.container}>
      <LottieView
        resizeMode="center"
        source={require('../../assets/animation/tet.json')}
        autoPlay
        loop
        style={styles.backgroundLottie}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <StickyHeader name="Muh. Najwar Ramadhan" />

        <View style={styles.swapperContainer}>
          <ImageSwapper />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategori</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={item.action}>
              <Image source={item.icon} style={styles.menu} />
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Post</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.articleContainer}>
          <Artikel />
          <Artikel />
          <Artikel />
          <Artikel />
        </ScrollView>

        {showLottie && (
          <LottieView
            source={require('../../assets/animation/confetti.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
            onAnimationFinish={() => setShowLottie(false)}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flex: 1,
    padding: w(5),
  },
  backgroundLottie: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  swapperContainer: {
    alignItems: 'center',
    marginBottom: h(3),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: w(2),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: w(5),
    color: 'black',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: h(2),
  },
  menu: {
    width: w(10),
    height: w(10),
    marginBottom: h(1),
  },
  text: {
    textAlign: 'center',
    fontSize: w(3),
    color: 'black',
  },
  box: {
    alignItems: 'center',
    margin: w(1),
    backgroundColor: '#FFF',
    borderRadius: w(2),
    padding: w(3),
    elevation: 2,
    width: '22%',
  },
  card: {
    marginRight: w(5),
    borderRadius: w(5),
    width: w(58),
    height: h(16.4),
    marginBottom: w(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: w(5),
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  articleContainer: {
    paddingVertical: h(2),
  },
  lottie: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: w(100),
    height: w(100),
    transform: [{translateX: -w(50)}, {translateY: -w(50)}],
    zIndex: 1,
  },
});
