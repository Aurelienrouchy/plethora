import React from 'react';
import { StyleSheet, Text, Dimensions, Animated } from 'react-native';
import { useTiming } from '../utils/hooks';
import { useErrorStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');

const ChooseNumbersLoto = () => {
    const store = useErrorStore()
    const animation = useTiming(store.isDisplay);
    const style = {
        transform: [{
            translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0]
            })
        }],
        opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })
    }

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