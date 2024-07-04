import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from '../../../responsive';
import ActivityCard from '../../component/CardActivity';

const Activity = () => {
  return (
    <View style={styles.container}>
      {/* filter */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telusuri"
          placeholderTextColor="#666"
        />
        <Icon name="search" size={20} color="#666" style={styles.icon} />
      </View>
      {/* end filter */}

      {/* commite */}
      <View style={styles.committeeContainer}>
        <Text style={styles.committeeTitle}>Committee</Text>
        <View style={styles.committeeButtons}>
          <TouchableOpacity style={styles.committeeButton}>
            <Text style={styles.committeeButtonText}>Terbaru</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.committeeButton}>
            <Text style={styles.committeeButtonText}>Terlama</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* end commite */}

      {/* article component */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <ActivityCard title="Loyality, Generalize, Integrity and Creative" />
        <ActivityCard title="Loyality, Generalize, Integrity and Creative" />
        <ActivityCard title="Loyality, Generalize, Integrity and Creative" />
        <ActivityCard title="Loyality, Generalize, Integrity and Creative" />
        <ActivityCard title="Loyality, Generalize, Integrity and Creative" />
        <ActivityCard title="Loyality, Generalize, Integrity and Creative" />
      </ScrollView>
      {/* end article component */}
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    paddingTop: h(3),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: w(3),
    marginVertical: h(2),
    width: w('90%'),
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: w(2),
  },
  committeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: h(2),
    width: w('90%'),
  },
  committeeTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  committeeButtons: {
    flexDirection: 'row',
  },
  committeeButton: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: w(1),
    paddingHorizontal: w(3),
    paddingVertical: h(0.5),
  },
  committeeButtonText: {
    fontSize: 16,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: h(2),
  },
});
