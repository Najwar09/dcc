import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Content = ({event}) => {
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
            }}>
            <Image
              source={require('../../assets/images/event/SeminarIT.jpg')}
              resizeMode="cover"
              style={{
                width: 211,
                height: 200,
                borderRadius: 100,
                position: 'absolute',
                top: -120,
                left: -3,
              }}
            />
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
            <View
              style={{
                width: 44,
                height: 18,
                backgroundColor: '#ffffff',
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                position: 'absolute',
                top: -50,
                left: -2,
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
            <Text
              style={{
                fontWeight: 'semibold',
                fontFamily: 'Itim-Regular',
                color: 'black',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 80,
              }}>
              {item.judul}
            </Text>
            <Text
              style={{
                color: '#ffffff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
                marginLeft: 16,
                marginTop: -1,
              }}>
              Tema : Jenjang IT di Masa Depan
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
            {item.speaker}
            <TouchableOpacity
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
        )}>
        {' '}
      </FlatList>
    </View>
  );
};

export default Content;
