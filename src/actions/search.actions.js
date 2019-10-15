import {cattleSearchRequest, cattleScanRequest} from "../services/search.service";
import {fetchApi} from "../services/api";

export const cattleSearchAction = (payload, token, url) => (dispatch) => {
    if (payload.length > 2) {
        return cattleSearchRequest(payload, token).then((data) => {
            const cattleList = [];
            data.map((cattle) => {
                if (cattle.stellaCode) {
                    cattleList.push(cattle);
                }
                return null;
            });
            dispatch({
                type: "SET_SEARCH_LIST",
                payload: cattleList.slice(0, cattleList.length < 5 ? cattleList.length : 5)
            });
            return cattleList;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    dispatch({
        type: "SET_SEARCH_LIST",
        payload: []
    });
    return [];
};

export const handleScanSearch = (payload, token, url) => (dispatch) => {
    if (payload.length > 2) {
        return cattleScanRequest(payload, token).then((data) => {
            dispatch({
                type: "SET_SEARCH_LIST",
                payload: data.slice(0, 5)
            });
            return data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    dispatch({
        type: "SET_SEARCH_LIST",
        payload: []
    });
    return [];
};

export const orgSearchAction = (token, payload, pageNo = 0, isSetSearch = false) => (dispatch) => {
    if ( isSetSearch && payload.length === 0) {
        dispatch({
            type: "SET_SEARCH_LIST",
            payload: [{stellaCode: "Search for farms near you"}]
        });
        return;
    } else if (payload.length > 0) {
        url = `/api/orgs?size=5&page=${pageNo}&q.equals=${payload}`;
        return fetchApi(url, "GET", 200, null, token).then((data) => {
            dispatch({
                type: "SET_SEARCH_LIST",
                payload: data
            });
            return data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    dispatch({
        type: "SET_SEARCH_LIST",
        payload: []
    });
};
