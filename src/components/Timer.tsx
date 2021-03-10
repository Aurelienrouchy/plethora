import { useNavigation } from '@react-navigation/native';
import React, {
    useContext, useState, useEffect
} from 'react';
import { StyleSheet, Dimensions, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import { secondToday, timerToNext } from '../utils/date';

const { width, height } = Dimensions.get('screen');

interface Timer {
    step: number
}

interface SMH {
    s: number;
    m: number;
    h: number;
}

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Timer({ step }: Timer) {
    const [value, setValue] = useState<SMH>({s: 0, m: 0, h: 0});

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(timerToNext(step))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            value={`${value.h}:${value.m}:${value.s}`}
            style={[styles.text]}
        />
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
    },
});