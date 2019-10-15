import Config from "react-native-config";
import {persist} from "../../App";

export const isPaidUser = () => {
    let state = null;
    let isPaid = false;
    if (persist) {
        state = persist.store.getState();
        if (state && state.farmAdminReducer.farmDetails && state.farmAdminReducer.farmDetails.effectiveSubscriptionPlan && state.farmAdminReducer.farmDetails.effectiveSubscriptionPlan === "paid") {
            isPaid = true;
        }
    }
    if (Config.APP_TYPE === "corporate") {
        isPaid = true;
    }
    return isPaid;
};

export const checkUserRoles = (roles) => {}

export const APP_ID = "sfgnskfjgbksjbgksjf";
