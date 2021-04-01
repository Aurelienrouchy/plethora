import { SET_ADS_LOADING } from '../tickets/tickets.types';
import { state as initialState } from './user.state';
import {
    UserStateType,
    ActionsType,
    SIGN_IN,
    SIGN_OUT,
    SET_AUTH_LOADING,
    ADD_EXPERIENCES,
    ADD_TREES,
    REMOVE_COINS,
    ADD_COINS
} from './user.types';

export const UserReducer = (state: UserStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_COINS:
            return {
                ...state,
                coins: state.coins + action.coins
            };
        case REMOVE_COINS:
            return {
                ...state,
                coins: state.coins - action.coins
            };
        case ADD_TREES:
            return {
                ...state,
                trees: action.trees
            };    
        case ADD_EXPERIENCES:
            return {
                ...state,
                experiences: state.experiences + action.exp
            };  
        case SIGN_OUT:
            return {
                id: undefined,
                coins: undefined,
                trees: undefined,
                experiences: undefined,
                token: undefined,
                lastname: undefined,
                firstName: undefined,
                photoUrl: undefined,
                email: undefined,
                provider: undefined,
            };
        case SIGN_IN:
            return {
                ...state,
                isLogin: true,
                ...action.user
            };
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
          return state
    }
};