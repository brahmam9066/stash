import {fetchApi} from "./api";

const apiUrl = "/api/body-weights";

export const getBodyWeightManagementList = async (token, page, size) => {
    const url = `${apiUrl}` +
        `${page === null && size !== null ? `?page=${page}` : ""}` +
        `${size === null && page !== null ? `?size=${size}` : ""}` +
        `${size !== null && page !== null ? `?page=${page}&size=${size}` : ""}`;
    return fetchApi(url, "GET", 200, null, token);
};

export const getBodyWeightManagementEntity = async (token, id) => {
    const url = `${apiUrl}/${id}`;
    return fetchApi(url, "GET", 200, null, token);
};

export const createBodyWeightManagementEntity = async (token, data) => {
    return fetchApi(apiUrl, "POST", 201, data, token);
};

export const updateBodyWeightManagementEntity = async (token, data) => {
    return fetchApi(apiUrl, "PUT", 200, data, token);
};

export const deleteBodyWeightManagementEntity = async (token, id) => {
    const url = `${apiUrl}/${id}`;
    return fetchApi(url, "DELETE", 200, null, token);
};
