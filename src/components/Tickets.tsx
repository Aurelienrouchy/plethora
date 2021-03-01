import React, {
    useState, useMemo, useContext, useEffect,
} from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView,
} from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
// import Animated, {
//     event,
//     sub,
//     multiply,
//     divide,
//     interpolate,
//     add,
//     cond,
//     eq,
//     floor,
// } from 'react-native-reanimated';

import Ticket from '../components/Ticket';

import { useAuthStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;
const WIDTH_RAFFLE_MARGIN = WIDTH_RAFFLE + 10;

export default function Tickets() {
    const store = useAuthStore();
    const x = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler(
        {
            onScroll: (event) => {
                x.value = event.contentOffset.x;
            },
        },
    );

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>Tickets</Text>
            </View>
            <View >
                <Animated.ScrollView
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={WIDTH_RAFFLE_MARGIN}
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                    horizontal
                    onScroll={onScroll}
                >
                    {
                        store?.user?.tickets.map((ticket, index) => (
                            <Ticket
                                key={ticket.id}
                                index={index}
                                x={x}
                                card={ticket}
                            />
                        ))
                    }
                </Animated.ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: 250,
        marginTop: 30,
        marginBottom: 7,
        width: width - 30
    },
    header: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    title: {
        // fontFamily: 'MontserratSM',
        fontSize: 24,
        color: '#000'
    },
    more: {
        // fontFamily: 'MontserratM',
        fontSize: 14,
        paddingBottom: 3,
        color: '#000'
    },
});