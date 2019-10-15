import {getCalfListing, getCalfListingDetails} from "../services/calfHeiferListing.service";


export const getCalfListingAction = (token, pageNo = 0) => (dispatch) => {
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    return getCalfListing(token, pageNo).then((payload) => {
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        dispatch({type: "SET_CALF_LIST", payload});
        console.log(payload);
        return payload;
    }).catch((error) => {
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        dispatch({type: "SET_CALF_LIST", payload: {}});
        throw new Error(error);
    });
};


export const getCalfListingDetailsAction = (id, token) => (dispatch) => {
    return getCalfListingDetails(id, token).then((data) => {
        dispatch({type: "SET_CALF_DETAILS",
            payload: data
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};
