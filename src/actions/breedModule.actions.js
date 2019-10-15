import {Dimensions} from 'react-native';
const {height} = Dimensions.get("window");

import {fetchApi} from "../services/api";


export const createAIAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/inseminations/", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_AI_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_AI_OFFLINE_LIST",
            payload: payload._id ? payload._id : ""
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};

export const getAIListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
    let size = 5;
    if(height < 700){        
        size = 5;
    } 
    if(height > 700){          
        size = 10;
    }
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    let url = `/api/inseminations?size=${size}&page=${pageNo}&projection=InseminationListDTO&sort=inseminationDate,desc`;
    if (stellaCode) {
        url = `/api/inseminations?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=InseminationListDTO&sort=inseminationDate,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_AI_LIST",
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

export const getAIDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/inseminations/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_AI_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const createPDAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/pd-inspections", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_PD_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_PD_OFFLINE_LIST",
            payload: payload._id ? payload._id : ""
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};

export const getPDListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
    let size = 5;
    if(height < 700){        
        size = 5;
    } 
    if(height > 700){          
        size = 10;
    }
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    let url = `/api/pd-inspections?size=${size}&page=${pageNo}&projection=PDInspectionListDTO&sort=actualDate,desc`;
    if (stellaCode) {
        url = `/api/pd-inspections?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=PDInspectionListDTO&sort=actualDate,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_PD_LIST",
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

export const getPDDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/pd-inspections/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_PD_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};


export const getCalfBirthListAction = (id, token, pageNo = 0) => (dispatch) => {
    const url = `/api/cattles?motherId.equals=${id}&size=5&page=${pageNo}&sort=createdDate,desc`;
    // if (stellaCode) {
    //     url = `/api/cattles?size=5&page=${pageNo}&q.equals=${stellaCode}`;
    // }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_CALFBIRTH_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};


export const getCalfBirthDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/cattles/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_CALFBIRTH_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const createCalfbirthAction = (cattleId, payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi(`/api/cattles/${cattleId}/pregnancy-delivery`, "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_CALFBIRTH_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_CALF_BIRTH_OFFLINE_LIST",
            payload: payload._id ? payload._id :""
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};

export const updateCalfProfileInfoAction = (payload, token) => (dispatch) => {
    return fetchApi("/api/cattles/profile-info", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_CALFBIRTH_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "SET_CALFBIRTH_DETAILS",
            payload: {}
        });
        throw new Error(error);
    });
};

export const createBCSAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/body-condition-scores", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_BCS_DETAILS",
            payload: data
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};


export const getBCSDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/body-condition-scores/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_BCS_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};


export const updateBCSAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/body-condition-scores/", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_BCS_DETAILS",
            payload: data
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        console.log("update", payload);
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};


export const getBcsListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
    let size = 5;
    if(height < 700){        
        size = 5;
    } 
    if(height > 700){          
        size = 10;
    }
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    let url = `/api/body-condition-scores?size=${size}&page=${pageNo}&sort=measurementDate,desc&projection=BodyConditionScoreListDTO`;
    if (stellaCode) {
        url = `/api/body-condition-scores?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=BodyConditionScoreListDTO&sort=createdDate,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_BCS_LIST",
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


export const createBWMAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/body-weights", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_BWM_DETAILS",
            payload: data
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};


export const getBwmListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
    let size = 5;
    if(height < 700){        
        size = 5;
    } 
    if(height > 700){          
        size = 10;
    }
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    let url = `/api/body-weights?size=${size}&page=${pageNo}&sort=measurementDate,desc&projection=BodyWeightsDTO`;
    if (stellaCode) {
        url = `/api/body-weights?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=BodyWeightsDTO&sort=measurementDate,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_BWM_LIST",
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


export const getBWMDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/body-weights/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_BWM_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};


export const updateBWMAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/body-weights", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_BWM_DETAILS",
            payload: data
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        console.log("update", payload);
        return data;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};

export const getPregnancyList = (id, token, pageNo = 0) => (dispatch) => {
    const url = `/api/cattles/${id}/cattle-pregnancies?size=5&page=${pageNo}&sort=createdDate,desc`;
    // if (stellaCode) {
    //     url = `/api/cattles/CattleID/cattle-pregnancies?size=5&page=${pageNo}&sort=createdDate,desc`;
    // }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_PREGNANCY_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getPregnancyHistoryDetails = (id, pregnancyId, token) => (dispatch) => {
    const url = `/api/cattles/${id}/cattle-pregnancies/${pregnancyId}`;
    // if (stellaCode) {
    //     url = `/api/cattles/CattleID/cattle-pregnancies?size=5&page=${pageNo}&sort=createdDate,desc`;
    // }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_PREGNANCY_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};
