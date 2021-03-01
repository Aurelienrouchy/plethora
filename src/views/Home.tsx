import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import { useAppStore } from '../utils/store';
import Drawer from './Drawer';
import Header from '../components/Header';
import Raffles from '../components/Raffles';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import Tickets from '../components/Tickets';

const { width, height } = Dimensions.get('screen');
const {
    timing,
    parallel,
    Value,
    event
} = Animated;

interface HomeProps {}

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const store = useAppStore();

    const [translateX, setTranslateX] = useState(new Value(0));
    const [translateY, setTranslateY] = useState(new Value(0));
    const [scale, setScale] = useState(new Value(1));
    const [borderRadius, setBorderRadius] = useState(new Value(0));

    const handleStateChange = ({ nativeEvent }) => {
        if (store.drawerIsOpen) {
            if (nativeEvent.state === State.END && nativeEvent.translationX < -(width / 3)) {
                dispatch(toggleDrawer);
            }
        }
    };

    useEffect(() => {
        parallel([
            timing(translateX, {
                toValue: store.drawerIsOpen ? width - width / 2.5 : 0,
                duration: 300,
                useNativeDriver: true
            }),
            timing(translateY, {
                toValue: store.drawerIsOpen ? 30 : 0,
                duration: 300,
                useNativeDriver: true
            }),
            timing(scale, {
                toValue: store.drawerIsOpen ? 0.7 : 1,
                duration: 300,
                useNativeDriver: true
            }),
            timing(borderRadius, {
                toValue: store.drawerIsOpen ? 40 : 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => {
        })
        
    }, [store.drawerIsOpen])

    return (
        <PanGestureHandler 
            onHandlerStateChange={handleStateChange}
        >
            <Animated.View style={styles.main}>
                <Drawer />
                <Animated.View style={[styles.home, {borderRadius, transform: [{translateX}, {translateY}, {scale}]}]}>
                    <Header />
                    {
                        store.drawerIsOpen ? (
                            <TouchableOpacity style={styles.cache} onPress={() => dispatch(toggleDrawer)}></TouchableOpacity>
                        )  : null
                    }
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.main}>
                            <Tickets />
                            <Raffles />
                        </View>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
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