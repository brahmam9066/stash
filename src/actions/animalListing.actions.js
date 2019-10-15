import {getAnimalListing} from "../services/animalListing.service";


export const getAnimalListingAction = (token, pageNo = 0) => (dispatch) => {
    if(pageNo == 0){
        dispatch({
            type: "LOADERER",
            payload: true
        });
    }
    return getAnimalListing(token, pageNo).then((payload) => {
        dispatch({type: "SET_ANIMAL_LIST", payload});
        console.log(payload);
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        return payload;
    }).catch((error) => {
        if(pageNo == 0){
            dispatch({
                type: "LOADERER",
                payload: false
            });
        }
        dispatch({type: "SET_ANIMAL_LIST", payload: {}});
        throw new Error(error);
    });
};


export const getAnimalListingDetailsAction = token => (dispatch) => {
    return getAnimalListing(token).then((payload) => {
        dispatch({type: "SET_USER_DETAILS", payload});
        return payload;
    }).catch((error) => {
        dispatch({type: "SET_USER_DETAILS", payload: {}});
        throw new Error(error);
    });
};
