import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';
import { authentification, signWithFacebook, signWithGoogle } from '../utils/authentification';
import { useUserStore } from '../utils/store';
import { useTiming } from '../utils/hooks';
import BlurEffectImage from '../components/BlurEffectImage';

const { width, height } = Dimensions.get('screen');

 const SignIn = () => {
    const store = useUserStore();
    const lottie = useRef(null);
    const [value, setValue] = useState(0);
    const animation = useTiming(value);
    const style = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0]}),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -130]})
        }]
    }

    useLayoutEffect(() => {
        setValue(value ? 0 : 1)
    }, [store.loading])

    useEffect(() => {
        lottie.current.play();
    });

    return (
        <View style={styles.main}>
            <Animated.View style={[styles.loading, style]}>
                <LottieView
                    ref={lottie}
                    style={[styles.lottie]}
                    source={require('../../assets/icons/lottie_play.json')}
                />
            </Animated.View>
            <TouchableOpacity style={styles.button} onPress={() => authentification('facebook')}>
                <Text style={styles.text}>Connect with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => authentification('google')}>
                <Text style={styles.text}>Connect with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 100,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    button: {
        height: 60,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#DD7373',
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
    lottie: {
        width: 130,
        height: 130,
    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        top: height / 3 - 130,
        left: width / 2 - 50,
        borderRadius: 20
    }
});