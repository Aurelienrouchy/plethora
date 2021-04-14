import { state as initialState } from './lotos.state';
import { 
    LotosStateType,
    ActionsType,
    PARTICIPATE_LOTO,
    RESET_LOTOS,
    SET_LOTOS,
    SET_LOTO_LOADING,
    SHOW_VALIDATION
} from './lotos.types';

export const LotosReducer = (state: LotosStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case PARTICIPATE_LOTO: {
            const ticket = action.payload;
            const lotos = state.lotos.map(loto => {
                if (loto.id === ticket.lotoId) {
                    return {
                        ...loto,
                        tickets: [...loto.tickets, ticket]
                    }
                }
                return loto
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
        case SET_LOTOS: {
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
        case SHOW_VALIDATION: {
            return {
                ...state,
                showValidation: action.payload
            }
        }
        default:
          return state
    }
};