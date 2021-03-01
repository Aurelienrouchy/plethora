import React, { useEffect, useState, useContext } from 'react';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
// import { useApolloClient } from '@apollo/react-hooks';
// import { useNavigation } from 'react-navigation-hooks'

// import { AUTH, GET_USER_WITH_TOKEN } from '../graphql/queries';
// import { Context } from '../hooks/use-context';
import { store } from '../../utils/store';
import { signIn } from './auth.actions';

const signWithGoogle = async () => {
    // const navigation = useNavigation();
    // const client = useApolloClient();

    try {
        const res = await Google.logInAsync({
            iosClientId: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
            androidClientId: '108595256943-r6ogjvtbmqonlrbaonjcichnvpka43jo.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (res.type === 'success') {
            const user =  {
                token: res.user.id,
                firstName: res.user.givenName,
                lastname: res.user.familyName,
                photoUrl: res.user.photoUrl,
                email: res.user.email,
                provider: 'google',
                coins: 0
            }

            store.dispatch(signIn(user))
            
            // const resultFromServer = await client.mutate({ mutation: AUTH, variables: { accessToken, provider: 'google' } });
        } else {
            throw new Error('No user found')
        }
    } catch (e) {
        throw Error(e);
    }
}; 

const signWithFacebook = async () => {
    // try {
    //     const result = await LoginManager.logInWithPermissions(['public_profile']);
    //     if (result.isCancelled) {
    //         return
    //     } else {
    //         const { accessToken: facebookToken } = await AccessToken.getCurrentAccessToken();
    //         token = facebookToken;
    //         type = 'success';
    //     }
    // } catch(err) {
    //     throw Error(err);
    // }
}

const signOut = async () => {
    // const navigation = useNavigation();
    // const { dispatch, state } = useContext(Context);

    // try {
    //     dispatch({type: 'SIGN_OUT'});
    //     await SecureStore.deleteItemAsync('token');
    //     navigation.navigate('Auth');
    // } catch (err) {
    //     throw Error(err);
    // }
};

const getUser = async () => {
    // const client = useApolloClient();
    // const { dispatch, state } = useContext(Context);

    // try {
    //     const token = await SecureStore.getItemAsync('token');

    //     if (!token) {
    //         return null;
    //     }
    //     const { data: { getUserWithToken: user } } = await client.query({ query: GET_USER_WITH_TOKEN, variables: { token } });

    //     if (!user) {
    //         return null;
    //     }

    //     dispatch({type: 'SIGN_IN', user, token});

    //     return user;
    // } catch (err) {
    //     throw Error(err);
    // }
};

export {
    signWithGoogle,
    signWithFacebook,
    getUser,
    signOut,
};