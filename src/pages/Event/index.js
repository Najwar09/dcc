import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import Content from '../../component/Event/Content';

const Event = () => {
  const navigation = useNavigation();

  const imageSpeaker = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../../assets/images/event/people1.jpg')}
          resizeMode="cover"
          style={{
            width: 18,
            height: 19,
            borderRadius: 8,
            marginLeft: 14,
            marginTop: -2,
          }}
        />
        <Image
          source={require('../../assets/images/event/people2.jpg')}
          resizeMode="cover"
          style={{
            width: 18,
            height: 19,
            borderRadius: 8,
            marginLeft: -3,
            marginTop: -2,
          }}
        />
        <Image
          source={require('../../assets/images/event/SadieSink.jpg')}
          resizeMode="cover"
          style={{
            width: 18,
            height: 19,
            borderRadius: 8,
            marginLeft: -3,
            marginTop: -2,
          }}
        />
      </View>
    );
  };

  const [event, setEvent] = useState([
    {
      judul: 'Seminar IT',
      waktu: 'Kamis, 20 September 2024',
      rate: '9.2',
      speaker: (
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
            }}>
            Speaker
          </Text>
          {imageSpeaker()}
        </View>
      ),
    },
    {
      judul: 'Free Class',
      waktu: 'Sabtu, 22 September 2024',
      rate: '9.0',
      speaker: (
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
            }}>
            Speaker
          </Text>
          {imageSpeaker()}
        </View>
      ),
    },
    {
      judul: 'Pendaftaran Calon Anggota',
      waktu: 'minggu, 23 September 2024',
      rate: '9.8',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#51A9F4'} />
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
          <Icon name="arrow-left" color={'black'} size={25} />
        </TouchableOpacity>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            borderWidth: 3,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 23,
            marginTop: 26,
          }}>
          <Icon name="info" size={14} color={'black'} />
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
      <Content event={event} />
    </View>
  );
};

export default Event;
