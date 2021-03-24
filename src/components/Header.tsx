import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import Constants from 'expo-constants';
import HeaderInfos from './HerderInfos';

const { width, height } = Dimensions.get('screen');

const Header = () => {
    const dispatch = useDispatch();
    const toggle = () => dispatch(toggleDrawer);

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.menu} onPress={toggle}>
                <Image style={styles.menu_image} source={require('../../assets/icons/menu-dots.png')} />
            </TouchableOpacity>
            <HeaderInfos />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: Constants.statusBarHeight,
        height: 50,
        width: width - 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    menu_image: {
        width: '100%',
        height: '100%',
    },
});

export default Header;