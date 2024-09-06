import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Content = ({event}) => {
  const navigation = useNavigation();

  // const free = () => {
  //   return (
  //     <View
  //       style={{
  //         width: w(10),
  //         height: h(4.6),
  //         backgroundColor: '#ECD86E',
  //         position: 'absolute',
  //         borderRadius: w(6),
  //         top: h(-1),
  //         left: w(45),
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         elevation: 2,
  //       }}>
  //       <Text
  //         style={{
  //           fontSize: w(3.4),
  //           color: 'black',
  //           fontFamily: 'Poppins-SemiBold',
  //           marginTop: h(0.3),
  //         }}>
  //         Free
  //       </Text>
  //     </View>
  //   );
  // };
  const lokasi = location => {
    return (
      <View style={{flexDirection: 'row', marginTop: h(1.4)}}>
        <Icon
          name="map-marker-alt"
          color={'black'}
          size={w(4.6)}
          style={{marginLeft: w(2.8)}}
        />

        <Text
          style={{
            fontSize: w(3.2),
            color: 'black',
            fontFamily: 'Poppins-Regular',
            marginLeft: w(2.6),
          }}>
          {location}
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
              backgroundColor: '#D4EBFE',
              borderBottomRightRadius: w(6),
              borderBottomLeftRadius: w(6),
              borderTopRightRadius: w(5),
              borderTopLeftRadius: w(5),
              marginTop: h(8),
              marginLeft: w(7),
              marginRight: w(7),
              elevation: 5,
            }}>
            <View style={{alignItems: 'center', marginTop: 6}}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: w(49),
                  height: h(22),
                  borderTopLeftRadius: w(4),
                  borderTopRightRadius: w(4),
                }}
              />
            </View>
            {/* {item.title == 'Pendaftaran Calon Anggota' ? '' : free()} */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height:
                  item.title == 'Pendaftaran Calon Anggota' ? h(7.2) : h(4.2),
                marginTop: h(0.5),
              }}>
              <Text
                style={{
                  fontWeight: 'semibold',
                  fontFamily: 'Itim-Regular',
                  color: 'black',
                  fontSize: w(5),
                  textAlign: 'center',
                }}>
                {item.title}
              </Text>
            </View>
            {item.tema ? (
              <Text
                style={{
                  color: '#ffffff',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: w(2.5),
                  marginLeft: w(4.5),
                }}>
                Tema : {item.tema}
              </Text>
            ) : null}
            <View style={{flexDirection: 'row', marginTop: h(1.4)}}>
              <Icon
                name="calendar-alt"
                color={'black'}
                size={w(4.6)}
                style={{marginLeft: w(2.5)}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: w(3.4),
                  fontFamily: 'Poppins-Regular',
                  marginLeft: w(2.8),
                }}>
                {item.start_date}
              </Text>
            </View>
            {item.title == 'Pendaftaran Calon Anggota'
              ? ''
              : lokasi(item.location)}

            <TouchableOpacity
              onPress={() => navigation.navigate('EventDetail', {item})}
              style={{
                width: w(35),
                height: h(4.5),
                backgroundColor: '#ECD86E',
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
