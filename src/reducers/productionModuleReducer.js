const initialState = {
    milkLogList: [],
    milkLogDetails: {},
    milkLogForDay: [],
    milkLogDetailsForDay: [],
    milkReferenceChart: []
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SET_MILKLOG_LIST":
        return {
            ...state,
            milkLogList: [
                ...state.milkLogList,
                ...action.payload
            ]
        };

    case "SET_MILKLOG_FOR_DAY":
        return {
            ...state,
            milkLogForDay: action.payload
        };

    case "SET_MILKLOG_DETAILS":
        return {
            ...state,
            milkLogDetails: action.payload
        };

    case "SET_MILKLOG_DETAILS_FOR_DAY":
        return {
            ...state,
            milkLogDetailsForDay: [
                ...state.milkLogDetailsForDay,
                action.payload
            ]
        };

    case "EMPTY_MILKLOG_DETAILS_FOR_DAY": {
        return {
            ...state,
            milkLogDetailsForDay: []
        };
    }

    case "EMPTY_MILKLOG_LIST":
        return {
            ...state,
            milkLogList: []
        };

    case "SET_MILK_REFERENCE_CHART":
        return {
            ...state,
            milkReferenceChart: action.payload
        };

    default:
        return state;
    }
};
