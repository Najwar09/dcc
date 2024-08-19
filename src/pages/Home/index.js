import React, {useState, useEffect} from 'react';
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
import Dcc from '../../assets/icons/logo.png';
import OnlineRegistration from '../../assets/icons/OnlineRegistration.png';
import Schedule from '../../assets/icons/skejul.png';
import Absen from '../../assets/icons/absensi.png';
import Organization from '../../assets/icons/organisasi.png';
import Kepanitiaan from '../../assets/icons/panitia.png';
import Quiz from '../../assets/icons/Quiz.png';
import Content from '../../assets/images/konten.png';
import Event from '../../assets/icons/Event.png';

import {removeItem} from '../../../utils/asyncStorate';
import axios from 'axios';

const Artikel = ({title, description, imageUri}) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.imageContainer}>
      <Image source={{uri: imageUri}} style={styles.image} />
    </View>
    <View style={styles.articleTextContainer}>
      <Text style={styles.articleTitle}>{title}</Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        {description}
      </Text>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const navigation = useNavigation();
  const [showLottie, setShowLottie] = useState(true);
  const [goldBoxIndex, setGoldBoxIndex] = useState(3);
  const [dataArticle, setDataArticle] = useState([]);

  const Reset = async () => {
    await removeItem('onboarded');
    navigation.push('OnboardingScreen');
  };

  const menuItems = [
    {icon: Treasure, label: 'Treasure', action: Reset},
    {
      icon: Dcc,
      label: 'Informasi DCC',
      action: () => navigation.navigate('InfoDcc'),
    },
    {icon: Quiz, label: 'Quiz', action: () => navigation.navigate('Quiz')},
    {
      icon: OnlineRegistration,
      label: 'Daftar DCC',
      action: () => navigation.navigate('BeforeForm'),
    },
    {
      icon: Event,
      label: 'Event DCC',
      action: () => navigation.navigate('Event'),
    },
  ];

  const GetDataArticle = async () => {
    try {
      const res = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/artikel',
      );
      setDataArticle(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataArticle();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        resizeMode="center"
        source={require('../../assets/animation/tet.json')}
        autoPlay
        loop
        style={styles.backgroundLottie}
      />

      <StickyHeader />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.swapperContainer}>
          <ImageSwapper />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.box,
                index === goldBoxIndex ? {backgroundColor: '#FFD700'} : null,
              ]}
              onPress={item.action}>
              <Image source={item.icon} style={styles.menu} />
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Post</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.articleContainer}>
          {dataArticle.map(article => (
            <Artikel
              imageUri={article.image}
              key={article.id}
              title={article.title}
              description={article.description}
            />
          ))}
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
    // marginBottom: h(1),
  },
  divider: {
    width: '100%',
    height: 3,
    backgroundColor: '#4777D759',
    marginVertical: h(2),
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
    color: '#79A1ED',
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
    fontSize: w(3.2),
    color: 'black',
  },
  box: {
    alignItems: 'center',
    margin: w(1),
    backgroundColor: '#FFF',
    borderRadius: w(2),
    padding: w(3),
    elevation: 4,
    width: '22%',
  },
  card: {
    marginRight: w(5),
    borderRadius: w(5),
    width: w(58),
    height: h(20),
    marginBottom: w(5),
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
    height: '70%',
    borderTopLeftRadius: w(5),
    borderTopRightRadius: w(5),
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  articleTextContainer: {
    padding: w(2),
  },
  articleTitle: {
    fontSize: w(4),
    fontWeight: 'bold',
    color: '#333',
  },
  articleDescription: {
    fontSize: w(3),
    color: '#777',
  },
  articleContainer: {
    paddingVertical: w(2),
    // marginVertical: w(6),
    marginBottom: w(20),

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
