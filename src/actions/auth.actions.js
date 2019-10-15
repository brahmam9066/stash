import {fetchApi} from "../services/api";

export const setUserLoggedInAction = payload => ({type: "USER_LOGGEDIN", payload});

export const setLoader = payload => ({type: "LOADERER", payload});

export const changePasswordAction = (payload,token) => () => 
    fetchApi("/api/account/change-password", "POST", 200, payload, token, false, "text").then((data) => {
        return data;
    }).catch((error) => {
        throw new Error(error);
});