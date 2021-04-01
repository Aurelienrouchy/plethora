import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import LottieView from 'lottie-react-native';
import { useTiming } from '../utils/hooks';
interface LoadingButtonProps {
    style: any;
    loading: boolean;
    text: string;
}

const LoadingTextButton = ({ loading, text, style }: LoadingButtonProps) => {
    const animation = useTiming(loading);
    const lottie = useRef(null);
    const textStyle = {
        opacity: animation.interpolate({
            inputRange: [0 , 1],
            outputRange: [1, 0]
        }),
        transform: [{
            translateY: animation.interpolate({
                inputRange: [0 , 1],
                outputRange: [29, -30]
            })
        }]
    };
    const lottieStyle = {
        opacity: animation.interpolate({
            inputRange: [0 , 1],
            outputRange: [0 , 1],
        }),
        transform: [{
            translateY: animation.interpolate({
                inputRange: [0 , 1],
                outputRange: [0, -130 / 2 + style.fontSize - 6]
            }),
        }]
    };

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