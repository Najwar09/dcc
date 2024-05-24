// StickyHeader.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w } from '../../../responsive';

const StickyHeader = (props) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black' }}>
                    Hello!
                </Text>
                <Text style={{ fontSize: 15 }}>{props.name}</Text>
            </View>

            {/* icon notif */}
            <TouchableOpacity>
                <Icon name="build" color="#3b5998" size={w(10)} />
            </TouchableOpacity>
            {/* end icon notif */}

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        padding: 10,
        position: 'relative',
        // marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: 20,
        // backgroundColor: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default StickyHeader;
