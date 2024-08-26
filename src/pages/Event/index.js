import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Content from '../../component/Event/Content';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Event = () => {
  const navigation = useNavigation();

  const header = () => {
    return (
      <View
        style={{
          backgroundColor: '#51A9F4',
          height: h(14.5),
          width: w(100),
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomRightRadius: w(6),
          borderBottomLeftRadius: w(6),
          elevation: 1,
        }}>
        <TouchableOpacity
          style={{marginLeft: w(6), marginTop: h(3.5)}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color={'black'} size={w(9)} />
        </TouchableOpacity>
        <View
          style={{
            width: w(9),
            height: h(4.5),
            borderRadius: w(5),
            borderWidth: w(0.7),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: w(6),
            marginTop: h(3.5),
          }}>
          <Icon name="info" size={w(4)} color={'black'} />
        </View>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#D9D9D9',
            borderRadius: w(6),
            elevation: 1,
            top: h(11),
            left: w(28),
            width: w(44),
            height: h(0.3),
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: h(11.6),
            left: w(21),
            backgroundColor: '#ffffff',
            width: w(60),
            height: h(5),
            borderRadius: w(4),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: w(4.3),
              marginTop: h(0.5),
              fontFamily: 'Poppins-SemiBold',
            }}>
            UPCOMING EVENT
          </Text>
        </View>
      </View>
    );
  };

  const imageSwiper = () => {
    const data = [
      {
        judul: 'Pelatihan Daerah',
        waktu: 'Kamis, 22 Oktober 2023',
        rating: '8.9',
        image: require('../../assets/images/event/SadieSink.jpg'),
      },
      {
        judul: 'Pelatihan Komputer',
        waktu: 'Senin, 10 Agustus 2023',
        rating: '8.4',
        image: require('../../assets/images/event/Penerimaa.jpeg'),
      },
      {
        judul: 'Festival IT',
        waktu: 'Jumat, 10 April 2024',
        rating: '9.0',
        image: require('../../assets/images/event/people1.jpg'),
      },
    ];

    return data.map((item, key) => {
      return (
        <View
          key={key}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            alignSelf: 'center',
            borderRadius: w(2),
            marginTop: h(0.8),
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              height: h(120),
              width: w(72),
            }}>
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#51A9F4'} />
        {header()}
        <Content />
        <View
          style={{
            width: w(100),
            height: h(28.7),
            backgroundColor: '#D4EBFE',
            borderTopRightRadius: w(10),
            borderTopLeftRadius: w(10),
            elevation: 2,
            marginTop: h(1),
            marginBottom: h(8),
          }}>
          <View style={{flexDirection: 'row', marginTop: h(-2.8)}}>
            <View>
              <Text
                style={{
                  marginTop: h(6),
                  marginLeft: w(15),
                  fontFamily: 'Poppins-SemiBold',
                  color: 'black',
                  fontSize: w(4),
                }}>
                Previous Event
              </Text>
              <View
                style={{
                  marginTop: h(-0.3),
                  backgroundColor: '#51A9F4',
                  opacity: 0.6,
                  elevation: 0.2,
                  width: w(12),
                  height: h(0.3),
                  marginLeft: w(15.5),
                }}></View>
            </View>
            <Text
              style={{
                marginTop: h(6.6),
                marginLeft: w(31.5),
                color: '#E54D4D',
                fontFamily: 'Poppins-Regular',
                fontSize: w(3.3),
              }}>
              See More
            </Text>
          </View>

          <Swiper autoplay={true} autoplayTimeout={3}>
            {imageSwiper()}
          </Swiper>
          <View
            style={{
              width: w(10.5),
              height: h(2.2),
              position: 'absolutes',
              backgroundColor: '#ffffff',
              bottom: h(17),
              left: w(16),
              borderTopRightRadius: w(1),
              borderBottomRightRadius: w(1),
              elevation: 0.6,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/event/starRate.png')}
              resizeMode="cover"
              style={{
                width: w(3),
                height: h(1.5),
                marginBottom: h(0.3),
                marginLeft: w(1),
              }}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'black',
                fontSize: w(2.5),
                marginLeft: w(0.7),
                marginTop: h(0.2),
              }}>
              8.4
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              width: w(7),
              height: h(3.5),
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: w(4),
              top: h(9),
              right: w(18),
            }}>
            <Image
              source={require('../../assets/images/event/like.png')}
              style={{width: w(5), height: h(2), marginTop: h(0.3)}}
              resizeMode="center"
            />
          </TouchableOpacity>

          <View
            style={{
              width: w(44),
              height: h(4.5),
              backgroundColor: '#ffffff',
              position: 'absolute',
              bottom: h(2.2),
              left: w(14),
              borderTopRightRadius: w(4),
              borderBottomRightRadius: w(4),
              alignItems: 'flex-start',
              elevation: 0.4,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: 'black',
                fontSize: w(2.7),
                marginTop: h(0.4),
                marginLeft: w(3.4),
              }}>
              Pelatihan Komputer
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: w(2.6),
                  color: 'black',
                  marginLeft: w(3.4),
                  marginTop: h(-0.4),
                }}>
                Senin, 24 Oktober 2023
              </Text>
              <Icon
                name="calendar-alt"
                color={'#3FA2F6'}
                size={w(3.2)}
                style={{marginLeft: w(2), marginTop: h(-0.6)}}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Event;
