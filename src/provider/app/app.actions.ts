import { TOGGLE_DRAWER } from './app.types';
import { store } from './../../utils/store';

export const toggleDrawer = () => store.dispatch({
	type: TOGGLE_DRAWER,
})