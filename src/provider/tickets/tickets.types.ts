export const SET_IS_REWARD = 'SET_IS_REWARD';
export const SET_TICKETS = 'SET_TICKETS';
export const SET_ADS_VISIBLE = 'SET_ADS_VISIBLE';
export const SET_REWARD_VISIBLE = 'SET_REWARD_VISIBLE';
export const SET_SCRATCH_VISIBLE = 'SET_SCRATCH_VISIBLE';
export const SET_ADS_LOADING = 'SET_ADS_LOADING';

// Actions
interface SetAdsVisibleAction {
	type: typeof SET_ADS_VISIBLE;
	payload: boolean;
}
interface SetTicketsAction {
	type: typeof SET_TICKETS;
	tickets: Tickets[];
}

interface SetRewardVisibleAction {
	type: typeof SET_REWARD_VISIBLE;
	payload: boolean;
}

interface SetScratchVisibleAction {
	type: typeof SET_SCRATCH_VISIBLE;
	payload: boolean;
}

interface SetAdsLoadingAction {
	type: typeof SET_ADS_LOADING;
	payload: boolean;
}
interface SetIsRewardAction {
	type: typeof SET_IS_REWARD;
	payload: boolean;
}

export type ActionsType = 
      SetTicketsAction
    | SetAdsVisibleAction
    | SetIsRewardAction
    | SetRewardVisibleAction
    | SetScratchVisibleAction
    | SetAdsLoadingAction;

// State

export type Tickets = {
    id: number,
    level: number,
    minCoins: number,
    maxCoins: number,
    locked: boolean,
    scratchableBeforeUnlock: number,
    imageUrl: string,
    imageFrontUrl: string,
    imageBackUrl: string,
    progressColor: string
}

export interface TicketsStateType {
    tickets: Tickets[],
    adsIsVisible: boolean,
    rewardIsVisible: boolean,
    scratchIsVisible: boolean,
    adsLoading: boolean,
    isReward: boolean,
}
