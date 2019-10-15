import {fetchApi} from "./api";

// fetchApi(url, method, statusCode, payload, authtoken, loaderstate, promiseReturnType);

export const updateUserDetails = async (payload, token) => {
    return fetchApi("/api/account", "POST", 200, payload, token, false, null);
};

export const getUserAccountDetails = async (token) => {
    return fetchApi("/api/account", "GET", 200, null, token);
};

export const farmProfileRegistrationRequest = async (payload, token) => {
    return fetchApi("/api/orgs", "POST", 201, payload, token);
};

export const farmProfileUpdateRequest = async (payload, token) => {
    return fetchApi("/api/orgs", "PUT", 200, payload, token);
};

export const getFarmProfileDetails = async (orgId, token) => {
    return fetchApi(`/api/orgs/${orgId}`, "GET", 200, null, token);
};
