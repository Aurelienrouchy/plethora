import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { useTiming } from 'react-native-redash';
import { useErrorStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');

const ChooseNumbersLoto = () => {
    const store = useErrorStore()
    const animation = useTiming(store.isDisplay);
    const style = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(
                animation.value,
                [0, 1],
                [-100, 0]
            )
        }],
        opacity: interpolate(
            animation.value,
            [0, 1],
            [0, 1]
        ),
    }))

    return (
        <Animated.View style={[style, styles.main]}>
            <Text style={styles.text}>{store.text}</Text>
        </Animated.View>
        
    );
};

export default ChooseNumbersLoto;

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        width: width - 20,
        height: 100,
        top: 50,
        left: 10,
        backgroundColor: '#ffa69b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        zIndex: 300
    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    }
});