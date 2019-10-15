import {SIMPLE_PRESCRIPTION_MEDICINE_CHANGE_DEWORMING, SIMPLE_PRESCRIPTION_MEDICINE_CHANGE_DEHORNING} from "./action-types";

export const medicineChangeDeworming = medicine => dispatch => dispatch({
    type: SIMPLE_PRESCRIPTION_MEDICINE_CHANGE_DEWORMING,
    payload: medicine
});

export const medicineChangeDehorning = medicine => dispatch => dispatch({
    type: SIMPLE_PRESCRIPTION_MEDICINE_CHANGE_DEHORNING,
    payload: medicine
});
