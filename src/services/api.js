import Config from "react-native-config";
import {NetInfo} from "react-native";
import {persist} from "../../App";


const api = async (url, method, reqBody = null, headers = {}, loader = false) => {
    try {
        const URL = Config.BASE_URL.concat(url);
        const body = reqBody && JSON.stringify(reqBody);

        const fetchParams = {method, headers};

        if ((method === "POST" || method === "PUT") && !body) {
            throw new Error("Request body required");
        }

        if (body && method !== "GET") {
            fetchParams.body = body;
            fetchParams.headers["Content-Type"] = "application/json";
        }
        console.log(URL, fetchParams);
        const fetchPromise = fetch(URL, fetchParams);
        const timerPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("Request timeout");
            }, 5000);
        });

        const isConnected = await NetInfo.isConnected.fetch();

        if (isConnected) {
            const response = await Promise.race([fetchPromise, timerPromise]);
            return response;
        }

        // const latLong = await _fetchCurrentPosition();
        // console.log(latLong);

       // throw new Error("No Internet Connection");
    } catch (err) {
        throw new Error(err);
    }
};

export const fetchApi = async (url, method, statusCode, payload = null, token = null, loader = false, promiseReturnType = "json") => {
    try {
        const headers = {};
        if (token) headers.Authorization = token;
        const response = await api(url, method, payload, headers, loader);
        console.log(response);
        if (response.status === statusCode) {
            let responseBody = "";
            if (promiseReturnType === "json") {
                responseBody = await response.json();
                console.log("JSON Response", responseBody);
            } else if (promiseReturnType === "text") {
                responseBody = await response.text();
                console.log("TEXT Response", responseBody);
            }
            return responseBody;
        }
        const errorBody = await response.text();
        throw new Error(errorBody);
    } catch (e) {
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
        if(payload._id  && message.entityName == "dehorning"){
            payload.error = message.title
            persist.store.dispatch({
                type: "UPDATE_DEHORNING_OFFLINE_LIST",
                payload: payload
            });
        }
        else if(payload._id  && message.entityName == "deworming"){
            payload.error = message.title
            persist.store.dispatch({
                type: "UPDATE_DEWORMING_OFFLINE_LIST",
                payload: payload
            });
        }
        else if(payload._id  && message.entityName == "cattle"){
            payload.error = message.title
            persist.store.dispatch({
                type: "UPDATE_VACCINATION_OFFLINE_LIST",
                payload: payload
            });
        }
        //else{
        //     persist.store.dispatch({
        //         type: "SERVER_ERROR",
        //         isServerError: true,
        //         payload: message
        //     });
        // }
        persist.store.dispatch({
            type: "SERVER_ERROR",
            isServerError: true,
            payload: message
        });

        throw new Error(e);
    }
};

export default api;
