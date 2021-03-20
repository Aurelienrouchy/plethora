export const ADD_COINS = 'ADD_COINS';
export const ADD_TREES = 'ADD_TREES';
export const SET_IS_REWARD = 'SET_IS_REWARD';
export const SET_TICKETS = 'SET_TICKETS';
export const SET_ADS_VISIBLE = 'SET_ADS_VISIBLE';
export const SET_REWARD_VISIBLE = 'SET_REWARD_VISIBLE';
export const SET_SCRATCH_VISIBLE = 'SET_SCRATCH_VISIBLE';
export const SET_ADS_LOADING = 'SET_ADS_LOADING';

// Actions

interface AddCoinsAction {
	type: typeof ADD_COINS;
	coins: number;
}

interface AddTreesAction {
	type: typeof ADD_TREES;
	trees: number;
}

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
      AddCoinsAction
    | AddTreesAction
    | SetTicketsAction
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
    scratchBeforeUnlock: number,
    image: string
}

export interface TicketsStateType {
    tickets: Tickets[],
    coins: number,
    trees: number,
    adsIsVisible: boolean,
    rewardIsVisible: boolean,
    scratchIsVisible: boolean,
    adsLoading: boolean,
    isReward: boolean,
}
