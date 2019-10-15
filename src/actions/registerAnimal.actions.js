import moment from "moment";

import {fetchApi} from "../services/api";
import {
    updateBreedingInfoRequest,
    saveCattleProfileInfoRequest,
    updateCattleProfileInfoRequest,
    updatePregnancyInfoRequest,
    createPregnancyInfoRequest,
    getMorphologicalConfigsRequest,
    saveMorphologicalDetailsRequest,
    getAnimalProfiledetailsRequest,
    getCattlePregnancyDetailsRequest,
    getMorphologicalCurrentRequest,
    getCattleInseminationDetailsRequest,
    getInseminationDetailsRequest,
    getOrgTypeRequest,
    getAllOrgRequest,
    searchOrgRequest,
    getMorphologicalListRequest,
    getMorphologicalDetailsRequest,
    updateMorphologicalDetailsRequest,
    createDryOffRequest
} from "../services/registerAnimal.service";

export const getCattlesMetaDataAction = token => (dispatch) => {
    fetchApi("/api/cattles/metadata", "GET", 200, null, token).then((payload) => {
        dispatch({
            type: "CATTLES_METADATA",
            cattlesMetadata: payload,
            errorText: ""
        });
    }).catch((error) => {
        dispatch({
            type: "CATTLES_METADATA",
            cattlesMetadata: {},
            errorText: error
        });
        throw new Error(error);
    });
};

