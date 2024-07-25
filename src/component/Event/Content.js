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
  });

  const free = () => {
    return (
      <View
        style={{
          width: 40,
          height: 36,
          backgroundColor: '#ECD86E',
          position: 'absolute',
          borderRadius: 20,
          top: -115,
          left: 150,
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

  const imageSpeaker = speaker => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Icon
          name="microphone-alt"
          size={14}
          color={'black'}
          style={{marginLeft: 12}}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: 'Poppins-Regular',
            color: 'black',
            fontSize: 10,
            marginRight: 13,
          }}>
          Speaker
        </Text>
        <View style={{flexDirection: 'row'}}>
          {speaker.map((item, key) => {
            return (
              <Image
                key={key}
                source={{uri: item.gambarS}}
                resizeMode="cover"
                style={{
                  width: 18,
                  height: 19,
                  borderRadius: 8,
                  marginLeft: -3,
                  marginTop: -2,
                  borderWidth: 0.3,
                  borderColor: 'white',
                }}
              />
            );
          })}
        </View>
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
              height: 212,
              width: 205,
              backgroundColor: '#80AF81',
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              marginTop: 166,
              marginLeft: 22,
              marginRight: 22,
              elevation: 2,
            }}>
            <Image
              source={{uri: item.gambar}}
              resizeMode="cover"
              style={{
                width: 211,
                height: 200,
                borderRadius: 100,
                position: 'absolute',
                top: -120,
                left: -3,
                elevation: 2,
              }}
            />
            {item.judul == 'Pendaftaran Calon Anggota' ? '' : free()}
            <View
              style={{
                width: 44,
                height: 18,
                backgroundColor: '#ffffff',
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                position: 'absolute',
                top: -55,
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
                marginTop: 80,
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
                marginTop: -1,
              }}>
              Tema : {item.tema}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 14}}>
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
                {item.waktu}
              </Text>
            </View>
            {item.judul == 'Pendaftaran Calon Anggota'
              ? null
              : imageSpeaker(item.speaker)}
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
                top: 195,
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
