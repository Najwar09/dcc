import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, ActivityIndicator, FlatList, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import CardArticle from '../../component/CardArticle';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';

const Article = () => {
  const [dataArticle, setDataArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  const navigation = useNavigation();

  const GetDataArticle = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await axios.get(
        `https://api-mobile.dcc-dp.com/api/artikel?page=${pageNumber}&limit=10`,
      );
      const newData = res.data.data;

      setDataArticle(prevData => {
        const allArticles = [...prevData, ...newData];

        // Menghapus duplikasi berdasarkan id artikel
        const uniqueArticles = Array.from(
          new Set(allArticles.map(article => article.id))
        ).map(id => {
          return allArticles.find(article => article.id === id);
        });

        return uniqueArticles;
      });
      
      setHasMore(newData.length > 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    GetDataArticle(page);
  }, [page]);

  // Fungsi untuk memfilter artikel berdasarkan pencarian
  const filteredArticles = dataArticle.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMoreData = () => {
    if (!loadingMore && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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

      {loading ? (
        <SkeletonPlaceholder>
          <View style={styles.skeletonCard} />
          <View style={styles.skeletonCard} />
          <View style={styles.skeletonCard} />
          <View style={styles.skeletonCard} />
          <View style={styles.skeletonCard} />
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <CardArticle
              title={item.title}
              imageUri={item.image}
              name={item.category.name}
              time={item.created_at}
              onPress={() => navigation.navigate('ArticleDetails', {article: item})}
            />
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}

      {filteredArticles.length === 0 && !loading && (
        <Text style={styles.noResultsText}>Artikel tidak ditemukan</Text>
      )}
    </View>
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
