import {
    SET_ADS_VISIBLE,
    SET_REWARD_VISIBLE,
    SET_SCRATCH_VISIBLE,
    SET_ADS_LOADING,
	Tickets,
	SET_TICKETS,
	SET_IS_REWARD,
} from './tickets.types';
import { store } from '../../utils/store';

export const setTickets = (tickets: Tickets[]) => store.dispatch({
	type: SET_TICKETS,
	tickets
})

export const setAdsVisible = (isVisible: boolean) => store.dispatch({
	type: SET_ADS_VISIBLE,
	payload: isVisible
})

export const setRewardVisible = (isVisible: boolean) => store.dispatch({
	type: SET_REWARD_VISIBLE,
	payload: isVisible
})

export const setScratchVisible = (isVisible: boolean) => store.dispatch({
	type: SET_SCRATCH_VISIBLE,
	payload: isVisible
})

export const setAdsLoading = (loading: boolean) => store.dispatch({
	type: SET_ADS_LOADING,
	payload: loading
})

export const setIsReward = (isReward: boolean) => store.dispatch({
	type: SET_IS_REWARD,
	payload: isReward
})