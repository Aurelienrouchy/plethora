import { state as initialState } from './app.state';
import { AppStateType, actionType, TOGGLE_DRAWER } from './app.types';

export const AppReducer = (state: AppStateType = initialState, action: actionType) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            console.log(state)
            return {
                ...state,
                drawerIsOpen: state.drawerIsOpen ? 0 : 1,
            };
        default:
          return state
    }
};