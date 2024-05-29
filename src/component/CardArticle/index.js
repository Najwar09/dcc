import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import article from '../../assets/images/article.png';
import Icon from 'react-native-vector-icons/Ionicons';


const ArticleCard = ({ title, description, imageUri }) => {
  return (
    <View style={styles.card}>

      {/* gambar */}
      <Image source={imageUri || article} style={styles.image} />
      {/* end gambar */}

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', }}>
          <Text style={{ borderWidth: 1, paddingRight: w(8), paddingLeft: w(8), borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, textAlign: 'center', height: w(6), }}>HTML</Text>

          <View style={{flexDirection: 'row',alignItems: 'center',}}>

          <Icon name="calendar-outline" color="#0088FF" size={w(5)}/>
          <Text>Desember 11, 2024</Text>
          </View>
        </View>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: h('20%'),
    resizeMode: 'contain', // Ensures the image is contained within its box
  },
  content: {
    padding: w('3%'),
  },
  title: {
    fontSize: w('5%'),
    fontWeight: 'bold',
    marginBottom: h('1%'),
  },
  description: {
    fontSize: w('4%'),
    color: '#666',
  },
});

export default ArticleCard;
