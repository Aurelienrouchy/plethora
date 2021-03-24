import React, { Children, memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, ViewProps, Dimensions} from 'react-native';
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

const Button = ({ children, onPress, style, color, gradiantColors }: ButtonProps) => {
    const child = Children.only(children);
    const {
        animatedStyle 
    } = useMemo(() => {
        const translateX = new Animated.Value(-WIDTH_RAFFLE);

        for(let i = 0; i < 3; i++) {
            setTimeout(() => {
                    Animated.timing(translateX, {
                        toValue: WIDTH_RAFFLE,
                        duration: 1000,
                        useNativeDriver: true
                    }).start(() => translateX.setValue(-WIDTH_RAFFLE))
            }, i * 1000)
        }
        const animatedStyle = {
            transform: [{
                translateX
            }, {rotate: '45deg'}]
        }
        return {
            animatedStyle
        }
    }, []);

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <LinearGradient
                colors={gradiantColors}
                style={styles.gradiant}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
            >
            <Animated.View style={[styles.mask, { backgroundColor: color }, animatedStyle]}/>
                { child }
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default memo(Button);

const styles = StyleSheet.create({
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
    mask: {
        ...StyleSheet.absoluteFillObject,
        top: '-170%',
        width: '50%',
        height: '400%',
    }
});