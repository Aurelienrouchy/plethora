import { useNavigation } from '@react-navigation/native';
import React, { useContext, useMemo, useEffect } from 'react';
import {
    StyleSheet, Image, TouchableOpacity, Text, Dimensions, View,
} from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
// import {
//     SharedElement
// } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;
const WIDTH_RAFFLE_MARGIN = WIDTH_RAFFLE + 10;

interface TicketProps {
    card: {
        level: number;
        minCoins: number;
        maxCoins: number;
        locked: boolean
        scratchBeforeUnlock: number;
        image: string
    }
    x: Animated.SharedValue<number>;
    index: number;
}

const Ticket = ({
    card,
    index,
    x
}: TicketProps) => {
    const navigation = useNavigation();
    const onClick = () => navigation.navigate('Play', { card });

    const style = useAnimatedStyle(() => ({
        transform: [{
            scale: interpolate(
                x.value,
                [(index - 1) * WIDTH_RAFFLE_MARGIN, index * WIDTH_RAFFLE_MARGIN],
                [0.8, 1],
                Extrapolate.CLAMP
            )
        }, {
            translateX: interpolate(
                x.value,
                [(index - 1) * WIDTH_RAFFLE_MARGIN, index * WIDTH_RAFFLE_MARGIN],
                [-10, 0],
                Extrapolate.CLAMP
            )
        }]
    }))

    return (
        <Animated.View style={[styles.main, style]} >
            <TouchableOpacity style={styles.touch} onPress={ () => onClick() } >
                {/* <SharedElement id={`item.${card.id}.photo`}> */}
                    <Image style={styles.image} source={{uri: card.image}} />
                {/* </SharedElement> */}
                <View style={styles.infos_container}>
                    <View style={styles.min_max_container}>
                        <Text style={styles.min_max}>{card?.minCoins} - {card?.maxCoins}</Text>
                        <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
                    </View>
                    <View style={styles.progress_bar}>
                        <Animated.View style={styles.progress}></Animated.View>
                    </View>
                </View>
                <Text style={styles.level}>{card?.level}</Text>
                {
                    card.locked ? (
                        <View style={styles.locked}>
                            <Text style={styles.locked_text}>locked</Text>
                        </View>
                    ) : null
                }
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Ticket;

const styles = StyleSheet.create({
    main: {
        width: WIDTH_RAFFLE,
        height: WIDTH_RAFFLE,
        marginRight: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    touch: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
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
        opacity: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locked_text: {
        fontSize: 50,
        color: '#fff',
    }
});