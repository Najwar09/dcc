import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import CardArticle from '../../component/CardArticle'
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as w, heightPercentageToDP as h } from '../../../responsive';
import ActivityCard from '../../component/CardActivity';

const Activity = () => {
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

                {/* commite */}
                <View style={{ marginVertical: w(3), flexDirection: 'row', }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginRight: w(10), fontStyle: 'italic', fontWeight: 'bold', }}>Committe</Text>

                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, marginRight: w(10), paddingHorizontal: w(5), }}>
                        <Text style={{ fontSize: 16, }}>Terbaru</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, paddingHorizontal: w(5), }}>
                        <Text style={{ fontSize: 16, }}>Terlama</Text>
                    </TouchableOpacity>
                </View>
                {/* end commite */}

                {/* article component */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ActivityCard title='Loyality,Generalize,Integrity and Creative' />
                    <ActivityCard title='Loyality,Generalize,Integrity and Creative' />
                    <ActivityCard title='Loyality,Generalize,Integrity and Creative' />
                    <ActivityCard title='Loyality,Generalize,Integrity and Creative' />
                    <ActivityCard title='Loyality,Generalize,Integrity and Creative' />
                    <ActivityCard title='Loyality,Generalize,Integrity and Creative' />
                </ScrollView>
                {/* end article component */}
            </View>
        </>
    )
}

export default Activity

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