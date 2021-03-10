import {
    ADD_COINS,
    ADD_TREES,
    SET_ADS_VISIBLE,
    SET_REWARD_VISIBLE,
    SET_TICKET_VISIBLE,
    SET_ADS_LOADING,
} from './tickets.types';
import { store } from '../../utils/store';

export const addCoins = (coins: number) => store.dispatch({
	type: ADD_COINS,
	coins
})

export const addTrees = (trees: number) => store.dispatch({
	type: ADD_TREES,
	trees
})

export const setAdsVisible = (isVisible: boolean) => store.dispatch({
	type: SET_ADS_VISIBLE,
	payload: isVisible
})

export const setRewardVisible = (isVisible: boolean) => store.dispatch({
	type: SET_REWARD_VISIBLE,
	payload: isVisible
})

export const setTicketVisible = (isVisible: boolean) => store.dispatch({
	type: SET_TICKET_VISIBLE,
	payload: isVisible
})

export const setAdsLoading = (loading: boolean) => store.dispatch({
	type: SET_ADS_LOADING,
	payload: loading
})