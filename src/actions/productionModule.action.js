import moment from "moment";
import {fetchApi} from "../services/api";

export const getMilkLogListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    let url = `/api/milk-collections?projection=milkcollectionDTO&size=5&page=${pageNo}&sort=collectedOn,desc`;
    if (stellaCode) {
        url = `/api/milk-collections?projection=milkcollectionDTO&size=5&page=${pageNo}&q.equals=${stellaCode}&sort=collectedOn,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_MILKLOG_LIST",
            payload: data
        });
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        return data;
    }).catch((error) => {
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        throw new Error(error);
    });
};

export const createMilkLogAction = (payload, token) => (dispatch) => {
    return fetchApi("/api/milk-collections/", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_MILKLOG_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const updateMilkLogAction = (payload, token) => (dispatch) => {
    return fetchApi("/api/milk-collections/", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_MILKLOG_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getMilkLogForDayAction = (stellaCode, from, token) => (dispatch) => {
    let hours = parseInt(from.substr(11, 2));
    let minutes = parseInt(from.substr(14, 2));

    let refDate = moment.utc(from);

    if((hours * 60 + minutes) * 60 <= 66600) {
        refDate = refDate.subtract(1, 'days');
        console.log("here I'm")
    }

    fromDate = `${refDate.format("YYYY-MM-DD")}T18:30:00Z`;
    const toDate = `${refDate.add(1, 'day').format("YYYY-MM-DD")}T18:30:00Z`;
    
    const url = "/api/milk-collections?projection=milkcollectionDTO&size=5&page=0&sort=collectedOn,desc" +
        `&q.equals=${stellaCode}` +
        `&collectedOnFrom.greaterOrEqualThan=${fromDate}&collectedOnTo.lessOrEqualThan=${toDate}`;
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_MILKLOG_FOR_DAY",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const pushToMilkLogForDayDetails = milkLog => dispatch => dispatch({
    type: "SET_MILKLOG_DETAILS_FOR_DAY",
    payload: milkLog
});

export const getMilkLogDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/milk-collections/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_MILKLOG_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getMilkReferenceChartAction = (token) => (dispatch) => {
    return fetchApi(`/api/admin/milk-reference-charts`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_MILK_REFERENCE_CHART",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};
