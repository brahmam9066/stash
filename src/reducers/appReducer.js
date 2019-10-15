const initialState = {
    errors: [],
    isServerError: false,
    isInternetConnected: false
};

const removeObjectFromArray = (error, array) => {
    return array.filter(item => (item.title !== error.title));
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SERVER_ERROR":
        return {
            ...state,
            isServerError: action.isServerError,
            errors: [
                ...state.errors,
                action.payload
            ]
        };

    case "REMOVE_ERROR":
        return {
            ...state,
            errors: [],
            isServerError: false
        };

    case "INTERNET_STATUS":
        return {
            ...state,
            isInternetConnected: action.payload
        };

    default:
        return state;
    }

};
