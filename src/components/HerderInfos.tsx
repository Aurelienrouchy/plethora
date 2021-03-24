import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import { useTicketStore, useUserStore } from '../utils/store';
import AnimatedText from './AnimatedText';

const { width, height } = Dimensions.get('screen');

const HeaderInfos = () => {
    const dispatch = useDispatch();
    const store = useTicketStore();
    const userStore = useUserStore();

    const toggle = () => dispatch(toggleDrawer);

    return (
        <View style={styles.main}>
            <AnimatedText start={0} end={store?.coins} style={styles.counter} />
            <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
            <AnimatedText start={0} end={store?.trees} style={styles.counter} />
            <Image style={styles.treesIcon} source={require('../../assets/icons/tree.png')} />
            <Image style={styles.profil} source={{ uri: 'https://cdn.dribbble.com/users/674925/screenshots/14206502/media/2977da0f08e2f2890c6330cf8e8bd619.png' }} />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        borderRadius: 18,
        height: 40,
        paddingLeft: 10
    },
    coinsIcon: {
        width: 30,
        height: 30
    },
    treesIcon: {
        width: 25,
        height: 25
    },
    counter: {
        fontSize: 18,
        fontFamily: 'CocogooseRegular',
        marginLeft: 10,
        marginRight: 5,
    },
    profil: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginLeft: 10
    }
});

export default HeaderInfos;