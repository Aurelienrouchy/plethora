import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import { useAppStore } from '../utils/store';
import Drawer from './Drawer';
import Header from '../components/Header';
import Lotos from '../components/Lotos';
import Tickets from '../components/Tickets';
import { useTiming } from '../utils/hooks';
import { gql, useSubscription } from '@apollo/client';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('screen');

const LOTO_DRAW = gql`
	subscription {
		lotoDraw {
			classic
			complementary
		}
	}
`;

const Home = () => {
    const { data, loading, error} = useSubscription(LOTO_DRAW);

	useEffect(() => {
		console.log('datadatadata', data)
	}, [data]);

	useEffect(() => {
		console.log('errorerrorerror', error)
	}, [error])

    
    const dispatch = useDispatch();
    const store = useAppStore();
    const animation = useTiming(store.drawerIsOpen);
    const style = {
        transform: [{
            scale: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7]})
        }, {
            translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [0, width - width / 2.5]})
        }, {
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 30]}) 
        }],
        borderRadius: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 40]})
    }

    return (
        <View style={styles.main}>
            <Drawer />
            <Animated.View style={[styles.home, style ]}>
                <Header />
                {
                    store.drawerIsOpen ? (
                        <TouchableOpacity style={styles.cache} onPress={() => dispatch(toggleDrawer)}></TouchableOpacity>
                    )  : null
                }
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Tickets />
                    <Lotos />
                </ScrollView>
            </Animated.View>
        </View>
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
        paddingLeft: 30,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 0
        },
        shadowOpacity: 0.50,
        shadowRadius: 15,
        elevation: 19,
    },
});

export default Home;