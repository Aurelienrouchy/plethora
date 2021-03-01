import { state as initialState } from './auth.state';
import {
    AuthStateType,
    actionType,
    SIGN_IN,
    SIGN_OUT, 
    LOADING,
    ADD_COINS,
    ADD_TREES
} from './auth.types';

export const AuthReducer = (state: AuthStateType = initialState, action: actionType) => {
    switch (action.type) {
        case SIGN_OUT:
            return {
                ...state,
                isLogin: false,
                user: {}
            };
        case SIGN_IN:
            return {
                ...state,
                isLogin: true,
                user: {
                    ...state.user,
                    ...action.user
                },
        };
        case LOADING:
            return {
                ...state,
                isLoading: action.payload
        };
        case ADD_COINS:
            return {
                ...state,
                user: {
                    ...state.user,
                    coins: state.user.coins + action.coins
                },
        };
        case ADD_TREES:
            return {
                ...state,
                user: {
                    ...state.user,
                    trees: state.user.trees + action.trees
                },
        };
        default:
          return state
    }
};