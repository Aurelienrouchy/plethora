import React, { Children, memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableHighlight, Animated, ViewProps, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTiming } from '../utils/hooks';

const { width } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;

interface ButtonProps {
    style?: any;
    children: ReactElement<ViewProps>;
    color?: string;
    gradiantColors?: string[];
    onPress?: () => void;
}

const ButtonGradiant = ({ children, onPress, style, color, gradiantColors }: ButtonProps) => {
    const child = Children.only(children);
    const translateX = new Animated.Value(-WIDTH_RAFFLE);
    const animatedStyle = {
        transform: [{
            translateX
        }, {rotate: '45deg'}]
    };

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(translateX, {
                toValue: WIDTH_RAFFLE,
                duration: 1000,
                useNativeDriver: true
            }).start(() => translateX.setValue(-WIDTH_RAFFLE))
        }, 1000);

        return () => clearInterval(interval)
    }, [onPress])

    return (
        <TouchableHighlight underlayColor="#fff" style={[styles.main, style]} onPress={onPress} >
            <LinearGradient
                colors={gradiantColors}
                style={styles.gradiant}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
            <Animated.View style={[styles.mask, { backgroundColor: color }, animatedStyle]}/>
                { child }
            </LinearGradient>
        </TouchableHighlight>
    );
};

export default ButtonGradiant;

const styles = StyleSheet.create({
    main: {
        overflow: 'hidden',
        borderRadius: 20,
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
        alignItems: 'center',
        overflow: 'hidden',
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        top: '-170%',
        width: '50%',
        height: '400%',
    }
});