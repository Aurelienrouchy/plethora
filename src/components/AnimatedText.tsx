import * as React from 'react';
import { StyleSheet, TextInput, Animated, Text } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
interface AnimatedTextProps {
    start?: number
    end?: number
    digits?: number,
    duration?: number,
    style: any
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedText = React.memo(({
    start = 0,
    end = 1000,
    digits = 0,
    duration = 1000,
    style
}: AnimatedTextProps) => {
    const count = useRef(new Animated.Value(start)).current;
    const [val, setVal] = useState<string>(`${start}`);

    useEffect(() => {
        count.addListener(({value}) => setVal(value.toFixed(digits)));
        Animated.timing(
            count,
            {
                toValue: end,
                duration,
                useNativeDriver: true
            }
        ).start(() => {
            count.setValue(end);
        });
    }, [end]);

    return (
        <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            value={String(val)}
            style={[styles.text, style]}
        />
    );
});

export default AnimatedText;

const styles = StyleSheet.create({
    text: {
        height: 30,
    }
});