import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import { participate, setLotos } from '../provider/lotos/lotos.actions';
import { addCoins, addExperiences, addTrees } from '../provider/user/user.actions';
import { setAuthLoading, signIn } from '../provider/user/user.actions';

import { LOGIN_OR_REGISTER } from './schemaGraphQl';
import client from './clientGraphQl';
import { showMessage } from './message';
import { getUserTickets } from './query';
import { store as GlobalStore } from './store';

export const authentification = async (provider: string) => {
    const store = GlobalStore.getState()?.lotos?.lotos;

    try {
        const user = provider === 'google' ? await signWithGoogle() : await signWithFacebook();

        if (!user) {
            showMessage("Connection error");
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
        showMessage("Authentication error")
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
        showMessage(err.message);
    }
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
            showMessage('No user found')
        }
    } catch (err) {
        showMessage(err.message)
    }
}; 