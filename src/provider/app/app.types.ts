import Animated from "react-native-reanimated";

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export interface AppStateType {
    drawerIsOpen: number
}

interface toogleDrawerAction {
	type: typeof TOGGLE_DRAWER;
}

export type actionType = toogleDrawerAction;