import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const JadwalD = ({data}) => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: 203,
        height: data.judul == 'Pendaftaran Calon Anggota' ? 172 : 161,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        top: data.judul == 'Pendaftaran Calon Anggota' ? 270 : 280,
        left: 95,
        elevation: 3,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 10,
            width: 150,
            color: 'black',
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center',
          }}>
          {data.judul}
        </Text>
        <Text style={{fontSize: 11, color: 'black', marginTop: -2}}>
          {data.tema}
        </Text>
      </View>
      <View
        style={{
          marginTop: 12,
          marginLeft: 14,

          flexDirection: 'row',
        }}>
        <Icon name="calendar-alt" size={14} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
            marginLeft: 16,
            color: 'black',
          }}>
          {data.jadwal}
        </Text>
      </View>
      <View
        style={{
          marginTop: 4,
          marginLeft: 14,
          flexDirection: 'row',
        }}>
        <Icon name="stopwatch" size={14} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
            marginLeft: 16,
            color: 'black',
          }}>
          {data.waktu}
        </Text>
      </View>

      <View
        style={{
          marginTop: 4,
          marginLeft: 14,
          flexDirection: 'row',
        }}>
        <Icon name="map-marker-alt" size={14} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
            marginLeft: 16,
            color: 'black',
          }}>
          {data.lokasi}
        </Text>
      </View>
      <View
        style={{
          marginTop: 4,
          marginLeft: 16,

          flexDirection: 'row',
        }}>
        <Icon name="map-pin" size={14} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
            marginLeft: 18,
            color: 'black',
          }}>
          {data.lokasiD}
        </Text>
      </View>
    </View>
  );
};

export default JadwalD;
