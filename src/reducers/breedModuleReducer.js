const initialState = {
    AIList: [],
    PDList: [],
    bcsList: [],
    bwmList: [],
    calfBirthList: [],
    aIDetails: {},
    PDDetails: {},
    calfBirthDetails: {},
    bcsDetails: {},
    bwmDetails: {},
    pregnancyList: [],
    pregnancyDetials: {}
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SET_AI_LIST":
        return {
            ...state,
            AIList: [
                ...state.AIList,
                ...action.payload
            ]
        };

    case "SET_AI_DETAILS":
        return {
            ...state,
            aIDetails: action.payload
        };

    case "EMPTY_AI_LIST":
        return {
            ...state,
            AIList: []
        };

    case "SET_PD_LIST":
        return {
            ...state,
            PDList: [
                ...state.PDList,
                ...action.payload
            ]
        };

    case "SET_PD_DETAILS":
        return {
            ...state,
            PDDetails: action.payload
        };

    case "EMPTY_PD_LIST":
        return {
            ...state,
            PDList: []
        };

    case "SET_CALFBIRTH_LIST":
        return {
            ...state,
            calfBirthList: [
                ...state.calfBirthList,
                ...action.payload
            ]
        };

    case "SET_CALFBIRTH_DETAILS":
        return {
            ...state,
            calfBirthDetails: action.payload
        };

    case "EMPTY_CALFBIRTH_LIST":
        return {
            ...state,
            calfBirthList: []
        };

    case "SET_BCS_DETAILS":
        return {
            ...state,
            bcsDetails: action.payload
        };

    case "SET_BCS_LIST":
        return {
            ...state,
            bcsList: [
                ...state.bcsList,
                ...action.payload
            ]
        };

    case "EMPTY_BCS_LIST":
        return {
            ...state,
            bcsList: []
        };

    case "SET_BWM_DETAILS":
        return {
            ...state,
            bwmDetails: action.payload
        };

    case "SET_BWM_LIST":
        return {
            ...state,
            bwmList: [
                ...state.bwmList,
                ...action.payload
            ]
        };

    case "EMPTY_BWM_LIST":
        return {
            ...state,
            bwmList: []
        };
    case "SET_PREGNANCY_LIST":
        return {
            ...state,
            pregnancyList: [
                ...action.payload
            ]
        };

    case "EMPTY_PREGNANCY_LIST":
        return {
            ...state,
            pregnancyList: []
        };

    case "SET_PREGNANCY_DETAILS":
        return {
            ...state,
            pregnancyDetials: {
                ...action.payload
            }
        };

    default:
        return state;
    }
};
