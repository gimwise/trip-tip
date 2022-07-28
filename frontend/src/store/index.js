import auth from "./auth";
import group from "./group";
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';	// 추가
import storage from 'redux-persist/lib/storage';	// 추가

const persistConfig = {
    key: 'root',
    storage,
}	

const rootReducer = combineReducers({ 
    auth,
    group,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export default persistedReducer;
