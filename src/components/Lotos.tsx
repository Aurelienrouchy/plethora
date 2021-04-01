import React, {
    useState, useEffect, useContext, useLayoutEffect,
} from 'react';
import {
    StyleSheet, View, Animated, Text, TouchableOpacity, Image, Dimensions, ScrollView,
} from 'react-native';
import { useLotosStore } from '../utils/store';
// import { useQuery } from '@apollo/react-hooks';

import Loto from './Loto';
// import { GET_RAFFLES } from '../graphql/queries.js';
const { width, height } = Dimensions.get('screen');

export default function Lotos() {
    const store = useLotosStore();
    
    return (
        <View style={styles.main}>
            <Text style={styles.title}>Lottery draws</Text>
            <Text style={styles.subtitle}>More tickets, more chance to win !</Text>
            <View style={styles.lotos}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {
                        store.lotos.map((loto, key) => {
                            return ( <Loto {...{loto, key}} /> )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingRight: 30,
    },
    header: {
        height: 30,
        marginBottom: 20
    },
    lotos: {
        flex: 1
    },
    title: {
        fontFamily: 'CocogooseRegular',
        fontSize: 24,
        color: '#303030',
        marginTop: 30,
        marginBottom: 5
    },
    subtitle: {
        fontFamily: 'CocogooseSemilight',
        fontSize: 14,
        color: '#949494',
        marginBottom: 20
    },
});