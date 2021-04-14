export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';

export const ADD_COINS = 'ADD_COINS';
export const REMOVE_COINS = 'REMOVE_COINS';
export const ADD_TREES = 'ADD_TREES';
export const ADD_EXPERIENCES = 'ADD_EXPERIENCES';

export type UserType = {
    id: string | undefined;
    coins: number | undefined;
    trees: number | undefined;
    experiences: number | undefined;
    token: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    photoUrl: string | undefined;
    email: string | undefined;
    provider: 'google' | 'facebook' | string;
}

export interface UserStateType {
    id: string | undefined;
    coins: number | undefined;
    trees: number | undefined;
    experiences: number | undefined;
    token: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    photoUrl: string | undefined;
    email: string | undefined;
    provider: string | undefined;
    loading: boolean,
    isLogin: boolean;
}

interface SignOutAction {
	type: typeof SIGN_OUT;
}
interface SignInAction {
	type: typeof SIGN_IN;
	user: UserType;
}
interface SetAuthLoadingAction {
	type: typeof SET_AUTH_LOADING;
	payload: boolean;
}
interface AddCoinsAction {
	type: typeof ADD_COINS;
	coins: number;
}
interface RemoveCoinsAction {
	type: typeof REMOVE_COINS;
	coins: number;
}
interface AddTreesAction {
	type: typeof ADD_TREES;
	trees: number;
}
interface AddExperiencesAction {
	type: typeof ADD_EXPERIENCES;
	exp: number;
}

export type ActionsType = 
      SignOutAction
    | SignInAction
    | AddCoinsAction
    | RemoveCoinsAction
    | AddTreesAction
    | AddExperiencesAction
    | SetAuthLoadingAction;

