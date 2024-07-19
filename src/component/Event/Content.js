import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Content = () => {
  const free = () => {
    return (
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
    );
  };

  const imageSpeaker = (speaker, judul) => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Icon
          name="microphone-alt"
          size={14}
          color={'black'}
          style={{marginLeft: 12}}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: 'Poppins-Regular',
            color: 'black',
            fontSize: 10,
            marginRight: 13,
          }}>
          Speaker
        </Text>
        <View style={{flexDirection: 'row'}}>
          {speaker.map((item, key) => {
            return (
              <Image
                key={key}
                source={item}
                resizeMode="cover"
                style={{
                  width: 18,
                  height: 19,
                  borderRadius: 8,
                  marginLeft: -3,
                  marginTop: -2,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const [event, setEvent] = useState([
    {
      judul: 'Seminar IT',
      waktu: 'Kamis, 20 September 2024',
      rate: '9.2',
      gambar: require('../../assets/images/event/SeminarIT.jpg'),
      speaker: [
        require('../../assets/images/event/people1.jpg'),
        require('../../assets/images/event/people2.jpg'),
        require('../../assets/images/event/SadieSink.jpg'),
      ],
      waktu: '15:40 - 17:10 Wita',
      lokasi: 'Universitas Dipa Makassar',
      lokasiD: 'Gedung A Ruang 101',
      about:
        "lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      judul: 'Free Class',
      waktu: 'Sabtu, 22 September 2024',
      rate: '9.0',
      gambar: require('../../assets/images/event/FreeClass.jpg'),
      speaker: [
        require('../../assets/images/event/people1.jpg'),
        require('../../assets/images/event/people2.jpg'),
        require('../../assets/images/event/SadieSink.jpg'),
      ],
      waktu: '15:40 - 17:30 Wita',
      lokasi: 'Universitas Dipa Makassar',
      lokasiD: 'Gedung A',
      about:
        "lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      judul: 'Pendaftaran Calon Anggota',
      waktu: 'minggu, 23 September 2024',
      rate: '9.8',
      gambar: require('../../assets/images/event/Penerimaan.jpg'),
      waktu: '15:40 - 17:10 Wita',
      lokasi: 'Universitas Dipa Makassar',
      lokasiD: 'Gedung A ',
      about:
        "lorem Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]);

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
              source={item.gambar}
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
            {item.judul == 'Pendaftaran Calon Anggota' ? '' : free()}

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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: item.judul == 'Pendaftaran Calon Anggota' ? 50 : 30,
                marginTop: 80,
              }}>
              <Text
                style={{
                  fontWeight: 'semibold',
                  fontFamily: 'Itim-Regular',
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {item.judul}
              </Text>
              <TouchableOpacity
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  marginLeft: 4,
                }}>
                <Image
                  source={require('../../assets/images/event/like.png')}
                  style={{width: 16, height: 16, marginTop: 1.5}}
                  resizeMode="center"
                />
              </TouchableOpacity>
            </View>
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
            {item.judul == 'Pendaftaran Calon Anggota'
              ? null
              : imageSpeaker(item.speaker, item.judul)}
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
