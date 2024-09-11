import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import Icon from 'react-native-vector-icons/Ionicons';

const formatDate = createdAt => {
  const options = {month: 'long', day: 'numeric', year: 'numeric'};
  const date = new Date(createdAt);
  return date.toLocaleDateString('en-US', options);
};

const CardArticle = ({title, imageUri, onPress,name,time}) => {

  const formattedDate = formatDate(time);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: imageUri}} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.tagAndDateContainer}>
          <Text style={styles.tag}>{name}</Text>
          <View style={styles.dateContainer}>
            <Icon name="calendar-outline" color="#0088FF" size={w(4)} />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    shadowRadius: 3.84,marginHorizontal:w(5),
  },
  image: {
    width: w(90),
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
    color: '#333',
  },
  tagAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: h('1%'),
  },
  tag: {
    borderWidth: 1,
    paddingHorizontal: w(3),
    // paddingVertical: h(0),
    borderRadius: 10,
    textAlign: 'center',
    height: w(6),
    backgroundColor: '#f0f0f0',
    borderColor: '#dcdcdc',
    fontSize: w('3.5%'),
    color: '#333',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: w('1%'),
    fontSize: w('3.5%'),
    color: '#333',
  },
});

export default CardArticle;
