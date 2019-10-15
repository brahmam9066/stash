import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import appReducer from "./appReducer";
import authReducer from "./authReducer";
import animalMgmtReducer from "./animalMgmtReducer";
import farmAdminReducer from "./farmAdminReducer";
import healthModuleReducer from "./healthModuleReducer";
import breedModuleReducer from "./breedModuleReducer";
import formReducers from "./formReducers";
import searchReducer from "./searchReducer";
import productionReducer from "./productionModuleReducer";
import lookupDataReducer from "./lookupDataReducer";
import healthModuleOfflineReducer from "./offlineReducers/healthModuleOfflineReducer";
import localeReducer from "./localeReducer";
import routeReducer from "./routeReducer";
import imageReducer from "./imageReducer";
import nutritionReducer from "./nutritionModuleReducer";

const form = formReducer.plugin(formReducers);

const reducers = {
    appReducer,
    form,
    authReducer,
    animalMgmtReducer,
    farmAdminReducer,
    healthModuleReducer,
    searchReducer,
    breedModuleReducer,
    productionReducer,
    lookupDataReducer,
    healthModuleOfflineReducer,
    localeReducer,
    routeReducer,
    imageReducer,
    nutritionReducer
};

const combineReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT_USER") {
        state = undefined;
    }
    return combineReducer(state, action);
};

export default rootReducer;
