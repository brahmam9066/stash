const initialState = {
    activeRoute: "dashboard"
};

export default (state = initialState, action) => {
    switch (action.type) {
    case "SET_ACTIVE_ROUTE":
        return {
            ...state,
            activeRoute: action.payload
        };
    case "RESET_ROUTE":
        return initialState;
    default:
        return state;
    }
};
