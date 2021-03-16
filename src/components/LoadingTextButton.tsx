import React, {
    useContext, useState, useEffect, useMemo, useRef,
} from 'react';
import {
    StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { useTiming } from 'react-native-redash';

import LottieView from 'lottie-react-native';
interface LoadingButtonProps {
    style: any;
    loading: boolean;
    text: string;
}

const LoadingTextButton = ({ loading, text, style }: LoadingButtonProps) => {
    const animation = useTiming(loading);
    const lottie = useRef(null);
    const textStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animation.value,
            [0, 1],
            [1, 0]
        ),
        transform: [{
            translateY: interpolate(
                animation.value,
                [0, 1],
                [27, -30]
            ),
        }]
    }))
    const lottieStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animation.value,
            [0, 1],
            [0, 1]
        ),
        transform: [{
            translateY: interpolate(
                animation.value,
                [0, 1],
                [0, -130 / 2 + (style.fontSize || 18)]
            ),
        }]
    }))

    useEffect(() => {
        lottie.current.play()
    })

    return (
        <View style={[styles.main]}>
            <Animated.Text style={[style, textStyle]}>{ text }</Animated.Text>
            <Animated.View style={[styles.loader, lottieStyle]}>
                <LottieView
                    ref={lottie}
                    style={[styles.lottie]}
                    source={require('../../assets/icons/lottie_play.json')}
                />
            </Animated.View>
        </View>
    );
};

export default LoadingTextButton;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        fontSize: 18
    },
    loader: {
        width: 60,
        height: 60
    },
    lottie: {
        width: 130,
        height: 130,
        transform: [{
            translateX: -17
        }]
    }
});