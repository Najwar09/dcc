import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React from 'react'
import CardArticle from '../../component/CardArticle'
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';

const Article = () => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', }}>

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
          <CardArticle title='How To Make CRUD In Laravel' />
          <CardArticle title='How To Make CRUD In Laravel' />
          <CardArticle title='How To Make CRUD In Laravel' />
          <CardArticle title='How To Make CRUD In Laravel' />
          <CardArticle title='How To Make CRUD In Laravel' />
        </ScrollView>
        {/* end article component */}
      </View>
    </>
  )
}

export default Article

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
})