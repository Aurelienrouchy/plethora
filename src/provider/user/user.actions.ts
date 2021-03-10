import {
	SIGN_OUT,
	SIGN_IN,
	SET_AUTH_LOADING,
	UserType
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