import React, {Component} from "react";
import {View, Image} from "react-native";

import {loadingIcons} from "../../assets";
import styles from "./style";

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.flex1}>
                <Image
                    style={styles.loadingImage}
                    source={require("../../assets/loading.gif")}
                />
            </View>
        );
    }
}
