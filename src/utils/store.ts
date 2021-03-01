import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { useSelector } from 'react-redux';

import { AuthStateType } from '../provider/auth/auth.types';
import { AppStateType } from '../provider/app/app.types';
import { AuthReducer } from "../provider/auth/auth.reducer";
import { AppReducer } from '../provider/app/app.reducer';

export const allReducers = combineReducers({
    auth: AuthReducer,
    app: AppReducer
});

export interface GlobalStoreType {
    auth: AuthStateType;
    app: AppStateType;
}

export const useAppStore = (): AppStateType => useSelector((state: GlobalStoreType) => state['app']);
export const useAuthStore = (): AuthStateType => useSelector((state: GlobalStoreType) => state['auth']);

export const store = createStore(allReducers, applyMiddleware(thunk));