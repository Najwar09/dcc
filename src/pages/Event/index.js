import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const Event = () => {
  const navigation = useNavigation();
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
            elevation: 2,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
            UpComing Event
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Event;
