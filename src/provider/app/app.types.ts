export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export interface AppStateType {
    drawerIsOpen: boolean;
}

interface toogleDrawerAction {
	type: typeof TOGGLE_DRAWER;
}

export type ActionsType = 
      toogleDrawerAction;