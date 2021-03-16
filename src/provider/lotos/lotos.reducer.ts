import { state as initialState } from './lotos.state';
import { 
    LotosStateType,
    ActionsType,
    ADD_LOTO_GRID,
    RESET_LOTOS,
    SETUP_LOTOS,
    SET_LOTO_LOADING
} from './lotos.types';

export const LotosReducer = (state: LotosStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ADD_LOTO_GRID: {
            const id = action.payload.id;
            const numbers = action.payload.numbers
            const lotos = state.lotos.map(lt => {
                if (lt.id === id) {
                    return {
                        ...lt,
                        tickets: [...lt.tickets, numbers]
                    }
                }
                return lt
            })
            return {
                ...state,
                lotos
            };
        }
        case RESET_LOTOS: {
            const lotos = state.lotos.map(lt => ({...lt, tickets: []}));
            return {
                ...state,
                lotos
            };
        }
        case SETUP_LOTOS: {
            return {
                ...state,
                lotos: action.lotos
            }
        }
        case SET_LOTO_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        default:
          return state
    }
};