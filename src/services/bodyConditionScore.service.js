import {fetchApi} from "./api";

const apiUrl = "/api/body-condition-scores";

export const getBodyConditionScoreList = async (token, page, size) => {
    const url = `${apiUrl}` +
        `${page === null && size !== null ? `?page=${page}` : ""}` +
        `${size === null && page !== null ? `?size=${size}` : ""}` +
        `${size !== null && page !== null ? `?page=${page}&size=${size}` : ""}`;
    return fetchApi(url, "GET", 200, null, token);
};

export const getBodyConditionScoreEntity = async (token, id) => {
    const url = `${apiUrl}/${id}`;
    return fetchApi(url, "GET", 200, null, token);
};

export const createBodyConditionScoreEntity = async (token, data) => {
    return fetchApi(apiUrl, "POST", 200, data, token);
};

export const updateBodyConditionScoreEntity = async (token, data) => {
    return fetchApi(apiUrl, "PUT", 200, data, token);
};

export const deleteBodyConditionScoreEntity = async (token, id) => {
    const url = `${apiUrl}/${id}`;
    return fetchApi(url, "DELETE", 200, null, token);
};
