import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Event = () => {
  const navigation = useNavigation();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(
    Array.from({length: 5}, () => true), // Array loading untuk masing-masing gambar
  );

  useEffect(() => {
    fetch('https://dcc-testing.campa-bima.online/public/api/agenda')
      .then(res => res.json())
      .then(data => {
        setEvent(data.data);
        setLoading(false);
      });
  }, []);

  const gambar = [
    {id: 1, uri: require('./../../assets/images/event/1.jpg')},
    {id: 2, uri: require('./../../assets/images/event/2.jpg')},
    {id: 3, uri: require('./../../assets/images/event/3.jpg')},
    {id: 4, uri: require('./../../assets/images/event/4.jpg')},
    {id: 5, uri: require('./../../assets/images/event/5.jpg')},
  ];

  // Fungsi untuk menangani awal loading gambar
  const handleLoadStart = index => {
    setLoadingImages(prev => {
      const newLoading = [...prev];
      newLoading[index] = true;
      return newLoading;
    });
  };

  // Fungsi untuk menangani akhir loading gambar
  const handleLoadEnd = index => {
    setLoadingImages(prev => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const imageSwiper = () => {
    return (
      <View
        style={{
          overflow: 'hidden',
          height: h(40),
          width: w(100),
          marginTop: h(-9),
          alignItems: 'center',
        }}>
        <Swiper
          autoplay
          dotColor="#ccc"
          activeDotColor="#ff6347"
          autoplayTimeout={5}
          showsPagination={true}>
          {gambar.map((item, index) => (
            <View key={item.id}>
              {loadingImages[index] && (
                <ActivityIndicator
                  size={'large'}
                  color="#ff6347"
                  style={styles.activityIndicator}
                />
              )}
              <Image
                source={item.uri}
                resizeMode="center"
                onLoadStart={() => handleLoadStart(index)}
                onLoad={() => handleLoadEnd(index)}
                style={{width: w('100%'), height: h('100%'), marginTop: h(-25)}}
              />
            </View>
          ))}
        </Swiper>
      </View>
    );
  };

  function formatDate(dateString) {
    // Pecah string tanggal berdasarkan tanda "-"
    const parts = dateString.split('-'); // ["YYYY", "MM", "DD"]

    // Konversi Format bulan angka ke nama bulan
    const date = new Date(parts[0], parts[1], parts[2]); // 2009-11-10
    const month = date.toLocaleString('default', {month: 'long'});
    // Susun ulang ke format DD-MM-YYYY
    return `${parts[2]}-${month}-${parts[0]}`;
  }

  return (
    <View style={{flex: 1}}>
      {imageSwiper()}
      <View
        style={{
          backgroundColor: '#f8f8f8',
          width: w('100%'),
          height: h('100%'),
          borderTopRightRadius: w(5),
          borderTopLeftRadius: w(5),
          elevation: 6,
          marginTop: h(-2),
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#79A1ED',
            width: w(15),
            height: h(0.4),
            borderRadius: w(10),
            marginTop: h(0.8),
            elevation: 2,
          }}
        />
        <Text
          style={{
            color: 'black',
            marginTop: h(3),
            fontFamily: 'Poppins-Bold',
            fontSize: w(5),
            marginRight: w(50),
          }}>
          LATEST EVENT
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: h(38.3)}}>
          {event.map((item, key) => {
            return (
              <View
                key={key}
                style={{
                  backgroundColor: 'white',
                  height: h(22),
                  width: w(90),
                  borderRadius: w(4),
                  marginBottom: h(2),
                  elevation: 3,
                  paddingLeft: w(2),
                  paddingTop: h(0.5),
                  borderTopWidth: 0.2,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: w(40),
                      height: h(20),
                      marginTop: h(0.5),
                      borderRadius: w(4),
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      marginLeft: w(3),
                      marginTop: h(1),
                      width: w(50),
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: w(5),
                        marginRight: w(4),
                      }}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: h(1.5),
                      }}>
                      <Icon
                        name="calendar-alt"
                        color={'#79A1ED'}
                        size={w(4)}
                        style={{marginTop: h(0.3)}}
                      />
                      <Text style={styles.textEvent}>
                        {formatDate(item.start_date)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: h(2),
                      }}>
                      <Icon
                        name="map-marker-alt"
                        color={'#79A1ED'}
                        size={w(4.5)}
                        style={{marginTop: h(0.1)}}
                      />
                      <Text style={styles.textEvent2}>{item.location}</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: w(42),
                        height: h(4),
                        backgroundColor: '#79A1ED',
                        marginTop: h(2.3),
                        marginRight: w(4),
                        borderRadius: w(4),
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: h(0.5),
                        elevation: 1.4,
                      }}
                      onPress={() =>
                        navigation.navigate('EventDetail', {item})
                      }>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Detail Event
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default Event;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
    zIndex: 1,
  },
  textEvent: {
    fontFamily: 'Inter-Reguler',
    color: 'black',
    fontSize: w(4),
    marginLeft: w(2),
  },
  textEvent2: {
    fontFamily: 'Inter-Reguler',
    color: 'black',
    fontSize: w(4),
    marginLeft: w(2.5),
  },
});
