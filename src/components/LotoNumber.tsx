import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { animated } from 'react-spring/renderprops-universal';

const { width, height } = Dimensions.get('screen');

interface LotoNumberProps {
    isSelected: boolean ;
    number: number;
    onPress: any
}

const LotoNumber = ({ isSelected, number, onPress }: LotoNumberProps) => {
    const animation = useSharedValue(isSelected);
    const style = useAnimatedStyle(() => ({
        opacity: withTiming(animation.value ? 1 : 0.3),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: withTiming(animation.value ? 2 : 0),
        },
        shadowOpacity: withTiming(animation.value ? 0.34 : 0),
        shadowRadius: withTiming(animation.value ? 6.27 : 0),
        elevation: withTiming(animation.value ? 2 : 0),
    }))

    return (
        <View style={styles.main}>
            <TouchableWithoutFeedback onPress={() => onPress(number - 1)}>
                <View style={styles.boule}>
                    <Animated.Text style={[styles.text]}>{number}</Animated.Text>
                    <Animated.View style={[styles.mask, style]}>
                        <Animated.Text style={[styles.text]}>{number}</Animated.Text>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: (width - 60) / 6,
        height: (width - 60) / 6,
        padding: 4,
    },
    boule: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f6aa1f',
        borderRadius: 100,
        zIndex: -1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LotoNumber