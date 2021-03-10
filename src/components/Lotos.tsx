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
    // const { loading, error, data, startPolling, stopPolling } = useQuery(GET_RAFFLES, {pollInterval: 5000 });
    // const [raffles, setRaffles] = useState([]);

    // useLayoutEffect(() => {
    //     if (data) {
    //         const res = raffles.map(raffle => {
    //             const usersCount = (data.getRaffles.filter(dt => dt.price === raffle.price)[0] || {}).usersCount || 0;
    //             return {
    //                 ...raffle,
    //                 usersCount
    //             }
    //         });
    //         setRaffles(res)
    //     }
    //     startPolling(5000);
    //     return stopPolling
    // }, [data]);

    // useEffect(() => {
    //     if (lotos.length) {
    //         Animated.stagger(
    //             200,
    //             lotos.map((raffle, index) => Animated.timing(raffle.translateY, {
    //                 toValue: 0,
    //                 duration: 500,
    //                 useNativeDriver: true,
    //             }))
    //         ).start();
    //     }
    // }, [lotos])

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Tombola</Text>
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
        marginTop: 30,
        paddingRight: 30
    },
    header: {
        height: 30,
        marginBottom: 20
    },
    lotos: {
        flex: 1
    },
    title: {
        // fontFamily: 'MontserratSM',
        fontSize: 24,
        color: '#303030',
        marginTop: 30,
        marginBottom: 20
    },
});