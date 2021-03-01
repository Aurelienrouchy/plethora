import * as React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import Animated, { Easing, useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAuthStore } from '../utils/store';


interface AnimatedTextProps {
    start?: number
    end?: number
    digits?: number,
    duration?: number,
    style: any
};

function linear(t) {
    return t
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedText = React.memo(({
    start = 0,
    end = 1000,
    digits = 0,
    duration = 1000,
    style
}: AnimatedTextProps) => {
    const price = useSharedValue(start);
    const formattedPrice = useDerivedValue(() => (`${price.value.toFixed(digits)}`));
    const animatedProps = useAnimatedProps(() => {
        return {
            text: formattedPrice.value,
        };
    });

    useEffect(() => {
        price.value = withTiming(end, {
            duration,
            easing: Easing.in(Easing.ease),
        });
    }, [end])

    return (
        <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            value={formattedPrice.value}
            style={[styles.text, style]}
            {...{ animatedProps }}
        />
    );
});

export default AnimatedText;

const styles = StyleSheet.create({
    text: {
        height: 30,
    }
});