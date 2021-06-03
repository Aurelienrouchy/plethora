import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store';
import { setLotos } from '../provider/lotos/lotos.actions';
import { setAuthLoading, signIn } from '../provider/user/user.actions';

import { LOGIN_OR_REGISTER, LOGIN_WITH_TOKEEN } from './schemaGraphQl';
import client from './clientGraphQl';
import { getUserTickets } from './query';
import { store as GlobalStore } from './store';
import Toast from 'react-native-toast-message';

export const authentificationWithToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');

        if (!token) {
            return
        }

        const result =  await client.mutate({
            mutation: LOGIN_WITH_TOKEEN,
            variables: { token }
        });

        const user = result?.data?.loginWithToken;

        if (!user) {
            return
        }

        signIn(user)

    } catch(err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Connection error'
        })
    }
}

export const authentification = async (provider: 'google' | 'facebook') => {
    const store = GlobalStore.getState()?.lotos?.lotos;

    try {
        const user = provider === 'google' ? await signWithGoogle() : await signWithFacebook();

        if (!user) {
            Toast.show({
                type: 'error',
                text1: 'Error server',
                text2: 'Connection error'
            })
            return
        }

        await SecureStore.setItemAsync('token', user.token);

        const userTickets = await getUserTickets(user.id);

        if (userTickets && userTickets.length) {
            const lotos = store.map(loto => {
                const tickets = userTickets.filter(userTicket => userTicket.lotoId === loto.id);
                return {
                    ...loto,
                    tickets
                }
            })
            setLotos(lotos);
        }

        signIn(user);
    } catch(err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: 'Authentification error'
        })
    }
}

export const signWithGoogle = async () => {
    setAuthLoading(true)
    try {
        const res = await Google.logInAsync({
            // iosClientId: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
            // androidClientId: '108595256943-r6ogjvtbmqonlrbaonjcichnvpka43jo.apps.googleusercontent.com',
            // scopes: ['profile', 'email'],
            iosClientId: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
            iosStandaloneAppClientId: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
            androidClientId: '766840691282-ebi6v0bgncfm6mch51nmhcrlhvcqadre.apps.googleusercontent.com',
            androidStandaloneAppClientId: '766840691282-ebi6v0bgncfm6mch51nmhcrlhvcqadre.apps.googleusercontent.com',
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

            return result?.data?.loginOrRegister;
        }
        setAuthLoading(false);
    } catch (err) {
        setAuthLoading(false);
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: err.message
        })
    }
}; 

export const signWithFacebook = async () => {
    try {
        await Facebook.initializeAsync({ appId: '1108660579613157' });
        const res = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] });

        if (res.type === 'success') {

            const result =  await client.mutate({
                mutation: LOGIN_OR_REGISTER,
                variables: {
                    token: res.token,
                    provider: 'facebook'
                }
            });
            const user = result?.data?.loginOrRegister;

            return user;
            
        } else {
            Toast.show({
                type: 'error',
                text1: 'Error server',
                text2: 'Authentification error'
            })
        }
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: err.message
        })
    }
}; 