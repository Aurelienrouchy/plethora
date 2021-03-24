import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, Dimensions, View, Animated} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { useTiming } from '../utils/hooks';
import { useTicketStore } from '../utils/store';
import Button from './Button';

const { width, height } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;
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
    const animation = useTiming(scrollXIndex)
    const style = {
        transform: [{
            scale: animation.interpolate({ inputRange, outputRange: [0.9, 1, 1.3]}),
        }, {
            translateX: animation.interpolate({ inputRange, outputRange: [70, 0, -WIDTH_RAFFLE]}),
        }],
        opacity: animation.interpolate({ inputRange, outputRange: [1 - 1 / 5, 1, 0]}),
    }

    const pctExp = (store.experiences - ticket.scratchableBeforeUnlock) / (nextExp - ticket.scratchableBeforeUnlock) * 100;
    const pct = pctExp > 100 ? 100 : pctExp < 0 ? 0 : pctExp;

    return (
        <Animated.View style={[{backgroundColor: ticket.progressColor, zIndex: 100 - index}, styles.main, style]} >
            <TouchableOpacity style={styles.touch} disabled={isLocked} onPress={ () => onClick() } >
                <SharedElement id={`item.${ticket.id}.image`}>
                    <Image style={styles.image} source={{uri: ticket.image}} />
                </SharedElement>
                <View style={styles.min_max_container}>
                    <Text style={styles.min_max}>{ticket?.minCoins} - {ticket?.maxCoins}</Text>
                    <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
                </View>
                {/* <View style={[{borderColor: ticket.progressColor}, styles.progress_bar]}>
                    <Animated.View style={[{backgroundColor: ticket.progressColor, width: `${pct}%`}, styles.progress]}></Animated.View>
                </View> */}
                <Button style={styles.button} onPress={() => onClick()} gradiantColors={['#fdad02', '#ffd301']} color="#ffcd01">
                    <Text style={styles.buttonText}>SCRATCH NOW</Text>
                </Button>
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
    min_max_container: {
        ...StyleSheet.absoluteFillObject,
        width: '50%',
        height: 40,
        borderRadius: 15,
        margin: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    min_max: {
        fontSize: 18,
        fontFamily: 'CocogooseRegular'
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
    button: {
        ...StyleSheet.absoluteFillObject,
        top: WIDTH_RAFFLE - 75,
        left: 25,
        width: WIDTH_RAFFLE - 50,
        height: 50,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'CocogooseRegular'
    },
    gradiant: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontFamily: 'CocogooseRegular'
    }
});