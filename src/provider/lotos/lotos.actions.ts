import {
	ADD_LOTO_GRID,
	RESET_LOTOS,
	SET_LOTO_LOADING,
	loto
} from './lotos.types';
import { store } from './../../utils/store';

export const addLotoGrid = (numbers: number[], id: number) => store.dispatch({
	type: ADD_LOTO_GRID,
	payload: {
		id,
		numbers
	}
})

export const setupLotos = (lotos: loto[]) => store.dispatch({
	type: ADD_LOTO_GRID,
	lotos
})

export const setLotoLoading = (loading: boolean) => store.dispatch({
	type: SET_LOTO_LOADING,
	payload: loading
})

export const resetLotos = () => store.dispatch({
	type: RESET_LOTOS
})
