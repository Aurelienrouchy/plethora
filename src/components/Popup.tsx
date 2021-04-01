import React, { useState, useEffect, useRef, Children } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useTiming } from '../utils/hooks';

const { width, height } = Dimensions.get('screen');

interface PopupProps {
    style: any;
    isOpen: boolean;
    children: any;
}

const Popup = ({ style, isOpen, children }: PopupProps) => {
    const child = Children.only(children);
    const animation = useTiming(isOpen);
    const animatedStyles = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-height, 0] })
        }]
    }

    return (
        <Animated.View style={[styles.main, style, animatedStyles]}>
            { child }
        </Animated.View>
    );
};

export default Popup;

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
    },
});