import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, Animated } from 'react-native';
import { useTiming } from '../utils/hooks';
import ButtonGradiant from './ButtonGradiant';

import LoadingTextButton from './LoadingTextButton';
interface PlayButtonProps {
    style: StyleProp<ViewStyle>;
    loading: boolean;
    onPress: any;
    isScratchable: boolean
}

const ButtonPlay = ({ style, loading, onPress, isScratchable }: PlayButtonProps) => {
    const animation = useTiming(isScratchable);
    const mainStyle = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 50] })
        }]
    }

    return (
        <Animated.View style={[style, mainStyle]}>
            <ButtonGradiant style={styles.button} onPress={onPress} gradiantColors={['#fdad02', '#ffd301']} color="#ffcd01">
                <LoadingTextButton loading={loading} text="Play" style={styles.text} />
            </ButtonGradiant>
        </Animated.View>
    );
};

export default ButtonPlay;

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 60,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
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
        fontSize: 22,
        fontFamily: 'CocogooseRegular'
    },
    lottie: {
        width: 130,
        height: 130,
        transform: [{
            translateX: -17
        }]
    }
});