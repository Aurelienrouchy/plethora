import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, Animated } from 'react-native';
import { useTiming } from '../utils/hooks';

import LoadingTextButton from './LoadingTextButton';
interface PlayButtonProps {
    style: StyleProp<ViewStyle>;
    loading: boolean;
    onPress: any;
    isScratchable: boolean
}

const PlayButton = ({ style, loading, onPress, isScratchable }: PlayButtonProps) => {
    const animation = useTiming(isScratchable);
    const mainStyle = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 50] })
        }]
    }

    return (
        <Animated.View style={[style, mainStyle]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <LoadingTextButton loading={loading} text="Play" style={styles.text} />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default PlayButton;

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 60,
        overflow: 'hidden',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    loader: {
        width: 60,
        height: 60
    },
    text: {
        fontSize: 36,
        // fontFamily: 'MontserratM'
    },
    lottie: {
        width: 130,
        height: 130,
        transform: [{
            translateX: -17
        }]
    }
});