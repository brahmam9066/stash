import {fetchApi} from "./api";

export const getAnimalListing = async (token, pageNo) => {
    return fetchApi(`/api/cattles?projection=CattleListDTO&page=${pageNo}&size=5&sort=createdDate,desc&breedingState.notIn=Calf,Heifer`, "GET", 200, null, token);
};

export const getAnimalListingDetails = async (token) => {
    return fetchApi("/api/cattles", "GET", 200, null, token);
};
