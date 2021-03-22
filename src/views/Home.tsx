import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import { useAppStore, useTicketStore } from '../utils/store';
import Drawer from './Drawer';
import Header from '../components/Header';
import Lotos from '../components/Lotos';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Tickets from '../components/Tickets';
import { useTiming } from 'react-native-redash';

const { width, height } = Dimensions.get('screen');

const Home = () => {
    const dispatch = useDispatch();
    const store = useAppStore();
    const isOpen = useTiming(store.drawerIsOpen);
    const style = useAnimatedStyle(() => ({
        transform: [{
            scale: interpolate(
                isOpen.value,
                [0, 1],
                [1, 0.7]
            ),
        }, {
            translateX: interpolate(
                isOpen.value,
                [0, 1],
                [0, width - width / 2.5]
            ),
        }, {
            translateY: interpolate(
                isOpen.value,
                [0, 1],
                [0, 30]
            )
        }],
        borderRadius: interpolate(
            isOpen.value,
            [0, 1],
            [0, 40]
        )
    }))

    return (
        <Animated.View style={styles.main}>
            <Drawer />
            <Animated.View style={[styles.home, style ]}>
                <Header />
                {
                    store.drawerIsOpen ? (
                        <TouchableOpacity style={styles.cache} onPress={() => dispatch(toggleDrawer)}></TouchableOpacity>
                    )  : null
                }
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.main}>
                        <Tickets />
                        <Lotos />
                    </View>
                </ScrollView>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    cache: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        zIndex: 30,
        top: 100
    },
    home: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
        paddingLeft: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 0
        },
        shadowOpacity: 0.50,
        shadowRadius: 15,
        elevation: 19,
    },
    main_cards: {
        height: 300,
        marginVertical: 40,
    },
    main_card: {
        height: '100%',
        width: 250,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginRight: 20,
    },
    secondary_cards: {
        flex: 1,
        paddingBottom: 30,
    },
    button: {
        paddingVertical: 20,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'right',
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
    header_title: {
        flex: 1,
        alignItems: 'flex-end',
        paddingTop: 15,
    },
});

export default Home;