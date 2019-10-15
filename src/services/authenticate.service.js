import api, {fetchApi} from "./api";
import {persist} from "../../App";

// fetchApi(url, method, statusCode, payload, authtoken, loaderstate, responseBodyType);

const dispatchError = (e) => {
    let message = {};
    if (!e.message.includes("status")) {
        message = {
            status: 408,
            title: e.message
        };
    } else {
        console.log("Error Details", JSON.parse(e.message));
        message = JSON.parse(e.message);
    }
    persist.store.dispatch({
        type: "SERVER_ERROR",
        isServerError: true,
        payload: message
    });
};

const generateOtp = async (payload, callback) => {
    try {
        const response = await api("/api/register/generate-otp", "POST", payload);
        console.log(response);
        if (response.status === 200) {
            const resBody = await response.text();
            console.log(resBody);
            callback(resBody, payload);
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e);
        console.log(e);
    }


};

export const userLoginRequest = async (userCredentials, callback) => {
    try {
        const reqBody = {
            username: userCredentials.username,
            password: userCredentials.password
        };
        const response = await api("/api/authenticate", "POST", reqBody);
        console.log(response);
        if (response.status === 200) {
            const responseBody = await response.json();
            if (responseBody && responseBody.id_token) {
                const data = {
                    username: userCredentials.username,
                    token: `Bearer ${responseBody.id_token}`
                };
                callback(data);
            } else {
                throw new Error("User not logged in");
            }
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e);
        console.log(e);
    }
};

export const userLoginWithGoogleRequest = async (accessToken, callback) => {
    try {
        const response = await api(`/api/auth/google?code=${accessToken}`, "GET");
        console.log(response);
        if (response.status === 200) {
            const responseBody = await response.json();
            if (responseBody && responseBody.id_token) {
                console.log(responseBody.id_token);
                const data = {
                    token: `Bearer ${responseBody.id_token}`
                };
                callback(data);
            } else {
                throw new Error("User not logged in");
            }
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};

export const registerUser = async (payload, callback) => {
    try {
        const body = {
            login: payload.username,
            password: payload.password
        };
        const response = await api("/api/register", "POST", body);
        console.log(response);
        if (response.status === 201) {
            const userCredentials = {
                username: body.login,
                password: body.password
            };
            userLoginRequest(userCredentials, callback);
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};

const generateForgotPasswordOtp = async (payload, callback) => {
    try {
        const response = await api("/api/account/reset-password/init", "POST", payload);
        console.log(response);
        if (response.status === 200) {
            const resBody = await response.text();
            console.log(resBody);
            callback(resBody, payload);
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};

export const checkUserExist = async (payload, callback) => {
    try {
        const response = await api(`/api/register/check-account-exists?login=${payload}`, "GET");
        console.log(response);
        if (response.status === 200) {
            const resBody = await response.json();
            if (!resBody) {
                generateOtp(payload, callback);
            } else {
                generateForgotPasswordOtp(payload, callback);
            }
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};

export const verifyOtpRequest = async ({otp, username}, callback) => {
    try {
        const response = await api(`/api/register/validate-otp?otp=${otp}&username=${username}`, "GET");
        console.log(response);
        if (response.status === 200) {
            callback({otp, username});
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};

export const verifyForgotPasswordOtpRequest = async ({otp, username}, callback) => {
    try {
        const response = await api(`/api/account/reset-password/validate-otp?otp=${otp}&username=${username}`, "GET");
        console.log(response);
        if (response.status === 200) {
            callback({otp, username});
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};

export const resetPasswordRequest = async ({key, newPassword}, callback) => {
    try {
        const reqBody = {
            key,
            newPassword
        };
        const response = await api("/api/account/reset-password/finish", "POST", reqBody);
        console.log(response);
        if (response.status === 200) {
            callback();
        } else {
            const errorBody = await response.text();
            throw new Error(errorBody);
        }
    } catch (e) {
        dispatchError(e.message);
        console.log(e);
    }
};
