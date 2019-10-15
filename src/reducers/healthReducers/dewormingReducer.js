import {
    SET_DEWORMING_LIST,
    SET_DEWORMING_DETAILS
} from "../../actions/action-types";

const initialState = {
    dewormingList: [],
    dewormingRecordData: {}
};

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_DEWORMING_LIST:
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

    case SET_DEWORMING_DETAILS:
        return {
            ...state,
            dewormingRecordData: action.payload
        };
    default:
        return state;
    }
};
