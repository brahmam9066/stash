const initialState = {
    userDetails: null,
    token: null,
    username: null,
    isLoggedIn: false
};

export default (state = initialState, action) => {

    switch (action.type) {

    case "USER_LOGGEDIN":
        return {
            ...state,
            isLoggedIn: true,
            token: action.payload.token,
            username: action.payload.username
        };

    case "LOGOUT_USER":
        return {
            ...state,
            token: null,
            username: null,
            isPassword: false,
            isLoggedIn: false,
            userDetails: null
        };

    default:
        return state;
    }

};
