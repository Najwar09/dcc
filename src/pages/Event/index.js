import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
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
          height: 111,
          width: 395,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          elevation: 1,
        }}>
        <TouchableOpacity
          style={{marginLeft: 23, marginTop: 26}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color={'black'} size={35} />
        </TouchableOpacity>
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 20,
            borderWidth: 3,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 23,
            marginTop: 26,
          }}>
          <Icon name="info" size={16} color={'black'} />
        </View>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#D9D9D9',
            borderRadius: 12,
            elevation: 1,
            top: 85,
            left: 106,
            width: 174,
            height: 2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 90,
            left: 80,
            backgroundColor: '#ffffff',
            width: 233,
            height: 40,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
            }}>
            UpComing Event
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
            marginTop: 6,
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
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#51A9F4'} />
      {header()}
      <Content />
      <View
        style={{
          width: 396,
          height: 224,
          backgroundColor: '#D4EBFE',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          elevation: 2,
          marginTop: 16,
        }}>
        <View style={{flexDirection: 'row', marginTop: -20}}>
          <View>
            <Text
              style={{
                marginTop: 49,
                marginLeft: 60,
                fontFamily: 'Poppins-SemiBold',
                color: 'black',
                fontSize: 13,
              }}>
              Event Story
            </Text>
            <View
              style={{
                marginTop: -2,
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
              marginTop: 49,
              marginLeft: 140,
              color: '#E54D4D',
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
            }}>
            See More
          </Text>
        </View>

        <Swiper autoplay={true} autoplayTimeout={3}>
          {imageSwiper()}
        </Swiper>
        <View
          style={{
            width: 38,
            height: 16,
            position: 'absolutes',
            backgroundColor: '#ffffff',
            bottom: 135,
            left: 62,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            elevation: 0.6,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/images/event/starRate.png')}
            resizeMode="cover"
            style={{width: 12, height: 12, marginBottom: 1, marginLeft: 4}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'black',
              fontSize: 10,
              marginLeft: 2,
            }}>
            8.4
          </Text>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 26,
            height: 26,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            top: 70,
            right: 75,
          }}>
          <Image
            source={require('../../assets/images/event/like.png')}
            style={{width: 16, height: 16, marginTop: 1.5}}
            resizeMode="center"
          />
        </TouchableOpacity>

        <View
          style={{
            width: 170,
            height: 34,
            backgroundColor: '#ffffff',
            position: 'absolute',
            bottom: 16,
            left: 57,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            alignItems: 'flex-start',
            elevation: 0.4,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: 'black',
              fontSize: 10,
              marginTop: 3,
              marginLeft: 14,
            }}>
            Pelatihan Komputer
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: 'black',
                marginLeft: 14,
                marginTop: -2,
              }}>
              Senin, 24 Oktober 2023
            </Text>
            <Icon
              name="calendar-alt"
              color={'#3FA2F6'}
              size={12}
              style={{marginLeft: 8, marginTop: -2}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Event;
