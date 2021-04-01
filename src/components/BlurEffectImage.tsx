import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Animated, Image, ImageSourcePropType } from 'react-native';
import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';
import { useTiming } from '../utils/hooks';

const { width, height } = Dimensions.get('screen');

interface BlurEffectImageProps {
    src: any;
}

const BlurEffectImage = ({ src }: BlurEffectImageProps) => {
    const [val, setVal] = useState(0);
    const animation = useTiming(val, { duration: 1000 })
    const style = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setVal(val === 0 ? 1 : 0)
        }, 1000);

        return () => clearInterval(interval)
    }, []);
    
    return (
        <View style={styles.main}>
            <Animated.Image style={[style, styles.image]} source={src} />
        </View>
    );
}

export default BlurEffectImage;

const styles = StyleSheet.create({
    main: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '50%',
        height: '50%'
    },
    blur: {
        ...StyleSheet.absoluteFillObject
    }
});