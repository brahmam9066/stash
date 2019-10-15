const initialState = {
    language: "en"
};

export default (state = initialState, action) => {

    switch (action.type) {
    case "SET_LANGUAGE":
        return {
            ...state,
            language: action.payload
        };
    case "RESET_LANGUAGE":
        return {
            ...state
        };
    default:
        return state;
    }

};
