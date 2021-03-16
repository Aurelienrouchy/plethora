import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { useSelector } from 'react-redux';

// User
import { UserStateType } from '../provider/user/user.types';
import { UserReducer } from "../provider/user/user.reducer";

// Loto
import { LotosStateType } from '../provider/lotos/lotos.types';
import { LotosReducer } from "../provider/lotos/lotos.reducer";

// Ticket
import { TicketsStateType } from '../provider/tickets/tickets.types';
import { TicketsReducer } from "../provider/tickets/tickets.reducer";

// App
import { AppStateType } from '../provider/app/app.types';
import { AppReducer } from "../provider/app/app.reducer";
import { ErrorReducer } from '../provider/errors/errors.reducer';
import { ErrorsStateType } from '../provider/errors/errors.types';

export const allReducers = combineReducers({
    user: UserReducer,
    lotos: LotosReducer,
    tickets: TicketsReducer,
    app: AppReducer,
    error: ErrorReducer,
});

export interface GlobalStoreType {
    user: UserStateType;
    lotos: LotosStateType;
    tickets: TicketsStateType;
    app: AppStateType;
    error: ErrorsStateType
}

export const useUserStore = (): UserStateType => useSelector((state: GlobalStoreType) => state['user']);
export const useLotosStore = (): LotosStateType => useSelector((state: GlobalStoreType) => state['lotos']);
export const useTicketStore = (): TicketsStateType => useSelector((state: GlobalStoreType) => state['tickets']);
export const useAppStore = (): AppStateType => useSelector((state: GlobalStoreType) => state['app']);
export const useErrorStore = (): ErrorsStateType => useSelector((state: GlobalStoreType) => state['error']);

export const store = createStore(allReducers, applyMiddleware(thunk));