const initialState = {
    scannerResult: "",
    searchList: [],
    loaderer : false
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SCANNER_RESULT":
        return {
            ...state,
            scannerResult: action.payload
        };

    case "SET_SEARCH_LIST":
        return {
            ...state,
            searchList: action.payload
        };

    case "EMPTY_SEARCH_LIST":
        return {
            ...state,
            searchList: []
        };
    case "LOADERER":
        return {
            ...state,
            loaderer: action.payload
        };    

    default:
        return state;
    }

};