export const createCattleProfileInfoAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return saveCattleProfileInfoRequest(payload, token).then((data) => {
        
        console.log("response on create", data);
        dispatch({
            type: "SET_ANIMAL_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_CATTLE_REGISTRATION_OFFLINE_LIST",
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
        dispatch({
            type: "SET_ANIMAL_DETAILS",
            payload: {}
        });
        throw new Error(error);
    });
};

export const updateCattleProfileInfoAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return updateCattleProfileInfoRequest(payload, token).then((data) => {
        console.log("response on edit", data);
        dispatch({
            type: "SET_ANIMAL_DETAILS",
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
        dispatch({
            type: "SET_ANIMAL_DETAILS",
            payload: {}
        });
        throw new Error(error);
    });
};

export const getMorphologicalListAction = (token, pageNo = 0, cattleId) => (dispatch) => {
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    return getMorphologicalListRequest(token, pageNo, cattleId).then((data) => {
        dispatch({
            type: "SET_MORPHOLOGICAL_LIST",
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
        dispatch({
            type: "SET_MORPHOLOGICAL_LIST",
            payload: []
        });
        throw new Error(error);
    });
};

export const getMorphologicalDetailsAction = (id, token) => (dispatch) => {
    return getMorphologicalDetailsRequest(id, token).then((data) => {
        dispatch({
            type: "SET_MORPHOLOGICAL_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getMorphologicalConfigsAction = token => (dispatch) => {
    return getMorphologicalConfigsRequest(token).then((data) => {
        dispatch({
            type: "SET_MORPHOLOGICAL_CONFIGS",
            payload: data
        });
        return data;
    }).catch((error) => {
        dispatch({
            type: "SET_MORPHOLOGICAL_CONFIGS",
            payload: []
        });
        throw new Error(error);
    });
};

export const saveMorphologicalDetailsAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return saveMorphologicalDetailsRequest(payload, token).then((data) => {
        dispatch({
            type: "SET_MORPHOLOGICAL_DETAILS",
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

export const updateMorphologicalDetailsAction = (payload, token) => (dispatch) => {
    return updateMorphologicalDetailsRequest(payload, token).then((data) => {
        dispatch({
            type: "SET_MORPHOLOGICAL_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const updateBreedingInfoAction = (payloadBreeding, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return updateBreedingInfoRequest(payloadBreeding, token).then((values) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return values;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};

export const createPregnancyInfoAction = (id, payloadPregnancy, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return createPregnancyInfoRequest(id, payloadPregnancy, token).then((values) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        console.log("post", values);
        return values;
    }).catch((error) => {
        dispatch({
            type: "LOADERER",
            payload: false
        });
        throw new Error(error);
    });
};

export const updatePregnancyInfoAction = (id, payloadPregnancy, token) => (dispatch) => {
    return updatePregnancyInfoRequest(id, payloadPregnancy, token).then((values) => {
        return values;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getAnimalProfiledetailsAction = (id, token) => (dispatch) => {
    return getAnimalProfiledetailsRequest(id, token).then((data) => {
        dispatch({
            type: "SET_ANIMAL_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getCattlePregnancyDetailsAction = (id, token) => (dispatch) => {
    return getCattlePregnancyDetailsRequest(id, token).then((data) => {
        let recentPregDetails = "";
        let recentToDate = "";
        data.forEach((pd) => {
            if (recentToDate === "") {
                recentToDate = moment(pd.toDate);
            }
            if (recentToDate) {
                const toDate = moment(pd.toDate);
                const diff = toDate.diff(recentToDate);
                if (diff >= 0) {
                    recentToDate = moment(pd.toDate);
                    recentPregDetails = pd;
                }
            }
        });

        console.log(recentPregDetails, "recentPregDetails");

        dispatch({
            type: "SET_CATTLE_PREGNANCY_DETAILS",
            payload: recentPregDetails !== "" ? [recentPregDetails] : []
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getCattleRecentPregnancyDetailsAction = (id, token) => (dispatch) => {
    return getCattlePregnancyDetailsRequest(id, token).then((data) => {
        const pregDetails = data.filter(pd => (pd.toDate === null));
        if (pregDetails.length > 0 && pregDetails[0].inseminations && pregDetails[0].inseminations.length > 0) {
            let insemination = "";
            let recentInseminationDate = "";
            pregDetails[0].inseminations.forEach((insem) => {
                if (recentInseminationDate === "") {
                    recentInseminationDate = moment(insem.inseminationDate);
                }
                if (recentInseminationDate) {
                    const inseminationDate = moment(insem.inseminationDate);
                    const diff = inseminationDate.diff(recentInseminationDate);
                    if (diff >= 0) {
                        recentInseminationDate = moment(insem.toDate);
                        insemination = insem;
                    }
                }
            });
            pregDetails[0].inseminations = [insemination];
            console.log("pregDetails-2", pregDetails);
            dispatch({
                type: "SET_CATTLE_PREGNANCY_DETAILS",
                payload: pregDetails
            });
        } else {
            dispatch({
                type: "SERVER_ERROR",
                isServerError: true,
                payload: {title: "Cattle does't contain active insemination record"}
            });
        }
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};


export const getCurrentInseminationAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/cattles/${id}/inseminations/current`, "GET", 200, null, token).then((data) => {
        console.log(data);
        dispatch({
            type: "SET_CURRENT_INSEMINATION",
            payload: data
        });
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getCattlePregnancyDetailsCurrentAction = (id, token) => (dispatch) => {
    return getCattlePregnancyDetailsRequest(id, token).then((data) => {
        if (data.length !== 0) {
            let payload = {};
            data.map((cattlePregnency) => {
                if (cattlePregnency.toDate === null) {
                    payload = cattlePregnency;
                }
                return null;
            });
            dispatch({
                type: "SET_CATTLE_PREGNANCY_CURRENT_DETAILS",
                payload
            });
        } else {
            dispatch({
                type: "SET_CATTLE_PREGNANCY_CURRENT_DETAILS",
                payload: {}
            });
        }
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getCattleInseminationDetailsAction = (id, token) => (dispatch) => {
    return getCattleInseminationDetailsRequest(id, token).then((data) => {
        dispatch({
            type: "SET_CATTLE_INSEMINATION_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getInseminationDetailsAction = (id, token) => (dispatch) => {
    return getInseminationDetailsRequest(id, token).then((data) => {
        dispatch({
            type: "SET_INSEMINATION_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getMorphologicalCurrentDetailsAction = (stellaCode, token) => (dispatch) => {
    return getMorphologicalCurrentRequest(stellaCode, token).then((data) => {
        if (data.length !== 0) {
            dispatch({
                type: "SET_MORPHOLOGICAL_CURRENT_DETAILS",
                payload: data[0]
            });
        } else {
            dispatch({
                type: "SET_MORPHOLOGICAL_CURRENT_DETAILS",
                payload: {}
            });
        }
        console.log("action", data);
    }).catch((error) => {
        console.log(error, "error object");
        throw new Error(error);
    });
};


export const getOrgTypeAction = token => (dispatch) => {
    return getOrgTypeRequest(token).then((data) => {
        dispatch({
            type: "SET_ORG_TYPES",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getAllOrgAction = token => (dispatch) => {
    return getAllOrgRequest(token).then((data) => {
        console.log("getAllOrgRequest",data);
        dispatch({
            type: "SET_OFFLINE_ORG_TYPES",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const searchOrgAction = (searchType, searchString, token) => (dispatch) => {
    if (searchString.length > 2) {
        return searchOrgRequest(searchType, searchString, token).then((data) => {
            dispatch({
                type: "ORG_NAME_LIST",
                payload: data
            });
            return data;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    dispatch({
        type: "ORG_NAME_LIST",
        payload: []
    });
    return [];
};


export const createDryOffAction = (id, payload, token) => (dispatch) => {
    return createDryOffRequest(id, payload, token).then(data => data)
        .catch((error) => {
            throw new Error(error);
        });
};

export const createSaleAction = (id, payload, token) => (dispatch) => {
    return fetchApi(`/api/cattles/${id}/sale`, "POST", 200, payload, token,false,"text").then((data) => {
        console.log("data",data);
        dispatch({
            type: "SET_SALE",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
}

// farm actions

export const getFarmListAction = (token, pageNo = 0, searchString) => (dispatch) => {
    let url = `/api/orgs?size=5&page=${pageNo}`;
    if (searchString) {
        url = `/api/orgs?size=5&page=${pageNo}&q.equals=${searchString}`
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_FARM_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
}

export const getFarmDetailsAction = (token, id) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi(`/api/orgs/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_FARM_DETAILS_ANIMAL_MANAGEMENT",
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
}

export const createFarmAction = (token, payload) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi(`/api/orgs`, "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_FARM_DETAILS_ANIMAL_MANAGEMENT",
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
}

export const updateFarmAction = (token, payload) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi(`/api/orgs`, "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_FARM_DETAILS_ANIMAL_MANAGEMENT",
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
}

export const emptyFarmListAction = () => (dispatch) => dispatch({
    type: "EMPTY_FARM_LIST"
});

export const getNearMeFarmListAction = (token, lat, lng, radius = 0.5, pageNo = 0) => (dispatch) => {
    let url = `/api/orgs/near-me?size=5&page=${pageNo}&lat=${lat}&lng=${lng}&radius=${radius}`
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_FARM_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
}
