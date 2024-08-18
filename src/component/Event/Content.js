import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Content = () => {
  const navigation = useNavigation();
  const [event, setEvent] = useState();

  useEffect(() => {
    fetch('http://10.0.2.2:3000/Event/')
      .then(res => res.json())
      .then(data => setEvent(data));

    // tarik();
  }, []);

  // const tarik = async () => {
  //   try {
  //     const response = await fetch('http://10.0.2.2:3000/Event/');
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log('Error ambil data Api', error);
  //   }
  // };

  const free = () => {
    return (
      <View
        style={{
          width: w(10),
          height: h(4.6),
          backgroundColor: '#ECD86E',
          position: 'absolute',
          borderRadius: w(6),
          top: h(-1),
          left: w(45),
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Text
          style={{
            fontSize: w(3.4),
            color: '#745C5C',
            fontFamily: 'Poppins-SemiBold',
            marginTop: h(0.3),
          }}>
          Free
        </Text>
      </View>
    );
  };
  const lokasi = lokasi => {
    return (
      <View style={{flexDirection: 'row', marginTop: h(1.4)}}>
        <Icon
          name="map-marker-alt"
          color={'black'}
          size={w(3.7)}
          style={{marginLeft: w(2.8)}}
        />

        <Text
          style={{
            fontSize: w(2.6),
            fontFamily: 'Poppins-Regular',
            color: 'black',
            marginLeft: w(2.6),
          }}>
          {lokasi}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={event}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{height: h(53)}}
        renderItem={({item}) => (
          <View
            style={{
              height: h(40.5),
              width: w(52),
              backgroundColor: '#80AF81',
              borderBottomRightRadius: w(6),
              borderBottomLeftRadius: w(6),
              borderTopRightRadius: w(5),
              borderTopLeftRadius: w(5),
              marginTop: h(8),
              marginLeft: w(7),
              marginRight: w(7),
              elevation: 2,
            }}>
            <View style={{alignItems: 'center', marginTop: 6}}>
              <Image
                source={{uri: item.gambar}}
                style={{
                  width: w(49),
                  height: h(22),
                  borderTopLeftRadius: w(4),
                  borderTopRightRadius: w(4),
                }}
              />
            </View>
            {item.judul == 'Pendaftaran Calon Anggota' ? '' : free()}

            <View
              style={{
                width: w(11.5),
                height: h(2.4),
                backgroundColor: '#ffffff',
                borderTopRightRadius: w(1),
                borderBottomRightRadius: w(1),
                position: 'absolute',
                top: w(18),
                left: w(-0.2),
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/event/starRate.png')}
                resizeMode="cover"
                style={{width: w(3), height: h(1.6), marginLeft: w(1.5)}}
              />
              <Text
                style={{
                  marginLeft: w(0.8),
                  marginTop: h(0.2),
                  color: 'black',
                  fontSize: w(3),
                  fontFamily: 'Poppins-Regular',
                }}>
                {item.rate}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height:
                  item.judul == 'Pendaftaran Calon Anggota' ? h(7.2) : h(4.2),
                marginTop: h(0.5),
              }}>
              <Text
                style={{
                  fontWeight: 'semibold',
                  fontFamily: 'Itim-Regular',
                  color: 'black',
                  fontSize: w(4.6),
                  textAlign: 'center',
                }}>
                {item.judul}
              </Text>
              <TouchableOpacity
                style={{
                  width: w(6.5),
                  height: h(3.3),
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: w(5),
                  marginLeft: w(1),
                }}>
                <Image
                  source={require('../../assets/images/event/like.png')}
                  style={{width: w(4), height: h(2), marginTop: h(0.3)}}
                  resizeMode="center"
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: w(2.5),
                marginLeft: w(4.5),
              }}>
              Tema : {item.tema}
            </Text>
            <View style={{flexDirection: 'row', marginTop: h(1.4)}}>
              <Icon
                name="calendar-alt"
                color={'black'}
                size={w(3.5)}
                style={{marginLeft: w(2.5)}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: w(2.6),
                  fontFamily: 'Poppins-Regular',
                  marginLeft: w(2.8),
                }}>
                {item.jadwal}
              </Text>
            </View>
            {item.judul == 'Pendaftaran Calon Anggota'
              ? ''
              : lokasi(item.lokasi)}

            <TouchableOpacity
              onPress={() => navigation.navigate('EventDetail', {item})}
              style={{
                width: w(35),
                height: h(4.5),
                backgroundColor: '#3FA2F6',
                borderRadius: w(2.5),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: h(38),
                left: w(9),
                elevation: 3,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: w(4.3),
                  color: '#ffffff',
                }}>
                Detail Event
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Content;
