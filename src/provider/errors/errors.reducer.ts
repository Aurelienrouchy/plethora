import { state as initialState } from './errors.state';
import { 
    SET_ERROR,
    DISPLAY_ERROR,
    ErrorsStateType,
    ActionsType
} from './errors.types';

export const ErrorReducer = (state: ErrorsStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case SET_ERROR: {
            return {
                ...state,
                text: action.text
            }
        }
        case DISPLAY_ERROR: {
            return {
                ...state,
                isDisplay: action.payload
            }
        }
        default:
          return state
    }
};