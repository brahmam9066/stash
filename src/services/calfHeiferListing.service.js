import {fetchApi} from "./api";

export const getCalfListing = async (token, pageNo) => {
    return fetchApi(`/api/cattles?projection=CattleListDTO&size=5&page=${pageNo}&breedingState.in=Calf,Heifer&sort=createdDate,desc`, "GET", 200, null, token);
};

export const getCalfListingDetails = (id, token) => {
    return fetchApi(`/api/cattles/${id}`, "GET", 200, null, token);
};
