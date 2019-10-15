const initialState = {
    cattleHealthMetaData: {},
    orgConfiguration: [],
    medicineList: [],
    vaccineList: [],
    dewormerList:[],
    cattlesMetadata: {},
    orgTypes:[]
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SET_HEALTH_METADATA":
        return {
            ...state,
            cattleHealthMetaData: action.payload
        };

    case "SET_ORG_CONFIG":
        return {
            ...state,
            orgConfiguration: action.payload
        };

    case "SET_LOOKUPDATE_MEDICINE_LIST":
        return {
            ...state,
            medicineList: action.payload
        };

    case "SET_LOOKUPDATE_VACCINE_LIST":
        return {
            ...state,
            vaccineList: action.payload
        };
    
    case "SET_LOOKUPDATE_DEWORMER_LIST":
        return {
            ...state,
            dewormerList: action.payload
        }
     
    case "CATTLES_METADATA":
        return {
            ...state,
            cattlesMetadata: action.cattlesMetadata,
            errorText: action.errorText
        };
    case "SET_ORG_TYPES":
        return {
            ...state,
            orgTypes: action.payload
        };
    case "SET_OFFLINE_ORG_TYPES":
        return{
            ...state,
            offlineOrgTypes : action.payload
        }            

    default:
        return state;
    }
};
