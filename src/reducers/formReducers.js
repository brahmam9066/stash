import {SIMPLE_PRESCRIPTION_MEDICINE_CHANGE_DEWORMING, SIMPLE_PRESCRIPTION_MEDICINE_CHANGE_DEHORNING} from "../actions/action-types";
import prescriptionAlter from "../utils/form.utils";

const forReducers = {
    profileInformation: (state, action) => {
        switch (action.type) {
        case "RESET_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.property]: ""
                }
            };

        case "SET_PROFILE_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.property]: action.value
                }
            };

        default:
            return state;
        }
    },
    breedInformation: (state, action) => {
        switch (action.type) {
        case "SET_BREEADING_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    recordObservation: (state, action) => {
        switch (action.type) {
        case "RESET_OBSERVATION_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.property]: ""
                }
            };
        default:
            return state;
        }
    },
    recordObservation: (state, action) => {
        switch (action.type) {
        case "SET_OBSERVATION_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    prescription: (state, action) => {
        switch (action.type) {
        case "SET_PRESCRIPTION_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    recordVaccination: (state, action) => {
        switch (action.type) {
        case "SET_VACCINATION_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		                [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    recordDeworming: (state, action) => {
        switch (action.type) {
        case "SET_DEWORMING_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		            [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    recordDehorning: (state, action) => {
        switch (action.type) {
        case "SET_DEHORNING_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		            [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    recordPD: (state, action) => {
        switch (action.type) {
        case "SET_PD_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		            [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    recordAI: (state, action) => {
        switch (action.type) {
        case "SET_AI_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		            [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },
    
    bcsForm: (state, action) => {
        switch (action.type) {
        case "SET_BCS_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		            [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },

    bwmForm: (state, action) => {
        switch (action.type) {
        case "SET_BWM_PROPERTY_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
		            [action.property]: action.value
                }
            };
        default:
            return state;
        }
    },

    calfBirth: (state, action) => {
        switch (action.type) {
            case "SET_CALF_BIRTH_VALUE":
                return {
                    ...state,
                    values: {
                        ...state.values,
                        [action.property]: action.value
                    }
                };
            default:
                return state;
            }
    }
};

export default forReducers;
