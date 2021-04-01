export const PARTICIPATE_LOTO = 'PARTICIPATE_LOTO';
export const RESET_LOTOS = 'RESET_LOTOS';
export const SET_LOTOS = 'SET_LOTOS';
export const SET_LOTO_LOADING = 'SET_LOTO_LOADING';
export const SHOW_VALIDATION = 'SHOW_VALIDATION';

// State

export type lotoTicket = {
    id: string;
    classic: number[];
    coins: number;
    complementary: number[];
    lotoId: string;
    userId: string;
}

export type loto = {
    id: string;
    title: string;
    cost: number;
    imageUrl: string;
    timer: number;
    lotoNumbers: number;
    lotoComplementary: number;
    maxNumbers: number;
    maxComplementary: number;
    tickets: lotoTicket[];
}

export interface LotosStateType {
    loading: boolean;
    lotos: loto[];
    showValidation: boolean;
}

// Actions

interface ParticipateLotoAction {
	type: typeof PARTICIPATE_LOTO;
	payload: lotoTicket
}

interface ResetLotosAction {
	type: typeof RESET_LOTOS;
}

interface ShowValidationAction {
	type: typeof SHOW_VALIDATION;
    payload: boolean;
}

interface SetLotosAction {
	type: typeof SET_LOTOS;
    lotos: loto[]
}
interface SetLotoLoadingAction {
	type: typeof SET_LOTO_LOADING;
    payload: boolean
}

export type ActionsType = 
      ParticipateLotoAction
    | ShowValidationAction
    | ResetLotosAction
    | SetLotosAction
    | SetLotoLoadingAction;

