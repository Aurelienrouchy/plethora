import { useNavigation } from '@react-navigation/native';
import React, {
    useContext, useState, useEffect, useMemo,
} from 'react';
import {
    StyleSheet, TouchableOpacity, Dimensions, Image
} from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useTiming } from 'react-native-redash';

const { width, height } = Dimensions.get('screen');

interface CroixScratchProps {
    isScratchable: boolean;
}

const CroixScratch = ({ isScratchable }: CroixScratchProps) => {
    const navigation = useNavigation();
    const animation = useTiming(isScratchable)
    const mainStyle = useAnimatedStyle(() => ({
        width: interpolate(
            animation.value,
            [0 , 1],
            [50, 200]
        ),
        transform: [{ 
            translateX: interpolate(
                animation.value,
                [0 , 1],
                [0, -150]
            )
        }],
    }))
    const croixStyle = useAnimatedStyle(() => ({
        transform: [{ 
            translateX: interpolate(
                animation.value,
                [0 , 1],
                [-10, 100]
            )
        }],
        opacity: interpolate(
            animation.value,
            [0 , 1],
            [1, 0]
        )
    }))
    const textStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animation.value,
            [0 , 1],
            [0, 1]
        )
    }))

    return (
        <Animated.View style={[styles.main, mainStyle]} >
            <Animated.Text style={[styles.text, textStyle]}>Scratch</Animated.Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Animated.View  style={[croixStyle]}>
                    <Image style={styles.croix} source={require('../../assets/icons/croix.png')} />
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CroixScratch;

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        left: width - 50 - 30,
        top: 60,
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    croix: {
        width: 30,
        height: 30
    },
    text: {
        fontSize: 36,
        // fontFamily: 'MontserratM'
    },
});