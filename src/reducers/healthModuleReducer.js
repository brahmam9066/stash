const initialState = {
    cattleHealthMetaData: {},
    observationRecordData: {},
    treatmentList: [],
    medicineList: [],
    prescriptionList: [],
    treatmentDetails: {},
    prescriptionDetails: {},
    isEditPrescriptionDetails: false,
    vaccineList: [],
    vaccinationRecordData: {},
    vaccinationList: [],
    vaccinationDetails: {},
    dehorningDetails: {},
    dehorningList: [],
    dewormingList: [],
    dewormingDetails: {},
    dewormerList: []
};

const removeObjectFromArray = (uniqueId, array) => {
    return array.filter(item => (item.uniqueId !== uniqueId));
};

const updateObjectInArray = (payload, array) => {
    return array.map((item) => {
        if (item.uniqueId === payload.uniqueId) {
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

    case "SET_HEALTH_METADATA":
        return {
            ...state,
            cattleHealthMetaData: action.payload
        };

    case "SET_TREATMENT_LIST":
        return {
            ...state,
            treatmentList: [
                ...state.treatmentList,
                ...action.payload
            ]
        };

    case "EMPTY_TREATMENT_LIST":
        return {
            ...state,
            treatmentList: []
        };

    case "SET_TREATMENT_DETAILS":
        return {
            ...state,
            observationRecordData: action.payload
        };

    case "SET_DEWORMING_LIST":
        return {
            ...state,
            dewormingList: [
                ...state.dewormingList,
                ...action.payload
            ]
        };

    case "EMPTY_DEWORMING_LIST":
        return {
            ...state,
            dewormingList: []
        };

    case "SET_DEWORMING_DETAILS":
        return {
            ...state,
            dewormingDetails: action.payload
        };

    case "SET_PRESCRIPTION":
        return {
            ...state,
            prescriptionList: [
                ...state.prescriptionList,
                action.payload
            ]
        };

    case "REMOVE_PRESCRIPTION":
        return {
            ...state,
            prescriptionList: removeObjectFromArray(action.uniqueId, state.prescriptionList)
        };

    case "EMPTY_PRESCRIPTION":
        return {
            ...state,
            prescriptionList: []
        };

    case "SET_PRESCRIPTION_DETAILS":
        return {
            ...state,
            prescriptionDetails: action.payload
        };

    case "EDIT_PRESCRIPTION_DETAILS":
        return {
            ...state,
            isEditPrescriptionDetails: action.payload
        };

    case "UPDATE_PRESCRIPTION_DETAILS":
        return {
            ...state,
            prescriptionList: updateObjectInArray(action.payload, state.prescriptionList)
        };

    case "SET_VACCINATION_LIST":
        return {
            ...state,
            vaccinationList: [
                ...state.vaccinationList,
                ...action.payload
            ]
        };

    case "EMPTY_VACCINATION_LIST":
        return {
            ...state,
            vaccinationList: []
        };

    case "SET_VACCINATION_DETAILS":
        return {
            ...state,
            vaccinationDetails: action.payload
        };

    case "SET_DEHORNING_DETAILS":
        return {
            ...state,
            dehorningDetails: action.payload
        };

    case "SET_DEHORNING_LIST":
        return {
            ...state,
            dehorningList: [
                ...state.dehorningList,
                ...action.payload
            ]
        };

    case "EMPTY_DEHORNING_LIST":
        return {
            ...state,
            dehorningList: []
        };

        case "SET_MEDICINE_LIST":
        return {
            ...state,
            medicineList: action.payload
        };

    case "EMPTY_MEDICINE_LIST":
        return {
            ...state,
            medicineList: []
        };

        case "SET_VACCINE_LIST":
        return {
            ...state,
            vaccineList: action.payload
        };
        
    case "EMPTY_VACCINE_LIST":
        return {
            ...state,
            vaccineList: []
        };

    case "SET_DEWORMER_LIST":
        return {
            ...state,
            dewormerList: action.payload
        };

    case "EMPTY_DEWORMER_LIST":
        return {
            ...state,
            dewormerList: []
        };

    default:
        return state;
    }
};
