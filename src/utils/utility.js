import {Dimensions, PixelRatio, Alert, PermissionsAndroid} from "react-native";
import {Actions} from "react-native-router-flux";

export const redirectTo = (scene) => {
    try {
        if (Actions.currentScene) Actions.reset(scene);
    } catch (e) {
        console.log(e.message);
    }
};

export const navigateTo = (scene, props = null) => {
    try {
        if (props) {
            Actions.push(scene, props);
        } else {
            Actions[scene].call();
        }
    } catch (e) {
        console.log(e.message);
    }
};

export const navigateBack = (scene = null) => {
    try {
        if (scene && typeof scene === "string") {
            Actions.popTo(scene);
        } else {
            Actions.pop();
        }
    } catch (e) {
        console.log(e);
    }
};

export const arrayChunking = (num, arr) => {
    const newArr = [];
    let count = 0;
    arr.forEach((el) => {
        if (newArr.length > 0 && count % num !== 0) {
            newArr[newArr.length - 1].push(el);
        } else {
            newArr.push([el]);
        }
        count += 1;
    });
    return newArr;
};

export const dpToPx = dp => (PixelRatio.roundToNearestPixel(parseFloat(dp) * parseFloat(PixelRatio.get())));

export const widthPercentageToDP = (widthPercent) => {
    const screenWidth = Dimensions.get("window").width;
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

export const heightPercentageToDP = (heightPercent) => {
    const screenHeight = Dimensions.get("window").height;
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

export const _fetchCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        try {
            console.log("here");
            navigator.geolocation.getCurrentPosition((position) => {
                if (position && position.coords) {
                    resolve(position);
                    console.log(position);
                } else {
                    reject("sdfsdf");
                }
            }, (error) => {
                reject(error);
                console.log(error);
            },
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000});
        } catch (e) {
            reject(e);
            console.log(e);
        }
    });
};

export async function request_location_runtime_permission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'MooOn Location Permission',
          'message': 'MooOn App needs access to your location ',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("location fetching")
           let x = await _fetchCurrentPosition();
           return x;
         //  console.log("location",x)
        //Alert.alert("Permissions");
      }
      else {
        Alert.alert(
            'MooOn Location Permission',
            'MooOn App needs access to your location ',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => request_location_runtime_permission()},
            ],
            {cancelable: false},
          );
      }
    } catch (err) {
      console.warn(err)
    }
  }

  export const handleCheckInventory = (orgConfiguration, key) => {
    const checkInventory = orgConfiguration.filter(item => (item.configName === key));
    if (checkInventory.length > 0 && checkInventory[0].value === "TRUE") {
        return true;
    }
    return false;
}