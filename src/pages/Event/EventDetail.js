import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

// Componenet
import JadwalD from '../../component/Event/JadwalD';

const EventDetail = () => {
  const route = useRoute();
  const data = route.params.item;
  const navigation = useNavigation();

  const speaker = data => {
    return data.map((item, key) => {
      return (
        <View
          key={key}
          style={{
            marginLeft: 18,
            marginRight: 20,
            marginTop: 10,
            alignItems: 'center',
            height: 120,
          }}>
          <Image
            source={{uri: item.gambarS}}
            style={{width: 80, height: 80, borderRadius: 50, elevation: 3}}
          />
          <View
            style={{
              height: 25,
              backgroundColor: '#80AF81',
              marginTop: 6,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              elevation: 1,
            }}>
            <Text
              style={{
                color: 'black',
                marginTop: 1,
                marginLeft: 8,
                marginRight: 8,
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}>
              {item.tipe} : <Text>{item.speakerD}</Text>
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4EBFE',
        flex: 1,
      }}>
      <ScrollView>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'light-content'}
        />
        <Image
          source={{uri: data.gambar}}
          style={{
            width: 395,
            height: 365,
            borderBottomLeftRadius: 80,
            marginBottom: 118,
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 46,
            height: 46,
            position: 'absolute',
            top: 48,
            left: 30,
            backgroundColor: '#EFEFEF',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
          }}>
          <Icon name="arrow-left" size={26} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 46,
            height: 46,
            position: 'absolute',
            top: 48,
            right: 30,
            backgroundColor: '#EFEFEF',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
          }}>
          <Image
            source={require('../../assets/images/event/like.png')}
            resizeMode="center"
            style={{width: 26, height: 26, marginTop: 2}}
          />
        </TouchableOpacity>
        <JadwalD data={data} />
        <View
          style={{
            width: 100,
            backgroundColor: '#51A9F4',
            height: 2,
            position: 'absolute',
            bottom: data.judul == 'Pendaftaran Calon Anggota' ? 272 : 379,
            left: 145,
            elevation: 1,
          }}
        />

        {data.judul == 'Pendaftaran Calon Anggota' ? (
          ''
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              width: 400,
              marginTop: -25,
            }}>
            {speaker(data.speaker)}
          </ScrollView>
        )}

        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: -6,
            marginBottom: 12,
          }}>
          <Text style={{fontFamily: 'Poppins-SemiBold', color: 'black'}}>
            About Event
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
            }}>
            {data.about}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetail;
