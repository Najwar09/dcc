import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const JadwalD = ({data}) => {
  function formatDate(dateString) {
    // Pecah string tanggal berdasarkan tanda "-"
    const parts = dateString.split('-'); // ["YYYY", "MM", "DD"]

    // Konversi Format bulan angka ke nama bulan
    const date = new Date(parts[0], parts[1], parts[2]); // 2009-11-10
    const month = date.toLocaleString('default', {month: 'long'});
    // Susun ulang ke format DD-MM-YYYY
    return `${parts[2]}-${month}-${parts[0]}`;
  }

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        borderTopRightRadius: w(8),
        borderTopLeftRadius: w(8),
        borderBottomLeftRadius: w(2.9),
        borderBottomRightRadius: w(2.9),
        position: 'absolute',
        top: h(38),
        left: w(18),
        right: w(18),
        elevation: 3,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: w(3.8),
            marginTop: h(2),
            color: 'black',
            marginLeft: w(4),
            marginRight: w(4),
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center',
          }}>
          {data.title}
        </Text>
        {data.tema ? (
          <Text style={{fontSize: w(3.8), color: 'black', marginTop: h(-0.1)}}>
            {data.tema}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          marginTop: h(1.5),
          marginLeft: w(3.6),
          flexDirection: 'row',
        }}>
        <Icon name="calendar-alt" size={w(5)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(3.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4),
            color: 'black',
          }}>
          {formatDate(data.start_date)}
        </Text>
      </View>
      {/* <View
        style={{
          marginTop: h(0.5),
          marginLeft: w(3.3),
          flexDirection: 'row',
        }}>
        <Icon name="stopwatch" size={w(5)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(3.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4.4),
            color: 'black',
          }}>
          13:00
        </Text>
      </View> */}

      <View
        style={{
          marginTop: h(0.5),
          marginLeft: w(3.6),
          flexDirection: 'row',
        }}>
        <Icon name="map-marker-alt" size={w(5)} color={'#51A9F4'} />
        <Text
          style={{
            fontSize: w(3.6),
            fontFamily: 'Poppins-Regular',
            marginLeft: w(4.5),
            marginRight: w(4.5),
            marginBottom: h(1),
            color: 'black',
          }}>
          {data.location}
        </Text>
      </View>
      {/* <View
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
      </View> */}
      <View
        style={{
          width: w(26),
          backgroundColor: '#51A9F4',
          height: h(0.3),
          bottom: h(-1),
          marginLeft: w(19),
          marginRight: w(19),
          elevation: 1,
        }}
      />
    </View>
  );
};

export default JadwalD;
