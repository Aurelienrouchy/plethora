import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import { setAuthLoading, signIn } from '../provider/user/user.actions';

import { client, LOGIN_OR_REGISTER } from './graphql';

export const signWithGoogle = async () => {
    setAuthLoading(true)
    try {
        const res = await Google.logInAsync({
            iosClientId: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
            androidClientId: '108595256943-r6ogjvtbmqonlrbaonjcichnvpka43jo.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (res.type === 'success') {

            const result =  await client.mutate({
                mutation: LOGIN_OR_REGISTER,
                variables: {
                    token: res.accessToken,
                    provider: 'google'
                }
            });
            signIn(result?.data?.loginOrRegister);
        }
        setAuthLoading(false)
    } catch (err) {
        setAuthLoading(false)
    }

    return 
}; 

export const signWithFacebook = async () => {
    try {
        const res = await Google.logInAsync({
            iosClientId: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
            androidClientId: '108595256943-r6ogjvtbmqonlrbaonjcichnvpka43jo.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (res.type === 'success') {

            const result =  await client.mutate({
                mutation: LOGIN_OR_REGISTER,
                variables: {
                    token: res.accessToken,
                    provider: 'google'
                }
            });
            const user = result?.data?.loginOrRegister;

            return user;
            
        } else {
            throw new Error('No user found')
        }
    } catch (e) {
        throw Error(e);
    }
}; 