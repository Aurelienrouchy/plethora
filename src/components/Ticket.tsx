import { useNavigation } from '@react-navigation/native';
import React, { useContext, useMemo, useEffect } from 'react';
import {
    StyleSheet, Image, TouchableOpacity, Text, Dimensions, View,
} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
// import {
//     SharedElement
// } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;
const WIDTH_RAFFLE_MARGIN = WIDTH_RAFFLE + 10;

interface TicketProps {
    ticket: {
        id: number;
        level: number;
        minCoins: number;
        maxCoins: number;
        locked: boolean
        scratchBeforeUnlock: number;
        image: string
    }
    index: number;
    scrollXIndex: any;
}

const Ticket = ({
    ticket,
    index,
    scrollXIndex
}: TicketProps) => {
    const navigation = useNavigation();
    const onClick = () => navigation.navigate('Play', { ticket });
    const inputRange = [index - 1, index, index + 1];
    const style = useAnimatedStyle(() => ({
        transform: [{
            scale: withTiming(interpolate(
                scrollXIndex.value,
                inputRange,
                [0.9, 1, 1.3],
            )),
        }, {
            translateX: withTiming(interpolate(
                scrollXIndex.value,
                inputRange,
                [70, 0, -100],
            )),
        }],
        opacity: withTiming(interpolate(
                scrollXIndex.value,
                inputRange,
                [1 - 1 / 5, 1, 0],
        )),
    }))


    return (
        <Animated.View style={[styles.main, style]} >
            <TouchableOpacity style={styles.touch} disabled={ticket.locked} onPress={ () => onClick() } >
                <SharedElement id={`item.${ticket.id}.image`}>
                    <Image style={styles.image} source={{uri: ticket.image}} />
                </SharedElement>
                <View style={styles.infos_container}>
                    <View style={styles.min_max_container}>
                        <Text style={styles.min_max}>{ticket?.minCoins} - {ticket?.maxCoins}</Text>
                        <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
                    </View>
                    <View style={styles.progress_bar}>
                        <Animated.View style={styles.progress}></Animated.View>
                    </View>
                </View>
                <Text style={styles.level}>{ticket?.level}</Text>
                {
                    ticket.locked ? (
                        <View style={styles.locked}>
                            <Text style={styles.locked_text}>locked</Text>
                        </View>
                    ) : null
                }
            </TouchableOpacity>
        </Animated.View>
    );
};

Ticket.sharedElements = (route, otherRoute, showing) => {
    const { ticket } = route.params;
    return [`item.${ticket.id}.photo`];;
}

export default Ticket;

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        width: WIDTH_RAFFLE,
        height: WIDTH_RAFFLE,
        borderRadius: 20,
        overflow: 'hidden',
    },
    touch: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: WIDTH_RAFFLE,
        height: WIDTH_RAFFLE,
        borderRadius: 20,
    },
    coinsIcon: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    infos_container: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 7,
        width: WIDTH_RAFFLE - 8,
        height: 70,
        ...StyleSheet.absoluteFillObject,
        left: 4,
        top: WIDTH_RAFFLE - 70 - 4,
        borderRadius: 16,
    },
    min_max_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    min_max: {
        fontSize: 22
    },
    progress_bar: {
        width: '100%',
        height: 15,
        borderRadius: 5,
        borderWidth: 1,
    },
    progress: {
        height: 15,
        // backgroundColor: 'red'
    },
    level: {
        ...StyleSheet.absoluteFillObject,
        fontSize: 60,
        color: '#fff',
        textAlign: 'right',
        paddingRight: 15,
    },
    locked: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locked_text: {
        fontSize: 50,
        color: '#fff',
    }
});