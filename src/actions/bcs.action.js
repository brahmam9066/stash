import {getBCSList, getBCSEntity, createBCSEntity, updateBCSEntity, deleteBCSEntity} from '../services/bcs.service';
import {BCS_FETCH_ALL, BCS_FETCH_ENTITY, BCS_CREATE_ENTITY, BCS_UPDATE_ENTITY, BCS_DELETE_ENTITY, BCS_RESET} from "./action-types";
import { PENDING, SUCCESS, FAILED } from "../utils/action.utils"

export const getBCSListAction = (token, page, size) => (dispatch) => {
    let getList = null;
    if (page && !size) {
        getList = getBCSList(token, page, null);
    }
    else if (page && size) {
        getList = getBCSList(token, page, size);
    }
    else {
        getList = getBCSList(token, null, null);
    }
    dispatch({
        type: PENDING(BCS_FETCH_ALL)
    });
    getList.then((response) => {
        dispatch({
            type: SUCCESS(BCS_FETCH_ALL),
            payload: response
        });
    })
        .catch((error) => {
            dispatch({
                type: FAILED(BCS_FETCH_ALL),
                error: error
            });
        });
}

export const getBCSEntityAction = (token, id) => (dispatch) => {
    dispatch({
        type: PENDING(BCS_FETCH_ENTITY)
    });
    getBCSEntity(token, id).then((response) => {
        console.log(response);
        dispatch({
            type: SUCCESS(BCS_FETCH_ENTITY),
            payload: response
        });
    })
        .catch((error) => {
            dispatch({
                type: FAILED(BCS_FETCH_ENTITY),
                error: error
            });
        })
}

export const createBCSEntityAction = (token, data) => (dispatch) => {
    dispatch({
        type: PENDING(BCS_CREATE_ENTITY)
    });
    createBCSEntity(token, data).then((response) => {
        console.log(response);
        dispatch({
            type: SUCCESS(BCS_CREATE_ENTITY),
            payload: response
        });
    })
        .catch((error) => {
            dispatch({
                type: FAILED(BCS_CREATE_ENTITY),
                error: error
            });
        })
}

export const updateBCSEntityAction = (token, data) => (dispatch) => {
    dispatch({
        type: PENDING(BCS_UPDATE_ENTITY)
    });
    updateBCSEntity(token, data).then((response) => {
        console.log(response);
        dispatch({
            type: SUCCESS(BCS_UPDATE_ENTITY),
            payload: response
        });
    })
        .catch((error) => {
            dispatch({
                type: FAILED(BCS_UPDATE_ENTITY),
                error: error
            });
        })
}

export const deleteBCSEntityAction = (token, id) => (dispatch) => {
    dispatch({
        type: PENDING(BCS_DELETE_ENTITY)
    });
    deleteBCSEntity(token, id).then((response) => {
        console.log(response);
        dispatch({
            type: SUCCESS(BCS_DELETE_ENTITY)
        });
    })
        .catch((error) => {
            dispatch({
                type: FAILED(BCS_DELETE_ENTITY),
                error: error
            });
        })
}

export const resetBCSAction = () => (dispatch) => {
    dispatch({
        type: BCS_RESET
    });
}
