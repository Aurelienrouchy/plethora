import { useNavigation } from '@react-navigation/native';
import React, {
    useContext, useState, useEffect, useMemo,
} from 'react';
import {
    StyleSheet, TouchableOpacity, Dimensions, Image
} from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useTiming } from 'react-native-redash';
import { useTicketStore } from '../utils/store';
import AnimatedText from './AnimatedText';

const { width, height } = Dimensions.get('screen');

interface CroixScratchProps {
    isScratchable: boolean;
}

const CroixScratch = ({ isScratchable }: CroixScratchProps) => {
    const navigation = useNavigation();
    const animation = useTiming(isScratchable);
    const store = useTicketStore();
    const croixStyle = useAnimatedStyle(() => ({
        transform: [{ 
            translateY: interpolate(
                animation.value,
                [0 , 1],
                [0, 40]
            )
        }],
        opacity: interpolate(
            animation.value,
            [0 , 1],
            [1, 0]
        )
    }))
    const textStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animation.value,
            [0 , 1],
            [0, 1]
        ),
        transform: [{ 
            translateY: interpolate(
                animation.value,
                [0 , 1],
                [0, 40]
            )
        }],
    }))

    return (
        <Animated.View style={[styles.main]} >
            <Animated.Text style={[styles.text, textStyle]}>Scratch</Animated.Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Animated.View  style={[croixStyle, styles.croixContent]}>
                    <AnimatedText start={0} end={store?.coins} style={styles.counter} />
                    <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
                    <Image style={styles.croix} source={require('../../assets/icons/croix.png')} />
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CroixScratch;

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        width: 200,
        left: width - 50 - 180,
        top: 60,
        height: 50,
        zIndex: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        // flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 10,
        overflow: 'hidden',
    },
    croixContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5
    },
    croix: {
        width: 30,
        height: 30
    },
    text: {
        fontSize: 36,
        width: '100%',
        textAlign: 'center',
        // fontFamily: 'MontserratM'
    },
    counter: {
        fontSize: 24,
    },
    coinsIcon: {
        width: 40,
        height: 40,
        marginRight: 20
    },
});