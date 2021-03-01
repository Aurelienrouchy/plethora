import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Easing, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import { addCoins } from '../provider/auth/auth.actions';
import { useAuthStore } from '../utils/store';
import AnimatedText from './AnimatedText';

const { width, height } = Dimensions.get('screen');

const Header = () => {
    const dispatch = useDispatch();
    const store = useAuthStore();

    const toggle = () => dispatch(toggleDrawer);

    return (
        <View style={{ ...styles.main }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menu} onPress={toggle}>
                    <Image style={styles.menu_image} source={require('../../assets/icons/menu-dots.png')} />
                </TouchableOpacity>
                <View style={styles.counters}>
                    <AnimatedText start={0} end={store?.user?.coins} style={styles.counter} />
                    <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
                    <AnimatedText start={0} end={store?.user?.trees} style={styles.counter} />
                    <Image style={styles.treesIcon} source={require('../../assets/icons/tree.png')} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        paddingTop: height / 20,
        paddingRight: 30
    },
    menu: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    menu_image: {
        width: '40%',
        height: '40%',
    },
    header: {
        flexDirection: 'row',
    },
    counters: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    coinsIcon: {
        width: 40,
        height: 40
    },
    treesIcon: {
        width: 30,
        height: 30
    },
    counter: {
        fontSize: 24,
        // fontFamily: 'MontserratM',
        marginLeft: 10
    }
});

export default Header;