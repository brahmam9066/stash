import {getUserAccountDetails, getFarmProfileDetails, updateUserDetails, farmProfileUpdateRequest, farmProfileRegistrationRequest} from "../services/farmAdmin.service";

export const getUserDetailsAction = token => (dispatch) => {
    return getUserAccountDetails(token).then((payload) => {
        dispatch({type: "SET_USER_DETAILS", payload});
        return payload;
    }).catch((error) => {
        // dispatch({type: "SET_USER_DETAILS", payload: {}});
        throw new Error(error);
    });
};

export const getFarmDetailsAction = (orgId, token) => (dispatch) => {
    return getFarmProfileDetails(orgId, token).then((payload) => {
        const data = {
            ...payload,
            ...payload.addresses[0]
        };
        dispatch({type: "SET_FARM_DETAILS", payload: data});
        return payload;
    }).catch((error) => {
        console.log(error);
    });
};

export const updateUserDetailsActions = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return updateUserDetails(payload, token).then(() => {
        console.log(payload);
        return getUserAccountDetails(token);
    }).then((data) => {
        dispatch({type: "SET_USER_DETAILS", payload});
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return data;
    }).catch(() => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        // dispatch({type: "SET_FARM_DETAILS", payload: {}});
    });
};

export const farmProfileUpdateAction = (orgId, payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return farmProfileUpdateRequest(payload, token).then(() => {
        return getFarmProfileDetails(orgId, token);
    }).then((resData) => {
        const data = {
            ...resData,
            ...resData.addresses[0]
        };
        dispatch({type: "SET_FARM_DETAILS", payload: data});
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return payload;
    }).catch(() => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        // dispatch({type: "SET_FARM_DETAILS", payload: {}});
    });
};

export const farmProfileCreateAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return farmProfileRegistrationRequest(payload, token).then((data) => {
        return getFarmProfileDetails(data.rootOrgId, token);
    }).then((resData) => {
        const data = {
            ...resData,
            ...resData.addresses[0]
        };
        dispatch({type: "SET_FARM_DETAILS", payload: data});
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return payload;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        console.log(error);
        // dispatch({type: "SET_FARM_DETAILS", payload: {}});
    });
};
