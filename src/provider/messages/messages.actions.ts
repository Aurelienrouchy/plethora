import {
	SET_MESSAGE,
	DISPLAY_MESSAGE
} from './messages.types';
import { store } from '../../utils/store';

export const displayMessage = (isDisplay: boolean) => store.dispatch({
	type: DISPLAY_MESSAGE,
	payload: isDisplay
})

export const setText = (text: string) => store.dispatch({
	type: SET_MESSAGE,
	text
})

// export const set = (text: string) => store.dispatch({
// 	type: SET_MESSAGE,
// 	text
// })
