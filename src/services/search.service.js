import {fetchApi} from "./api";

// fetchApi(url, method, statusCode, payload, authtoken, loaderstate, promiseReturnType);

export const cattleSearchRequest = (payload, token) => {
    return fetchApi(`/api/cattles?q.equals=${payload}`, "GET", 200, null, token);
};

export const cattleScanRequest = (payload, token) => {
    return fetchApi(`/api/cattles?stellaCode.equals=${payload}`, "GET", 200, null, token);
};

export const someRequest = (payload, token) => {
};

export const dewormingSearchRequest = (payload, token) => {
    return fetchApi(`/api/dewormings?q.equals=${payload}`, "GET", 200, null, token);
};
