import { state as initialState } from './tickets.state';
import {
    TicketsStateType,
    ActionsType,
    ADD_COINS,
    ADD_TREES,
    SET_ADS_VISIBLE,
    SET_REWARD_VISIBLE,
    SET_SCRATCH_VISIBLE,
    SET_ADS_LOADING,
    SET_TICKETS,
    SET_IS_REWARD
} from './tickets.types';

export const TicketsReducer = (state: TicketsStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_COINS:
            return {
                ...state,
                coins: action.coins
            };
        case ADD_TREES:
            return {
                ...state,
                trees: action.trees
            };    
        case SET_ADS_VISIBLE:
            return {
                ...state,
                adsIsVisible: action.payload
            };     
        case SET_TICKETS:
            return {
                ...state,
                tickets: action.tickets
            };    
        case SET_REWARD_VISIBLE:
            return {
                ...state,
                rewardIsVisible: action.payload
            };    
        case SET_SCRATCH_VISIBLE:
            return {
                ...state,
                scratchIsVisible: action.payload
            };    
        case SET_ADS_LOADING:
            return {
                ...state,
                adsLoading: action.payload
            };  
        case SET_IS_REWARD:
            return {
                ...state,
                isReward: action.payload
            };
        default:
          return state
    }
};