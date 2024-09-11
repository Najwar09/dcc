import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import penerimaan from '../../assets/images/penerimaan.png';
import Icon from 'react-native-vector-icons/Ionicons';

const ActivityCard = ({title, description, imageUri}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Kepanitiaan Penerimaan XXVI</Text>

      {/* gambar */}
      <Image source={penerimaan} style={styles.image} />
      {/* end gambar */}

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {/* details */}
        <View style={styles.detailsContainer}>
          {/* icon location */}
          <Icon
            name="location-outline"
            color="#0088FF"
            size={w(6)}
            style={styles.icon}
          />
          {/* end icon location */}

          <View style={styles.locationDetails}>
            <Text style={styles.detailHeader}>Tempat</Text>
            <Text style={styles.detailText}>
              Basecamp DCC, BTN Antara Blok A11 No. 2
            </Text>
          </View>
          {/* button more */}
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>More</Text>
          </TouchableOpacity>
          {/* end button more */}
        </View>
        {/* end details */}

        {/* icon date */}
        <View style={styles.dateContainer}>
          <Icon
            name="calendar-outline"
            color="#0088FF"
            size={w(6)}
            style={styles.icon}
          />
          <View style={styles.dateDetails}>
            <Text style={styles.detailText}>
              10 Agustus - 23 September 2023
            </Text>
          </View>
        </View>
        {/* end icon date */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: w('90%'),
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: h('1%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: w(5),
    fontWeight: 'bold',
    marginVertical: w(2),
  },
  image: {
    width: '100%',
    height: h('20%'),
    resizeMode: 'cover',
  },
  content: {
    padding: w('4%'),
  },
  title: {
    fontSize: w('5%'),
    fontWeight: 'bold',
    marginBottom: h('1%'),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: h('1%'),
  },
  icon: {
    marginRight: w('2%'),
  },
  locationDetails: {
    flex: 2,
  },
  detailHeader: {
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: w('3.5%'),
    color: '#666',
  },
  moreButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0088FF',
    paddingHorizontal: w(3),
    paddingVertical: h(1),
    borderRadius: 20,
  },
  moreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateDetails: {
    justifyContent: 'center',
    marginLeft: w('2%'),
  },
});

export default ActivityCard;
