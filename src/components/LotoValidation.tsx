import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import LotoGrid from '../components/LotoGrid';
import { selectXNumberInArray } from '../utils/math';
import LotoButtons from '../components/LotoButtons';
import LotoInfos from '../components/LotoInfos';
import LotoTicketsHistory from '../components/LotoTicketsHistory';
import { participateLoto } from '../utils/loto';
import { useLotosStore, useUserStore } from '../utils/store';
import LotoDisplayNumbers from '../components/LotoDisplayNumbers';
import { useTiming } from '../utils/hooks';

const { width, height } = Dimensions.get('screen');

const LotoValidation = () => {
    const store = useLotosStore();
    const isValid = store.showValidation;

    const animation = useTiming(isValid);
    const style = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1]}),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 100]})
        }]
    }

    return (
        <Animated.View style={[styles.main, style]}>

        </Animated.View>
    );
};

export default LotoValidation;

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        width: width - 60,
        height: 200,
        left: 30,
        top: height / 3 - 100,
        backgroundColor: 'red',
        zIndex: 1,
        borderRadius: 20
    }
});