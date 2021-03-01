import { LOADING, SIGN_OUT, SIGN_IN, userType, ADD_COINS } from './auth.types';
import { store } from './../../utils/store';

export const loading = (loading: boolean) => ({
	type: LOADING,
	payload: loading,
})

export const signIn = (user: userType) => ({
	type: SIGN_IN,
	user,
})

export const signOut = () => ({
	type: SIGN_OUT,
})

export const addCoins = (coins: number) => store.dispatch({
	type: ADD_COINS,
	coins
})