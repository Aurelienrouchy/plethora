import React, {
    useContext, useState, useEffect, useMemo, useRef,
} from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Button, ViewStyle, StyleProp
} from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useTiming } from 'react-native-redash';

import LottieView from 'lottie-react-native';

interface PlayButtonProps {
    style: StyleProp<ViewStyle>;
    loading: boolean;
    onPress: any;
    isScratchable: boolean
}

const PlayButton = ({ style, loading, onPress, isScratchable }: PlayButtonProps) => {
    const animation = useTiming(isScratchable);
    const isLoading = useTiming(loading);
    const lottie = useRef(null);
    const mainStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animation.value,
            [0, 1],
            [1, 0]
        ),
        transform: [{
            translateY: interpolate(
                animation.value,
                [0, 1],
                [0, 50]
            ),
        }]
    }))
    const textStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            isLoading.value,
            [0, 1],
            [1, 0]
        ),
        transform: [{
            translateY: interpolate(
                isLoading.value,
                [0, 1],
                [27, -30]
            ),
        }]
    }))
    const lottieStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            isLoading.value,
            [0, 1],
            [0, 1]
        ),
        transform: [{
            translateY: interpolate(
                isLoading.value,
                [0, 1],
                [0, -55]
            ),
        }]
    }))

    useEffect(() => {
        lottie.current.play()
    })

    return (
        <Animated.View style={[style, mainStyle]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Animated.Text style={[styles.text, textStyle]}>Play</Animated.Text>
                <Animated.View style={[styles.loader, lottieStyle]}>
                    <LottieView
                        ref={lottie}
                        style={[styles.lottie]}
                        source={require('../../assets/icons/lottie_play.json')}
                    />
                </Animated.View>
                
            </TouchableOpacity>
        </Animated.View>
    );
};

export default PlayButton;

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 60,
        overflow: 'hidden',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    loader: {
        width: 60,
        height: 60
    },
    text: {
        fontSize: 36,
        // fontFamily: 'MontserratM'
    },
    lottie: {
        width: 130,
        height: 130,
        transform: [{
            translateX: -17
        }]
    }
});