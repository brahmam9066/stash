import {Dimensions} from 'react-native';
const {height} = Dimensions.get("window");

import {fetchApi} from "./api";

export const getDewormingListRequest = async (stellaCode, token, pageNo, sort) => {
    let size = 5;
    if(height < 700){        
        size = 5;
    } 
    if(height > 700){          
        size = 10;
    }
    let url = `/api/dewormings?size=${size}&page=${pageNo}&projection=dewormingsDTO&sort=treatmentDate,desc`;
    if (stellaCode) {
        url += `&q.equals=${stellaCode}`;
    }
    if (sort) {
        url += `&sort=${sort}`;
    }
    return fetchApi(url, "GET", 200, null, token);
};

export const getDewormingDetailsRequest = async (id, token) => {
    return fetchApi(`/api/dewormings/${id}`, "GET", 200, null, token);
};

export const saveDewormingRequest = async (payload, token) => {
    return fetchApi("/api/dewormings", "POST", 201, payload, token);
};

export const updateDewormingRequest = async (payload, token) => {
    return fetchApi("/api/dewormings", "PUT", 200, payload, token);
};
