// StickyHeader.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const StickyHeader = ({ title }) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black' }}>
                    Hello!
                </Text>
                <Text style={{ fontSize: 15 }}>{title}</Text>
            </View>
            <TouchableOpacity>
                <Image source={notice} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        padding: 10,
        position: 'relative',
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default StickyHeader;
