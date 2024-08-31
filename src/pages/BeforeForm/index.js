import React from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import logo from '../../assets/icons/logo.png';
import {useRoute} from '@react-navigation/native';

const BeforeForm = ({navigation}) => {
  const route = useRoute();
  const dataStb = route.params.data;

  return (
    <View style={{flex: 1, backgroundColor: '#F5F7F8'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#F5F7F8'} />
      <View
        style={{
          alignItems: 'center',
          marginTop: h(10),
        }}>
        <Image source={logo} style={{width: 141, height: 87}} />
        <Text
          style={{
            color: '#0000FE',
            fontSize: w(5),
            fontFamily: 'Inter-Regular',
            fontWeight: 'bold',
            marginTop: 4,
          }}>
          Dipanegara Computer Club
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          height: h(10),
          marginTop: h(3),
          borderTopRightRadius: w(12),
          opacity: 0.7,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#79A1ED',
          height: w(135),
          marginTop: h(-9),
          borderTopRightRadius: w(13),
          elevation: 2,
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text style={{fontSize: w(10), color: '#ffffff', fontWeight: '600'}}>
          Selamat Datang!
        </Text>
        <Text
          style={{
            marginTop: 15,
            marginLeft: 54,
            marginRight: 54,
            color: '#ffffff',
            paddingHorizontal: 1,
            fontSize: w(4),
            fontStyle: 'italic',
          }}>
          Silahkan isi form untuk memulai
        </Text>
        <Text style={{color: '#ffffff', fontSize: w(4), fontStyle: 'italic'}}>
          petualangan yang menarik bersama kami
        </Text>
        <Image
          source={require('../../assets/images/Pendaftaran/welcome.png')}
          style={{width: h(35), height: h(35)}}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{
            width: w(60),
            height: h(6),
            borderRadius: w(20),
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 1,
            backgroundColor: '#ffffff',
            elevation: 3,
          }}
          onPress={() => navigation.navigate('FormRegis', {dataStb})}>
          <Text style={{fontSize: w(5), color: '#3570E4', fontWeight: 'bold'}}>
            Mulai Pendaftaran
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BeforeForm;
