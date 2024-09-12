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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; 

const Article = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const GetDataArticle = async () => {
    try {
      const res = await axios.get(
        'https://dcc-testing.campa-bima.online/public/api/artikel',
      );
      setDataArticle(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDataArticle();
  }, []);

  // Fungsi untuk memfilter artikel berdasarkan pencarian
  const filteredArticles = dataArticle.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Telusuri"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <Icon name="search" size={20} color="#666" style={styles.icon} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <SkeletonPlaceholder>
              <View style={styles.skeletonCard} />
              <View style={styles.skeletonCard} />
              <View style={styles.skeletonCard} />
              <View style={styles.skeletonCard} />
              <View style={styles.skeletonCard} />
              <View style={styles.skeletonCard} />
            </SkeletonPlaceholder>
          ) : (
            filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <CardArticle
                  title={article.title}
                  imageUri={article.image}
                  name={article.category.name}
                  time={article.created_at}
                  key={article.id}
                  onPress={() => navigation.navigate('ArticleDetails', {article})}
                />
              ))
            ) : (
              <Text style={styles.noResultsText}>Artikel tidak ditemukan</Text>
            )
          )}
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
    position: 'relative',
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
    transform: [{translateY: -10}],
  },
  skeletonCard: {
    width: w(90),
    height: h(15),
    borderRadius: 10,
    marginVertical: h(1.5),
    alignSelf: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: h(2),
    fontSize: 16,
    color: '#666',
  },
});
