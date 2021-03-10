import { state as initialState } from './app.state';
import { 
    AppStateType,
    ActionsType,
    TOGGLE_DRAWER,
} from './app.types';

export const AppReducer = (state: AppStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerIsOpen: !state.drawerIsOpen,
            };
        default:
          return state
    }
};