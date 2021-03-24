export const SET_MESSAGE = 'SET_MESSAGE';
export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';

// State

export interface MessagesStateType {
    isDisplay: boolean;
    text: string
}

// Actions

interface SetMessageAction {
	type: typeof SET_MESSAGE;
	text: string;
}

interface DisplayMessageAction {
	type: typeof DISPLAY_MESSAGE;
	payload: boolean;
}

export type ActionsType = SetMessageAction | DisplayMessageAction;

