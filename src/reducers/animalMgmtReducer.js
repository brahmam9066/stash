const initialState = {
    cattlesMetadata: {},
    errorText: {},
    animalDetails: {},
    morphologicalConfigs: [],
    cattlePregnancyDetails: [],
    cattlePregnancyCurrentDetails: {},
    cattleInseminationDetails: [],
    inseminationDetails: {},
    morphologicalList: [],
    morphologicalDetails: {},
    morphologicalCurrentDetails: {},
    animalList: [],
    calfList: [],
    calfDetails: {},
    orgTypes: [],
    orgNameList: [],
    currentInsemination: {},
    farmList: [],
    farmDetails: {},
    nearMeFarmList: [],
    nearMeFarmDetails: {}
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "CATTLES_METADATA":
        return {
            ...state,
            cattlesMetadata: action.cattlesMetadata,
            errorText: action.errorText
        };

    case "SET_ANIMAL_DETAILS":
        return {
            ...state,
            animalDetails: action.payload
        };

    case "SET_MORPHOLOGICAL_CONFIGS":
        return {
            ...state,
            morphologicalConfigs: action.payload
        };

    case "SET_CATTLE_PREGNANCY_DETAILS":
        return {
            ...state,
            cattlePregnancyDetails: action.payload
        };

    case "SET_CURRENT_INSEMINATION":
        return {
            ...state,
            currentInsemination: action.payload
        };

    case "SET_CURRENT_CATTLE_PREGNANCY_DETAILS":
        return {
            ...state,
            currentCattlePregnancyDetails: action.payload
        };

    case "SET_CATTLE_PREGNANCY_CURRENT_DETAILS":
        return {
            ...state,
            cattlePregnancyCurrentDetails: action.payload
        };

    case "SET_CATTLE_INSEMINATION_DETAILS":
        return {
            ...state,
            cattleInseminationDetails: action.payload
        };

    case "SET_INSEMINATION_DETAILS":
        return {
            ...state,
            inseminationDetails: action.payload
        };

    case "SET_MORPHOLOGICAL_LIST":
        return {
            ...state,
            morphologicalList: [
                ...state.morphologicalList,
                ...action.payload
            ]
        };

    case "EMPTY_MORPHOLOGICAL_LIST":
        return {
            ...state,
            morphologicalList: []
        };

    case "SET_MORPHOLOGICAL_DETAILS":
        return {
            ...state,
            morphologicalDetails: action.payload
        };

    case "SET_MORPHOLOGICAL_CURRENT_DETAILS":
        return {
            ...state,
            morphologicalCurrentDetails: action.payload
        };

    case "SET_ANIMAL_LIST":
        return {
            ...state,
            animalList: [
                ...state.animalList,
                ...action.payload
            ]
        };

    case "EMPTY_ANIMAL_LIST":
        return {
            ...state,
            animalList: []
        };

    case "SET_CALF_LIST":
        return {
            ...state,
            calfList: [
                ...state.calfList,
                ...action.payload
            ]
        };

    case "EMPTY_CALF_LIST":
        return {
            ...state,
            calfList: []
        };

    case "SET_CALF_DETAILS":
        return {
            ...state,
            calfDetails: action.payload
        };

    case "SET_ORG_TYPES":
        return {
            ...state,
            orgTypes: action.payload
        };

    case "ORG_NAME_LIST":
        return {
            ...state,
            orgNameList: action.payload
        };

    case "EMPTY_ORG_NAME_LIST":
        return {
            ...state,
            orgNameList: []
        };

    case "SET_FARM_LIST":
        return {
            ...state,
            farmList: [
                ...state.farmList,
                ...action.payload
            ]
        }

    case "SET_FARM_DETAILS_ANIMAL_MANAGEMENT":
        return {
            ...state,
            farmDetails: action.payload
        }

    case "EMPTY_FARM_LIST":
        return {
            ...state,
            farmList: []
        }

    default:
        return state;
    }

};
