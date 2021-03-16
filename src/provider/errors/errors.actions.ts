import {
	SET_ERROR,
	DISPLAY_ERROR
} from './errors.types';
import { store } from '../../utils/store';

export const displayError = (isDisplay: boolean) => store.dispatch({
	type: DISPLAY_ERROR,
	payload: isDisplay
})

export const setError = (text: string) => store.dispatch({
	type: SET_ERROR,
	text
})
