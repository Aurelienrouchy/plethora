import {
	PARTICIPATE_LOTO,
	RESET_LOTOS,
	SET_LOTO_LOADING,
	SET_LOTOS,
	loto,
	lotoTicket,
	SHOW_VALIDATION
} from './lotos.types';
import { store } from './../../utils/store';

export const participate = (ticket: lotoTicket) => store.dispatch({
	type: PARTICIPATE_LOTO,
	payload: ticket
})

export const setLotos = (lotos: loto[]) => store.dispatch({
	type: SET_LOTOS,
	lotos
})

export const setLotoLoading = (loading: boolean) => store.dispatch({
	type: SET_LOTO_LOADING,
	payload: loading
})

export const resetLotos = () => store.dispatch({
	type: RESET_LOTOS
})

export const showValidation = (isVisible: boolean) => store.dispatch({
	type: SHOW_VALIDATION,
	payload: isVisible
})
