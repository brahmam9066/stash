import {fetchApi} from "../services/api";
import {getDewormingListRequest, getDewormingDetailsRequest, saveDewormingRequest, updateDewormingRequest} from "../services/health.service";
import {Dimensions} from 'react-native';
const {height} = Dimensions.get("window");

// fetchApi(url, method, statusCode, payload, authtoken, loaderstate, promiseReturnType);

export const createTreatmentAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/treatments", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_TREATMENT_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_OBSERVATION_OFFLINE_LIST",
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

export const updateTreatmentAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/treatments", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_TREATMENT_DETAILS",
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

export const getHealthMetaDataAction = token => (dispatch) => {
    return fetchApi("/api/cattles/healthmetadata", "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_HEALTH_METADATA",
            payload: data
        });
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getTreatmentListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
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
    let url = `/api/treatments?size=${size}&page=${pageNo}&projection=treatmentsDTO&sort=treatmentDate,desc`;
    if (stellaCode) {
        url = `/api/treatments?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=treatmentsDTO&sort=treatmentDate,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_TREATMENT_LIST",
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

export const getTreatmentDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/treatments/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_TREATMENT_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

// export const getMedicineListAction = (token, type) => (dispatch) => {
//     const url = "/api/medicines?medicineType.equals=GENERAL&page=0&size=20&sort=createdDate,desc";
//     return fetchApi(url, "GET", 200, null, token).then((data) => {
//         dispatch({
//             type: "SET_MEDICINE_LIST",
//             payload: data
//         });
//     }).catch((error) => {
//         throw new Error(error);
//     });
// };

// export const getDewormerListAction = token => (dispatch) => {
//     const url = "/api/medicines?medicineType.equals=DEWORMER&page=0&size=20&sort=createdDate,desc";
//     return fetchApi(url, "GET", 200, null, token).then((data) => {
//         dispatch({
//             type: "SET_DEWORMER_LIST",
//             payload: data
//         });
//     }).catch((error) => {
//         throw new Error(error);
//     });
// };

// export const getVaccineListAction = token => (dispatch) => {
//     return fetchApi("/api/medicines?medicineType.equals=VACCINE&page=0&size=10&sort=createdDate,desc", "GET", 200, null, token).then((data) => {
//         dispatch({
//             type: "SET_VACCINE_LIST",
//             payload: data
//         });
//     }).catch((error) => {
//         throw new Error(error);
//     });
// };

export const getOrgConfigAction = token => (dispatch) => {
    return fetchApi("/api/admin/org-configurations", "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_ORG_CONFIG",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const createVaccinationAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/vaccinations", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_VACCINATION_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_VACCINATION_OFFLINE_LIST",
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

export const updateVaccinationAction = (payload, token) => (dispatch) => {
    return fetchApi("/api/vaccinations", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_VACCINATION_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getVaccinationListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
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
        let url = `/api/vaccinations?size=${size}&page=${pageNo}&projection=vaccinationDTO&sort=treatmentDate,desc`;
   if (stellaCode) {
       url = `/api/vaccinations?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=vaccinationsDTO&sort=treatmentDate,desc`;
   }
   return fetchApi(url, "GET", 200, null, token).then((data) => {
       dispatch({
           type: "SET_VACCINATION_LIST",
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

export const getVaccinationDetailstAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/vaccinations/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_VACCINATION_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const createDehorningAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/dehornings/", "POST", 201, payload, token).then((data) => {
        dispatch({
            type: "SET_DEHORNING_DETAILS",
            payload: data
        });
        dispatch({
            type: "REMOVE_DEHORNING_OFFLINE_LIST",
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

export const updateDehorningAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return fetchApi("/api/dehornings/", "PUT", 200, payload, token).then((data) => {
        dispatch({
            type: "SET_DEHORNING_DETAILS",
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

export const getDehorningListAction = (stellaCode, token, pageNo = 0) => (dispatch) => {
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
    let url = `/api/dehornings?size=${size}&page=${pageNo}&projection=dehorningsDTO&sort=treatmentDate,desc`;
    if (stellaCode) {
        url = `/api/dehornings?size=${size}&page=${pageNo}&q.equals=${stellaCode}&projection=dehorningsDTO&sort=treatmentDate,desc`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_DEHORNING_LIST",
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

export const getDehorningDetailsAction = (id, token) => (dispatch) => {
    return fetchApi(`/api/dehornings/${id}`, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_DEHORNING_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getDewormingListAction = (stellcode, token, pageNo = 0) => (dispatch) => {
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    return getDewormingListRequest(stellcode, token, pageNo).then((response) => {
        dispatch({
            type: "SET_DEWORMING_LIST",
            payload: response,
            error: null
        });
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        return response;
    })
        .catch((error) => {
            if(pageNo == 0){
                dispatch({
                    type: "LOADERER",
                    payload: false
                });
            }
            throw new Error(error);
        });
};

export const getDewormingDetailsAction = (id, token) => (dispatch) => {
    return getDewormingDetailsRequest(id, token).then((response) => {
        dispatch({
            type: "SET_DEWORMING_DETAILS",
            payload: response
        });
        return response;
    })
        .catch((error) => {
            throw new Error(error);
        });
};

export const saveDewormingAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return saveDewormingRequest(payload, token).then((response) => {
        dispatch({
            type: "SET_DEWORMING_DETAILS",
            payload: response
        });
        dispatch({
            type: "REMOVE_DEWORMING_OFFLINE_LIST",
            payload: payload._id ? payload._id :""
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return response;
    })
        .catch((error) => {
            dispatch({
                type: "LOADERER",
                payload: false
            });
            throw new Error(error);
        });
};

export const updateDewormingAction = (payload, token) => (dispatch) => {
    dispatch({
        type: "LOADERER",
        payload: true
    });
    return updateDewormingRequest(payload, token).then((response) => {
        dispatch({
            type: "SET_DEWORMING_DETAILS",
            payload: response,
            error: null
        });
        dispatch({
            type: "LOADERER",
            payload: false
        });
        return response;
    })
        .catch((error) => {
            dispatch({
                type: "LOADERER",
                payload: false
            });
            throw new Error(error);
        });
};

export const getMedicineListAction = (token, name) => (dispatch) => {
    let url = `/api/medicines?medicineType.equals=GENERAL&page=0&size=5&sort=createdDate,desc`;
    if(name){
        url = `/api/medicines?medicineType.equals=GENERAL&page=0&size=5&sort=createdDate,desc&q.equals=${name}`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: name ? "SET_MEDICINE_LIST" : "SET_LOOKUPDATE_MEDICINE_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getVaccineListAction = (token, name) => (dispatch) => {
    let url = `/api/medicines?medicineType.equals=VACCINE&page=0&size=5&sort=createdDate,desc`;
    if(name){
        url = `/api/medicines?medicineType.equals=VACCINE&page=0&size=5&sort=createdDate,desc&q.equals=${name}`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: name ? "SET_VACCINE_LIST" : "SET_LOOKUPDATE_VACCINE_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const getDewormerListAction = (token, name) => (dispatch) => {
    let url = `/api/medicines?medicineType.equals=DEWORMER&page=0&size=5&sort=createdDate,desc`;
    if (name) {
        url = `/api/medicines?medicineType.equals=DEWORMER&page=0&size=5&sort=createdDate,desc&q.equals=${name}`;
    }
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: name ? "SET_DEWORMER_LIST" : "SET_LOOKUPDATE_DEWORMER_LIST",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};
