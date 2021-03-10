import { SET_ADS_LOADING } from '../tickets/tickets.types';
import { state as initialState } from './user.state';
import {
    UserStateType,
    ActionsType,
    SIGN_IN,
    SIGN_OUT,
    SET_AUTH_LOADING
} from './user.types';

export const UserReducer = (state: UserStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case SIGN_OUT:
            return {
                token: undefined,
                firstName: undefined,
                lastname: undefined,
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