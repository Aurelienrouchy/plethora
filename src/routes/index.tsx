import React, { useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Application from 'expo-application';

import { useUserStore } from '../utils/store';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import Play from '../views/Play';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LotoGridView from '../views/LotoGridView';
import { useReward } from '../utils/ads';
import { AdMobRewarded } from 'expo-ads-admob';
import History from '../views/History';
import Toast from 'react-native-toast-message';

enableScreens();
  
const Stack = createStackNavigator();
const HomeStackShared = createSharedElementStackNavigator();

const HomeRoutes = () => {
    return (
        <HomeStackShared.Navigator initialRouteName="Home" headerMode="none" mode="modal">
            <HomeStackShared.Screen name="Home" component={Home} />
            <HomeStackShared.Screen name="History" component={History} />
            <HomeStackShared.Screen
                name="Play"
                component={Play}
                sharedElementsConfig={(route, otherRoute, showing) => {
                    const { ticket } = route.params;
                    return [`item.${ticket.id}.image`];
                }}
                options={{
                    gestureEnabled: false,
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return {
                            cardStyle: {
                                opacity: progress
                            }
                        }
                    }
                }}
            />
            <HomeStackShared.Screen
                name="LotoGridView"
                component={LotoGridView}
                sharedElementsConfig={(route, otherRoute, showing) => {
                    const { loto } = route.params;
                    return [`loto.${loto.id}.image`];
                }}
                options={{
                    gestureEnabled: false,
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return {
                            cardStyle: {
                                opacity: progress
                            }
                        }
                    }
                }}
            />
        </HomeStackShared.Navigator>
    );
}

const Router = () => {
    const store = useUserStore();

    const { addRewardListeners, requestAd } = useReward();

    useLayoutEffect(() => {
        addRewardListeners();
        
        requestAd()
        return AdMobRewarded.removeAllListeners;
    }, []);

    return (
        <View style={{flex: 1}}>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <NavigationContainer>
                <Stack.Navigator headerMode="none" >
                { store.isLogin ? (
                    <>
                        <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
                        <Stack.Screen name="History" component={History} />
                    </>
                ) : (
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{
                            animationTypeForReplace: store.isLogin ? 'pop' : 'push',
                        }}
                    />
                )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default Router;