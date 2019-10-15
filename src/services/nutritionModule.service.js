import {fetchApi} from "./api";

export const logNutrition = async (token, payload) => {
    return fetchApi("/api/nutrition-logs/", "POST", 201, payload, token);
};

export const getNutritionClassification = async (token, stellaCode) => {
    return fetchApi(`/api/nutrition-feed-classifications/find?stellaCode=${stellaCode}`, "GET", 200, null, token);
};

export const getNutritionDetails = async (id, token) => {
    return fetchApi(`/api/nutrition-logs/${id}`, "GET", 200, null, token);
};
