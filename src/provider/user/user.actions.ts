import {
	SIGN_OUT,
	SIGN_IN,
	SET_AUTH_LOADING,
	UserType,
	ADD_COINS,
	REMOVE_COINS,
	ADD_EXPERIENCES,
	ADD_TREES
} from './user.types';
import { store } from '../../utils/store';

export const signIn = (user: UserType) => store.dispatch({
	type: SIGN_IN,
	user,
})

export const signOut = () => store.dispatch({
	type: SIGN_OUT,
})

export const setAuthLoading = (loading: boolean) => store.dispatch({
	type: SET_AUTH_LOADING,
	payload: loading
})

export const addCoins = (coins: number) => store.dispatch({
	type: ADD_COINS,
	coins
})

export const removeCoins = (coins: number) => store.dispatch({
	type: REMOVE_COINS,
	coins
})

export const addExperiences = (exp: number) => store.dispatch({
	type: ADD_EXPERIENCES,
	exp
})

export const addTrees = (trees: number) => store.dispatch({
	type: ADD_TREES,
	trees
})