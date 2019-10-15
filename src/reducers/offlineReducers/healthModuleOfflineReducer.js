const initialState = {
    dehorningOfflineList: [],
    dewormingOfflineList: [],
    vaccinationOfflineList: [],
    observationOfflineList:[],
    aiOfflineList:[],
    pdOfflineList:[],
    calfBirthOfflineList : [],
    location:{},
    cattleOfflineRegistration:[],
};

const removeObjectFromArray = (uniqueId, array) => {
    return array.filter(item => (item._id !== uniqueId));
};

const updateObjectInArray = (payload, array) => {
    console.log("payload", payload);
    return array.map((item) => {
        if (item._id === payload._id) {
            return {
                ...item,
                ...payload
            };
        }
        return item;
    });
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SET_DEHORNING_OFFLINE_LIST":
        return {
            ...state,
            dehorningOfflineList: [
                ...state.dehorningOfflineList,
                action.payload
            ]
        };

    case "REMOVE_DEHORNING_OFFLINE_LIST":
        return {
            ...state,
            dehorningOfflineList: removeObjectFromArray(action.payload,state.dehorningOfflineList)
        };

    case "UPDATE_DEHORNING_OFFLINE_LIST":
        return {
            ...state,
            dehorningOfflineList: updateObjectInArray(action.payload, state.dehorningOfflineList)
        };

    case "SET_DEWORMING_OFFLINE_LIST":
        return {
            ...state,
            dewormingOfflineList: [
                ...state.dewormingOfflineList,
                action.data
            ]
        };
    
    // case "SERVER_DEHORNING_OFFLINE_ERROR":
    //     return {
    //         ...state,
    //         offlineErrors: [
    //             ...state.offlineErrors,
    //             action.payload
    //         ],
    //         dehorningOfflineList: updateObjectInArray(action.payload, state.dehorningOfflineList)
    //     };       

    case "REMOVE_DEWORMING_OFFLINE_LIST":
        return {
            ...state,
            dewormingOfflineList: removeObjectFromArray(action.payload,state.dewormingOfflineList)
        };

    case "UPDATE_DEWORMING_OFFLINE_LIST":
        return {
            ...state,
            dewormingOfflineList: updateObjectInArray(action.data, state.dewormingOfflineList)
        };

    case "SET_VACCINATION_OFFLINE_LIST":
        return {
            ...state,
            vaccinationOfflineList: [
                ...state.vaccinationOfflineList,
                action.payload
            ]
        };

    case "REMOVE_VACCINATION_OFFLINE_LIST":
        return {
            ...state,
            vaccinationOfflineList: removeObjectFromArray(action.payload,state.vaccinationOfflineList)
        };

    case "UPDATE_VACCINATION_OFFLINE_LIST":
        return {
            ...state,
            vaccinationOfflineList: updateObjectInArray(action.payload, state.vaccinationOfflineList)
        };

        case "SET_OBSERVATION_OFFLINE_LIST":
        return {
            ...state,
            observationOfflineList: [
                ...state.observationOfflineList,
                action.payload
            ]
        };

    case "REMOVE_OBSERVATION_OFFLINE_LIST":
        return {
            ...state,
            observationOfflineList: removeObjectFromArray(action.payload,state.observationOfflineList)
        };

    case "UPDATE_OBSERVATION_OFFLINE_LIST":
        return {
            ...state,
            observationOfflineList: updateObjectInArray(action.payload, state.observationOfflineList)
        }; 
        
    case "SET_AI_OFFLINE_LIST":
        return {
            ...state,
            aiOfflineList: [
                ...state.aiOfflineList,
                action.payload
            ]
        };

    case "REMOVE_AI_OFFLINE_LIST":
        return {
            ...state,
            aiOfflineList: removeObjectFromArray(action.payload,state.aiOfflineList)
        };

    case "UPDATE_AI_OFFLINE_LIST":
        return {
            ...state,
            aiOfflineList: updateObjectInArray(action.payload, state.aiOfflineList)
        };
     
    case "SET_PD_OFFLINE_LIST":
        return {
            ...state,
            pdOfflineList: [
                ...state.pdOfflineList,
                action.payload
            ]
        };

    case "REMOVE_PD_OFFLINE_LIST":
        return {
            ...state,
            pdOfflineList: removeObjectFromArray(action.payload,state.pdOfflineList)
        };

    case "UPDATE_PD_OFFLINE_LIST":
        return {
            ...state,
            pdOfflineList: updateObjectInArray(action.payload, state.pdOfflineList)
        };
    
    case "SET_CALF_BIRTH_OFFLINE_LIST":
        return {
            ...state,
            calfBirthOfflineList: [
                ...state.calfBirthOfflineList,
                action.payload
            ]
        };

    case "REMOVE_CALF_BIRTH_OFFLINE_LIST":
        return {
            ...state,
            calfBirthOfflineList: removeObjectFromArray(action.payload,state.calfBirthOfflineList)
        };

    case "UPDATE_CALF_BIRTH_OFFLINE_LIST":
        return {
            ...state,
            calfBirthOfflineList: updateObjectInArray(action.payload, state.calfBirthOfflineList)
        };
    
    case "SET_CATTLE_REGISTRATION_OFFLINE_LIST":
        return {
            ...state,
            cattleOfflineRegistration: [
                ...state.cattleOfflineRegistration,
                action.payload
            ]
        };

    case "REMOVE_CATTLE_REGISTRATION_OFFLINE_LIST":
        return {
            ...state,
            cattleOfflineRegistration: removeObjectFromArray(action.payload,state.cattleOfflineRegistration)
        };

    case "UPDATE_CATTLE_REGISTRATION_OFFLINE_LIST":
        return {
            ...state,
            cattleOfflineRegistration: updateObjectInArray(action.payload, state.cattleOfflineRegistration)
        };    

    case "SET_LOCATION" : 
        return{
            ...state,
            location : action.payload
        }        

    default:
        return state;
    }
};
