import { useNavigation } from '@react-navigation/native';
import React, { useContext, useMemo, useEffect } from 'react';
import {
    StyleSheet, Image, TouchableOpacity, Text, Dimensions, View,
} from 'react-native';
import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useTicketStore } from '../utils/store';

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
        scratchableBeforeUnlock: number;
        image: string;
        progressColor: string;
    }
    index: number;
    scrollXIndex: any;
    nextExp: number;
}

const Ticket = ({ ticket, index, scrollXIndex, nextExp}: TicketProps) => {
    const navigation = useNavigation();
    const store = useTicketStore();
    
    const onClick = () => navigation.navigate('Play', { ticket });
    const inputRange = [index - 1, index, index + 1];
    const isLocked = ticket.scratchableBeforeUnlock > store.experiences;
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
                [70, 0, -WIDTH_RAFFLE],
            )),
        }],
        opacity: withTiming(interpolate(
                scrollXIndex.value,
                inputRange,
                [1 - 1 / 5, 1, 1],
        )),
    }))

    const pctExp = (store.experiences - ticket.scratchableBeforeUnlock) / (nextExp - ticket.scratchableBeforeUnlock) * 100;
    
    const pct = pctExp > 100 ? 100 : pctExp < 0 ? 0 : pctExp;


    return (
        <Animated.View style={[{backgroundColor: ticket.progressColor}, styles.main, style]} >
            <TouchableOpacity style={styles.touch} onPress={ () => onClick() } >
                <SharedElement id={`item.${ticket.id}.image`}>
                    <Image style={styles.image} source={{uri: ticket.image}} />
                </SharedElement>
                <View style={styles.infos_container}>
                    <View style={styles.min_max_container}>
                        <Text style={styles.min_max}>{ticket?.minCoins} - {ticket?.maxCoins}</Text>
                        <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
                    </View>
                    <View style={[{borderColor: ticket.progressColor}, styles.progress_bar]}>
                        <Animated.View style={[{backgroundColor: ticket.progressColor, width: `${pct}%`}, styles.progress]}></Animated.View>
                    </View>
                </View>
                <Text style={styles.level}>{ticket?.level}</Text>
                {
                    isLocked ? (
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
        zIndex: 1,
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
        overflow: 'hidden',
    },
    progress: {
        height: 15,
        borderRadius: 5,
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