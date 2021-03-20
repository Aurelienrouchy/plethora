import React, { useEffect, useLayoutEffect } from 'react';
import { Animated, View } from 'react-native';
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';

import { useUserStore } from '../utils/store';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import Drawer from '../views/Drawer';
import Header from '../components/Header';
import Play from '../views/Play';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ChooseNumbersLoto from '../views/LotoGridView';
import ErrorDisplay from '../components/ErrorDisplay';
import { removeRewardListener, setupAds } from '../utils/ads';
import { AdMobRewarded } from 'expo-ads-admob';
import { setAdsLoading } from '../provider/tickets/tickets.action';

enableScreens();
  
const Stack = createStackNavigator();
const HomeStackShared = createSharedElementStackNavigator();

const HomeRoutes = () => {
    return (
        <HomeStackShared.Navigator initialRouteName="Home" headerMode="none" mode="modal">
            <HomeStackShared.Screen name="Home" component={Home} />
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
                name="ChooseNumbersLoto"
                component={ChooseNumbersLoto}
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

    return (
        <View style={{flex: 1}}>
            <ErrorDisplay />
            <NavigationContainer>
                <Stack.Navigator headerMode="none" >
                { store.isLogin ? (
                    <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
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