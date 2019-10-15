import {getNutritionClassification, logNutrition, getNutritionDetails} from "../services/nutritionModule.service";
import {fetchApi} from "../services/api";

export const getNutritionClassificationAction = (token, stellaCode) => (dispatch) => {
    return getNutritionClassification(token, stellaCode).then((payload) => {
        dispatch({type: "GET_NUTRITION_CLASSIFICATIONS", payload});
        return payload;
    }).catch((error) => {
        dispatch({type: "GET_NUTRITION_CLASSIFICATIONS", payload: {}});
        throw new Error(error);
    });
};

export const logNutritionAction = (token, payload) => (dispatch) => {
    return logNutrition(token, payload).then((data) => {
        dispatch({type: "LOG_NUTRITION", data});
        return data;
    }).catch((error) => {
        dispatch({type: "LOG_NUTRITION", payload: {}});
        throw new Error(error);
    });
};

export const getNutritionDetailsAction = (id, token) => (dispatch) => {
    return getNutritionDetails(id, token).then((data) => {
        dispatch({
            type: "SET_NUTRITION_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getNutritionListAction = (stellaCode, token, pageNo = 0, userId) => (dispatch) => {
    if (pageNo === 0) {
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    let url;
        if (stellaCode) {
            url = `/api/nutrition-logs?size=5&page=${pageNo}&cattleId.equals=${stellaCode}&userId.equals=${userId}&sort=createdDate,desc`;
        } else {
            url = `/api/nutrition-logs?size=5&page=${pageNo}&userId.equals=${userId}&sort=createdDate,desc`;
        }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_NUTRITION_LIST",
            payload: data
        });
        if (pageNo === 0) {
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        return data;
    }).catch((error) => {
        if (pageNo === 0) {
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        throw new Error(error);
    });
};
