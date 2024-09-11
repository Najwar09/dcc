import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; // Tambahkan ini untuk gradient
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Content = ({event}) => {
  const navigation = useNavigation();

  const lokasi = location => {
    return (
      <View style={{flexDirection: 'row', marginTop: h(1.4), alignItems: 'center'}}>
        <Icon name="map-marker-alt" color={'#6C63FF'} size={w(4.6)} style={{marginLeft: w(2.8)}} />
        <Text style={{
            fontSize: w(3.2),
            color: '#6C63FF', 
            fontFamily: 'Poppins-Regular',
            marginLeft: w(2.6),
            fontWeight: 'bold',
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
          <TouchableOpacity
            onPress={() => navigation.navigate('EventDetail', {item})}
            style={{
              height: h(42),
              width: w(52),
              backgroundColor: '#ffffff',
              borderRadius: w(6),
              marginHorizontal: w(5),
              marginTop: h(8),
              elevation: 5,
              overflow: 'hidden',
            }}>
            {/* Gradient Header */}
            <LinearGradient 
              colors={['#6C63FF', '#88A1FF']} 
              style={{height: h(22), borderTopLeftRadius: w(6), borderTopRightRadius: w(6)}}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: w(6),
                  borderTopRightRadius: w(6),
                  resizeMode: 'cover',
                }}
              />
            </LinearGradient>

            {/* Title Section */}
            <View style={{padding: w(3), alignItems: 'center'}}>
              <Text style={{
                fontFamily: 'Poppins-Bold',
                color: '#000',
                fontSize: w(4.5),
                textAlign: 'center',
              }}>
                {item.title}
              </Text>
              {item.tema && (
                <Text style={{
                  color: '#6C63FF',
                  fontFamily: 'Poppins-Regular',
                  fontSize: w(3),
                  marginTop: h(0.5),
                }}>
                  Tema: {item.tema}
                </Text>
              )}
            </View>

            {/* Event Date and Location */}
            <View style={{paddingHorizontal: w(3), marginTop: h(1.5)}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="calendar-alt" color={'#6C63FF'} size={w(4)} />
                <Text style={{
                  color: '#000',
                  fontSize: w(3.4),
                  fontFamily: 'Poppins-Regular',
                  marginLeft: w(2),
                }}>
                  {item.start_date}
                </Text>
              </View>
              {lokasi(item.location)}
            </View>

            {/* Detail Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EventDetail', {item})}
              style={{
                marginTop: h(1.8),
                backgroundColor: '#6C63FF',
                paddingVertical: h(1.2),
                borderRadius: w(2.5),
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: w(3),
              }}>
              <Text style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: w(3.5),
                color: '#FFF',
              }}>
                Detail Event
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Content;
