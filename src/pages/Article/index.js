import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardArticle from '../../component/CardArticle';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import axios from 'axios';

const Article = () => {
  const [dataArticle, setDataArticle] = useState([]);

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
        {/* filter */}
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Telusuri"
            placeholderTextColor="#666"
          />
          <Icon name="search" size={20} color="#666" style={styles.icon} />
        </View>
        {/* end filter */}

        {/* article component */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataArticle &&
            dataArticle.map(article => (
              <CardArticle
                title={article.title}
                imageUri={article.image}
                key={article.id}
              />
            ))}
        </ScrollView>
        {/* end article component */}
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
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    marginTop: w(5),
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
});
