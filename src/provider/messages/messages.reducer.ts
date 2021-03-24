import { state as initialState } from './messages.state';
import { 
    SET_MESSAGE,
    DISPLAY_MESSAGE,
    MessagesStateType,
    ActionsType
} from './messages.types';

export const ErrorReducer = (state: MessagesStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case SET_MESSAGE: {
            return {
                ...state,
                text: action.text
            }
        }
        case DISPLAY_MESSAGE: {
            return {
                ...state,
                isDisplay: action.payload
            }
        }
        default:
          return state
    }
};