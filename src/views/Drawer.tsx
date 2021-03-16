import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../provider/app/app.actions';
import { signOut } from '../provider/user/functions';
import { useUserStore } from '../utils/store';
import { drawerRoutesCfg } from './../utils/constants';

const { width, height } = Dimensions.get('screen');

interface DrawerProps {}

const Drawer = ({
    animation
}: any) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userStore = useUserStore()

    const navigate = (route: string) => {
        setTimeout(() => navigation.navigate(route), 300);
        animation.value = animation.value ? 0 : 1;
        dispatch(toggleDrawer);
    };
    
    return (
        <View style={styles.main}>
            <Image style={styles.photo} source={{uri: userStore?.photoUrl }} />
            <View style={styles.routes}>
                {
                    drawerRoutesCfg.map((route, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.route}
                            onPress={() => {
                                if (route.name === 'Logout') signOut();
                                else navigate(route.name);
                            }}
                        >
                            <Image style={styles.icon} source={{uri: route.icon}} />
                            <Text style={styles.route_name}>{route.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        // backgroundColor: 'blue',
        height: '100%',
        width: '100%',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    routes: {
        flex: 1,
        paddingTop: height / 10,
        paddingLeft: width / 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    route: {
        width: '100%',
        height: 40,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    route_name: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#262B4E',
    },
    infos: {
        height: 50,
        marginTop: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    infos_user: {
        height: 50,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    user_money: {
        fontSize: 16,
        color: '#4c527e',
    },
    user_name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#262B4E',
    },
    photo: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        ...StyleSheet.absoluteFillObject,
        left: width - 80,
        top: 70
    },
});

export default Drawer;