export const ADD_LOTO_GRID = 'ADD_LOTO_GRID';
export const RESET_LOTOS = 'RESET_LOTOS';
export const SETUP_LOTOS = 'SETUP_LOTOS';

// State

export type loto = {
    id: number;
    title: string;
    cost: number;
    imageUrl: string | number;
    timer: number;
    lotoNumbers: number;
    lotoComplementary: number;
    maxNumber: number;
    maxComplementary: number;
    tickets: number[][];
}

export interface LotosStateType {
    loading: boolean;
    lotos: loto[]
}

// Actions

interface AddLotoGridAction {
	type: typeof ADD_LOTO_GRID;
	payload: {
        id: number;
        numbers: number[]
    };
}

interface ResetLotosAction {
	type: typeof RESET_LOTOS;
}

interface SetupLotosAction {
	type: typeof SETUP_LOTOS;
    lotos: loto[]
}

export type ActionsType = 
      AddLotoGridAction
    | ResetLotosAction
    | SetupLotosAction;

