import React, { useState, useEffect, Children } from 'react';
import { StyleSheet, Animated, TouchableHighlight, ViewProps, StyleProp } from 'react-native';
import { useTiming } from '../utils/hooks';

interface ButtonScaleProps {
    children: any;
    onPress: any;
    style?: any;
    disabled?: boolean; 
}

const ButtonScale = ({ children, onPress, style , disabled}: ButtonScaleProps) => {
    const child = Children.only(children);
    const [isPressed, setIsPressed] = useState(0)
    const animation = useTiming(isPressed, { duration: 200 });
    const scale = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.95]})

    return (
        <Animated.View style={[styles.main, style, {transform: [{ scale }]}]}>
            <TouchableHighlight
                disabled={disabled}
                onPress={onPress}
                onPressIn={() => setIsPressed(1)}
                onPressOut={() => setIsPressed(0)}
                style={style}
                >
                    { child }
            </TouchableHighlight>
        </Animated.View>
        
    );
};

export default ButtonScale;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 20
    },
});