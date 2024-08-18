import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const JadwalD = ({data}) => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: w(53),
        height: data.judul == 'Pendaftaran Calon Anggota' ? h(22) : h(19.5),
        borderTopRightRadius: w(8),
        borderTopLeftRadius: w(8),
        borderBottomLeftRadius: w(2.9),
        borderBottomRightRadius: w(2.9),
        position: 'absolute',
        top: data.judul == 'Pendaftaran Calon Anggota' ? h(34) : h(36),
        left: w(25),
        elevation: 3,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: w(3.6),
            marginTop: h(1.2),
            width: w(50),
            color: 'black',
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center',
          }}>
          {data.judul}
        </Text>
        <Text style={{fontSize: w(2.8), color: 'black', marginTop: h(-0.1)}}>
          {data.tema}
        </Text>
      </View>
      <View
        style={{
          marginTop: h(1.5),
          marginLeft: w(3.6),
          flexDirection: 'row',
        }}>
        <Icon name="calendar-alt" size={w(3.6)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(2.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4),
            color: 'black',
          }}>
          {data.jadwal}
        </Text>
      </View>
      <View
        style={{
          marginTop: h(0.5),
          marginLeft: w(3.3),
          flexDirection: 'row',
        }}>
        <Icon name="stopwatch" size={w(3.6)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(2.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4.4),
            color: 'black',
          }}>
          {data.waktu}
        </Text>
      </View>

      <View
        style={{
          marginTop: h(0.5),
          marginLeft: w(3.6),
          flexDirection: 'row',
        }}>
        <Icon name="map-marker-alt" size={w(3.6)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(2.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4.5),
            color: 'black',
          }}>
          {data.lokasi}
        </Text>
      </View>
      <View
        style={{
          marginTop: h(0.4),
          marginLeft: w(3.8),

          flexDirection: 'row',
        }}>
        <Icon name="map-pin" size={w(4)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(2.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4.8),
            color: 'black',
          }}>
          {data.lokasiD}
        </Text>
      </View>
      <View
        style={{
          width: w(26),
          backgroundColor: '#51A9F4',
          height: h(0.3),
          bottom: data.judul == 'Pendaftaran Calon Anggota' ? h(-2.2) : h(-2.2),
          marginLeft: w(13),
          elevation: 1,
        }}
      />
    </View>
  );
};

export default JadwalD;
