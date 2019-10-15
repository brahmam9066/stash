const initialState = {
    userDetails: {},
    farmDetails: {}
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "SET_USER_DETAILS":
        return {
            ...state,
            userDetails: action.payload
        };

    case "SET_FARM_DETAILS":
        return {
            ...state,
            farmDetails: action.payload
        };

    default:
        return state;
    }

};
