import {
	ADD_LOTO_GRID,
	RESET_LOTOS,
	loto
} from './lotos.types';
import { store } from './../../utils/store';

export const add_loto_grid = (numbers: number[], id: number) => store.dispatch({
	type: ADD_LOTO_GRID,
	payload: {
		id,
		numbers
	}
})

export const setup_lotos = (lotos: loto[]) => store.dispatch({
	type: ADD_LOTO_GRID,
	lotos
})

export const reset_lotos = () => store.dispatch({
	type: RESET_LOTOS
})
