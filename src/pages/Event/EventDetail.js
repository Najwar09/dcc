import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
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

  // const speaker = data => {
  //   return data.map((item, key) => {
  //     return (
  //       <View
  //         key={key}
  //         style={{
  //           marginLeft: w(4.5),
  //           marginRight: w(6),
  //           marginTop: h(0.5),
  //           alignItems: 'center',
  //           height: h(16),
  //         }}>
  //         <Image
  //           source={{uri: item.gambarS}}
  //           style={{
  //             width: w(20.5),
  //             height: h(10.3),
  //             borderRadius: w(10),
  //             elevation: 3,
  //           }}
  //         />
  //         <View
  //           style={{
  //             height: h(3.5),
  //             backgroundColor: '#80AF81',
  //             marginTop: h(1),
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             borderRadius: w(3),
  //             elevation: 1,
  //           }}>
  //           <Text
  //             style={{
  //               color: 'black',
  //               marginLeft: w(2),
  //               marginRight: w(2.5),
  //               fontSize: w(3),
  //               fontFamily: 'Poppins-Regular',
  //             }}>
  //             {item.tipe} : <Text>{item.speakerD}</Text>
  //           </Text>
  //         </View>
  //       </View>
  //     );
  //   });
  // };

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
        <TouchableOpacity
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
        </TouchableOpacity>

        <JadwalD data={data} />

        {/* {data.judul == 'Pendaftaran Calon Anggota' ? (
          ''
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              width: w(102),
              marginTop: h(-3.2),
            }}>
            {speaker(data.speaker)}
          </ScrollView>
        )} */}

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
            {data.content}
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