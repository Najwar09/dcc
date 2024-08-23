import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import RenderHtml from 'react-native-render-html';

const formatDate = createdAt => {
  const options = {month: 'long', day: 'numeric', year: 'numeric'};
  const date = new Date(createdAt);
  return date.toLocaleDateString('en-US', options);
};

const ArticleDetail = ({route}) => {
  const {article} = route.params;
  const {width} = useWindowDimensions();

  const contentHtml = `
    <div style="text-align: justify;">
      ${article.content}
    </div>
  `;

  const formattedDate = formatDate(article.created_at);

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: article.image}} style={styles.image} />
      <View style={styles.box}>
        <Text style={styles.title}>{article.title}</Text>
        <View>
          <Text>{formattedDate}</Text>
        </View>
        <View style={styles.isiContent}>
          <RenderHtml contentWidth={width} source={{html: contentHtml}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: w('4%'),
  },
  image: {
    width: '100%',
    height: h('30%'),
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: h('2%'),
  },
  box: {
    backgroundColor: '#fff',
    padding: w('4%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: w(10),
    marginTop: w(-10),
  },
  title: {
    fontSize: w('6%'),
    fontWeight: 'bold',
    marginBottom: h('1%'),
  },
  isiContent: {
    textAlign: 'justify',
  },
  description: {
    fontSize: w('4%'),
    lineHeight: w('5%'),
  },
});

export default ArticleDetail;
