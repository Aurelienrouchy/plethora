import React from 'react';
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';

import { useAuthStore } from '../utils/store';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import Drawer from '../views/Drawer';
import Header from '../components/Header';

// const { cond, multiply, interpolate } = Animated;

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeRoutes = () => {
    return (
        <HomeStack.Navigator mode="modal">
            <HomeStack.Screen 
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
        </HomeStack.Navigator>
    );
}

const Router = () => {
    const store = useAuthStore();

    return (
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
    );
}

export default Router;