// StickyHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w } from '../../../responsive';

const StickyHeader = ({ name }) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>Hello!</Text>
                <Text style={styles.name}>{name}</Text>
            </View>

            {/* Icon Notification */}
            <TouchableOpacity>
                <Icon name="notifications-outline" color="#3b5998" size={w(7)} />
            </TouchableOpacity>
            {/* End Icon Notification */}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: w(5),
        paddingVertical: w(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    greeting: {
        fontWeight: 'bold',
        fontSize: w(5),
        color: 'black',
    },
    name: {
        fontSize: w(4),
        color: '#555',
    },
});

export default StickyHeader;
