import Config from "react-native-config";
import {fetchApi} from "../services/api";
import {Alert} from "react-native";

futch = (url, opts = {}, onProgress) => {
    console.log(url, opts)
    return new Promise((res, rej) => {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers || {})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
    });
}

uploadImageFetch = (url, opts) => {
    console.log(opts.onProgress)
    if (opts.onProgress && typeof opts.onProgress === 'function') {
        return futch(url, opts, opts.onProgress)
    } 
    return null;
}

makeName = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

export const uploadImagesAction = (token, image, dataObject, extraData, progressFunc, index = 0) => (dispatch) => {
    const data = new FormData();
    data.append('name', makeName(20));
    data.append('file', {
        uri: image.source.uri,
        type: image.type,
        name: image.fileName
    });
    data.append("objectClass", extraData.objectClass);
    data.append("objectId", dataObject.cattle.id);
    data.append("isPrimary", extraData.isPrimary);
    data.append("dependentObjectClass", extraData.dependentObjectClass);
    data.append("dependentObjectId", dataObject.id);

    uploadImageFetch(Config.BASE_URL + '/api/documents', {
        method: 'post',
        headers: {
            "Authorization": token
        },
        body: data,
        onProgress: (e) => {
            const progress = e.loaded / e.total;
            console.log(progress);
            progressFunc(progress, index);
        }
    })
    .then((data) => {
        console.log("data", data);
        dispatch({type: "MULTIPLE_IMAGE_UPLOAD_ACTION"});
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
}

export const uploadSingleImageAction = (token, image, dataObject, extraData, progressFunc) => (dispatch) => {
    const data = new FormData();
    data.append('name', image.fileName);
    data.append('file', {
        uri: image.source.uri,
        type: image.type,
        name: image.fileName
    });
    data.append("objectClass", extraData.objectClass);
    data.append("objectId", dataObject.cattle.id ? dataObject.cattle.id : dataObject.cattle);
    data.append("isPrimary", extraData.isPrimary);
    data.append("dependentObjectClass", extraData.dependentObjectClass);
    data.append("dependentObjectId", dataObject.id);
    return uploadImageFetch(Config.BASE_URL + '/api/documents', {
        method: 'post',
        headers: {
            "Authorization": token
        },
        body: data,
        onProgress: (e) => {
            const progress = e.loaded / e.total;
            console.log(progress);
            progressFunc(progress);
        }
    })
    .then((data) => {
        const response = JSON.parse(data.response);
        console.log(response);
        if(response.status === 500){
            Alert.alert(
                response.message,
                response.detail,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false},
              );
        }
        dispatch({type: "SINGLE_IMAGE_UPLOAD_ACTION"});
        return response;
    }).catch((error) => {
        console.log(error);
    });
}

export const getImagesForRecordAction = (token, id, className) => (dispatch) => {
    let url = `/api/documents?dependentObjectId.contains=${id}&dependentObjectClass.contains=${className}`;
    return fetchApi(url, "GET", 200, null, token).then((data) => {
        dispatch({
            type: "SET_IMAGE_OBJECTS",
            payload: data.length > 0 ? [data[0]] : []
        });
        return data;
    }).catch((error) => {
        throw new Error(error);
    });
};

export const resetImagesForRecordAction = () => (dispatch) => dispatch({type: "RESET_IMAGE_OBJECTS"});

// export const getImagesAction = (token, id) => (dispatch) => {
//     let url = `/api/documents/${id}`;
//     return fetchApi(url, "GET", 200, null, token).then((data) => {
//         dispatch({
//             type: "SET_IMAGES",
//             payload: data
//         });
//         return data;
//     }).catch((error) => {
//         throw new Error(error);
//     });
// };

// export const ResetImagesAction = () => (dispatch) => dispatch({type: "RESET_IMAGES"});