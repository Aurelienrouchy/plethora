export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_IN = 'SIGN_IN';
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';

export type UserType = {
    token: string | undefined;
    firstName: string | undefined;
    lastname: string | undefined;
    photoUrl: string | undefined;
    email: string | undefined;
    provider: string | undefined;
}

export interface UserStateType {
    token: string | undefined;
    firstName: string | undefined;
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

export type ActionsType = 
      SignOutAction
    | SignInAction
    | SetAuthLoadingAction;

