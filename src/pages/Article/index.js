import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardArticle from '../../component/CardArticle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Article = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const navigation = useNavigation(); // Tambahkan ini

  const GetDataArticle = async () => {
    try {
      const res = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/artikel',
      );
      setDataArticle(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDataArticle();
  }, []);

  return (
    <>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Telusuri"
            placeholderTextColor="#666"
          />
          <Icon name="search" size={20} color="#666" style={styles.icon} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {dataArticle &&
            dataArticle.map(article => (
              <CardArticle
                title={article.title}
                imageUri={article.image}
                key={article.id}
                onPress={() => navigation.navigate('ArticleDetails', {article})}
              />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Article;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 10,
    marginTop: w(5),
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: w(90),
    height: h(6),
    position: 'relative', // Ditambahkan untuk membuat icon absolute bekerja dalam container
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{translateY: -10}], // Menyesuaikan posisi vertikal ikon
  },
});
