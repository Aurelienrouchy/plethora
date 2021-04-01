import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Animated } from 'react-native';
import { useTiming } from '../utils/hooks';

const { width, height } = Dimensions.get('screen');

interface LotoNumberProps {
    isSelected: boolean ;
    number: number;
    onPress: any
}

const LotoNumber = ({ isSelected, number, onPress }: LotoNumberProps) => {
    const animation = useTiming(isSelected, { duration: 200 });
    const style = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1]}),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 2]}),
        },
        shadowOpacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 0.34]}),
        shadowRadius: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 6.27]}),
        elevation: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 2]}),
    }

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
        width: (width - 60) / 8,
        height: (width - 60) / 8,
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
        fontSize: 18,
        fontFamily: 'CocogooseSemilight',
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