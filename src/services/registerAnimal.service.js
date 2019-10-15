import {fetchApi} from "./api";

export const saveCattleProfileInfoRequest = (payload, token) => {
    return fetchApi("/api/cattles", "POST", 201, payload, token);
};

export const updateCattleProfileInfoRequest = (payload, token) => {
    return fetchApi("/api/cattles/profile-info", "PUT", 200, payload, token);
};

export const updateBreedingInfoRequest = (payload, token) => {
    return fetchApi("/api/cattles/breed-info", "PUT", 200, payload, token);
};

export const createPregnancyInfoRequest = (id, payload, token) => {
    return fetchApi(`/api/cattles/${id}/cattle-pregnancies`, "POST", 200, payload, token);
};

export const updatePregnancyInfoRequest = (id, payload, token) => {
    return fetchApi(`/api/cattles/${id}/cattle-pregnancies`, "PUT", 200, payload, token);
};

export const getMorphologicalConfigsRequest = (token) => {
    return fetchApi("/api/admin/cattle-morphology-configs", "GET", 200, null, token);
};

export const saveMorphologicalDetailsRequest = (payload, token) => {
    return fetchApi("/api/cattle-morphologies", "POST", 201, payload, token);
};

export const updateMorphologicalDetailsRequest = (payload, token) => {
    return fetchApi("/api/cattle-morphologies", "PUT", 200, payload, token);
};

export const getAnimalProfiledetailsRequest = (id, token) => {
    return fetchApi(`/api/cattles/${id}`, "GET", 200, null, token);
};

export const getCattlePregnancyDetailsRequest = (id, token) => {
    return fetchApi(`/api/cattles/${id}/cattle-pregnancies`, "GET", 200, null, token);
};

export const getCurrentPregnancyDetailsRequest = (id, token) => {
    return fetchApi(`/api/cattles/${id}/cattle-pregnancies/current`, "GET", 200, null, token);
};

export const getCattleInseminationDetailsRequest = (id, token) => {
    return fetchApi(`/api/inseminations?cattleId.equals=${id}`, "GET", 200, null, token);
};

export const getInseminationDetailsRequest = (id, token) => {
    return fetchApi(`/api/inseminations/${id}`, "GET", 200, null, token);
};

export const getMorphologicalCurrentRequest = (stellaCode, token) => {
    return fetchApi(`/api/cattle-morphologies?cattleId.equals=${stellaCode}&sort=measurementDate,desc&page=0&size=1`, "GET", 200, null, token);
};

export const getMorphologicalDetailsRequest = (id, token) => {
    return fetchApi(`/api/cattle-morphologies/${id}`, "GET", 200, null, token);
};

export const getMorphologicalListRequest = (token, pageNo = 0, cattleId) => {
    if (cattleId) {
        return fetchApi(`/api/cattle-morphologies?cattleId.equals=${cattleId}&sort=measurementDate,desc&page=${pageNo}&size=5`, "GET", 200, null, token);
    }
    return fetchApi(`/api/cattle-morphologies?page=${pageNo}&size=5&sort=measurementDate,desc`, "GET", 200, null, token);
};

export const getOrgTypeRequest = (token) => {
    return fetchApi("/api/org-types", "GET", 200, null, token);
};

export const searchOrgRequest = (searchType, searchString, token) => {
    return fetchApi(`/api/orgs?orgType.equals=${searchType}&q.equals=${searchString}`, "GET", 200, null, token);
};

export const getAllOrgRequest = (token) => {
    return fetchApi(`/api/orgs`, "GET", 200, null, token);
};

export const createDryOffRequest = (id, payload, token) => {
    return fetchApi(`/api/cattles/${id}/dry-off`, "PUT", 200, payload, token);
};
