export const SET_ERROR = 'SET_ERROR';
export const DISPLAY_ERROR = 'DISPLAY_ERROR';

// State

export interface ErrorsStateType {
    isDisplay: boolean;
    text: string
}

// Actions

interface SetErrorAction {
	type: typeof SET_ERROR;
	text: string;
}

interface DisplayErrorAction {
	type: typeof DISPLAY_ERROR;
	payload: boolean;
}

export type ActionsType = SetErrorAction | DisplayErrorAction;

