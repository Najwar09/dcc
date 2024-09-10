import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

// Componenet
import JadwalD from '../../component/Event/JadwalD';

const EventDetail = () => {
  const route = useRoute();
  const data = route.params.item;
  const navigation = useNavigation();

  // Fungsi untuk menghapus semua tag HTML dan mengambil teksnya
  const getPlainText = html => {
    // Menggunakan regex untuk menghapus tag HTML
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const cleanHtml = getPlainText(data.content);

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
          source={{uri: data.image}}
          resizeMode={'cover'}
          style={{
            width: w(100),
            height: h(47),
            borderBottomLeftRadius: w(20),
            marginBottom: h(14),
          }}
        />
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: w(12),
            height: h(6),
            position: 'absolute',
            top: h(6.5),
            left: w(8),
            backgroundColor: '#EFEFEF',
            borderRadius: w(6),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
          }}>
          <Icon name="arrow-left" size={w(7)} color={'black'} />
        </TouchableOpacity> */}

        <JadwalD data={data} />
        <View
          style={{
            marginLeft: w(7.5),
            marginRight: w(8.4),
            marginTop: h(-0.5),
            marginBottom: h(2),
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: 'black',
              fontSize: w(4.5),
            }}>
            About Event
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              fontFamily: 'Poppins-Regular',
              fontSize: w(3.5),
              color: 'black',
            }}>
            {cleanHtml}
          </Text>

          {data.title == 'Pendaftaran Calon Anggota' ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#3FA2F6',
                width: w(53),
                height: h(5.5),
                borderRadius: w(3),
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                marginLeft: w(16),
                marginTop: h(1.5),
                marginBottom: h(1),
              }}
              onPress={() => navigation.navigate('BeforeForm')}>
              <Text
                style={{
                  color: 'black',
                  fontSize: w(4),
                  fontFamily: 'Poppins-SemiBold',
                  marginTop: h(0.3),
                }}>
                Daftarkan Dirimu
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetail;
