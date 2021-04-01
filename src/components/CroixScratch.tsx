import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import { useTiming } from '../utils/hooks';
import { useUserStore } from '../utils/store';
import AnimatedText from './AnimatedText';

const { width, height } = Dimensions.get('screen');
interface CroixScratchProps {
    isScratchable: boolean;
}

const CroixScratch = ({ isScratchable }: CroixScratchProps) => {
    const navigation = useNavigation();
    const store = useUserStore();

    const animation = useTiming(isScratchable)
    const croixStyle = {
        transform: [{ 
            translateY: animation.interpolate({
                inputRange: [0 , 1],
                outputRange: [0, 40]
            })
        }],
        opacity: animation.interpolate({
            inputRange: [0 , 1],
            outputRange: [1, 0]
        })
    }

    const textStyle = {
        opacity: animation.interpolate({
            inputRange: [0 , 1],
            outputRange: [0, 1]
        }),
        transform: [{ 
            translateY: animation.interpolate({
                inputRange: [0 , 1],
                outputRange: [0, 37]
            })
        }],
    }

    return (
        <Animated.View style={[styles.main]} >
            <Animated.Text style={[styles.text, textStyle]}>Scratch</Animated.Text>
            <TouchableOpacity disabled={isScratchable} onPress={() => navigation.goBack()}>
                <Animated.View  style={[croixStyle, styles.croixContent]}>
                    <AnimatedText start={store.coins} end={store.coins} style={styles.counter} />
                    <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
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
        width: 200,
        left: width - 50 - 180,
        top: 60,
        height: 50,
        zIndex: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 20,
        overflow: 'hidden',
    },
    croixContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5
    },
    croix: {
        width: 30,
        height: 30
    },
    text: {
        fontSize: 26,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'CocogooseRegular'
    },
    counter: {
        fontSize: 24,
        fontFamily: 'CocogooseRegular'
    },
    coinsIcon: {
        width: 40,
        height: 40,
        marginRight: 20
    },
});