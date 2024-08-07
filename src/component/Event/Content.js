import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

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
          width: 40,
          height: 36,
          backgroundColor: '#ECD86E',
          position: 'absolute',
          borderRadius: 20,
          top: -8,
          left: 170,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Text
          style={{
            fontSize: 13,
            color: '#745C5C',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Free
        </Text>
      </View>
    );
  };
  const lokasi = lokasi => {
    return (
      <View style={{flexDirection: 'row', marginTop: 12}}>
        <Icon
          name="map-marker-alt"
          color={'black'}
          size={14}
          style={{marginLeft: 10}}
        />

        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
            color: 'black',
            marginLeft: 10,
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
        style={{height: 410}}
        renderItem={({item}) => (
          <View
            style={{
              height: 320,
              width: 205,
              backgroundColor: '#80AF81',
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: 60,
              marginLeft: 22,
              marginRight: 22,
              elevation: 2,
            }}>
            <View style={{alignItems: 'center', marginTop: 6}}>
              <Image
                source={{uri: item.gambar}}
                style={{
                  width: 192,
                  height: 170,

                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
            </View>
            {item.judul == 'Pendaftaran Calon Anggota' ? '' : free()}

            <View
              style={{
                width: 44,
                height: 18,
                backgroundColor: '#ffffff',
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                position: 'absolute',
                top: 65,
                left: -1,
                elevation: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/event/starRate.png')}
                resizeMode="cover"
                style={{width: 12, height: 12, marginLeft: 6}}
              />
              <Text
                style={{
                  marginLeft: 3,
                  marginTop: 1,
                  color: 'black',
                  fontSize: 11,
                  fontFamily: 'Poppins-Regular',
                }}>
                {item.rate}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: item.judul == 'Pendaftaran Calon Anggota' ? 50 : 30,
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontWeight: 'semibold',
                  fontFamily: 'Itim-Regular',
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {item.judul}
              </Text>
              <TouchableOpacity
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  marginLeft: 4,
                }}>
                <Image
                  source={require('../../assets/images/event/like.png')}
                  style={{width: 16, height: 16, marginTop: 1.5}}
                  resizeMode="center"
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
                marginLeft: 16,
              }}>
              Tema : {item.tema}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              <Icon
                name="calendar-alt"
                color={'black'}
                size={14}
                style={{marginLeft: 10}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  fontFamily: 'Poppins-Regular',
                  marginLeft: 10,
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
                width: 138,
                height: 34,
                backgroundColor: '#3FA2F6',
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 295,
                left: 34,
                elevation: 3,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
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
