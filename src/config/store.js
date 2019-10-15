import {AsyncStorage} from "react-native";
import {applyMiddleware, createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk";


import reducers from "../reducers";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["authReducer", "farmAdminReducer", "lookupDataReducer", "healthModuleOfflineReducer"],
    blacklist: ["animalMgmtReducer", "healthModuleReducer", "searchReducer", "dewormingReducer", "breedModuleReducer"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return {store, persistor};
};
