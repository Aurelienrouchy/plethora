export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';
export const LOADING = 'LOADING';
export const ADD_COINS = 'ADD_COINS';
export const ADD_TREES = 'ADD_TREES';

export type Tickets = {
    id: number,
    level: number,
    minCoins: number,
    maxCoins: number,
    locked: false | true,
    scratchBeforeUnlock: number,
    image: string
}

export type userType = {
    token: string | undefined;
    firstName: string | undefined;
    lastname: string | undefined;
    photoUrl: string | undefined;
    email: string | undefined;
    provider: string | undefined;
    coins: number;
    tickets: Tickets[];
    trees: number;
}

export interface AuthStateType {
    isLogin: boolean,
    user: userType
}

interface signOutAction {
	type: typeof SIGN_OUT;
}

interface signInAction {
	type: typeof SIGN_IN;
	user: userType;
}

interface loadingAction {
	type: typeof LOADING;
	payload: boolean;
}

interface addCoinsAction {
	type: typeof ADD_COINS;
	coins: number;
}

interface addTreesAction {
	type: typeof ADD_TREES;
	trees: number;
}

export type actionType = 
      signOutAction
    | signInAction
    | loadingAction
    | addCoinsAction
    | addTreesAction;

