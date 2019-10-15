import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View} from "react-native";

import styles from "./styles";

const propTypes = {

};

const defaultProps = {

};

class Notifications extends Component<{}> {

    render() {
        return (
            <View style={styles.notificationPadding}>
                <View style={styles.notificationBarStyle}>
                    <Text style={styles.notificationTextStyle}>Promotion/Notification Banner</Text>
                </View>
            </View>
        );
    }
}

Notifications.defaultProps = defaultProps;

Notifications.propTypes = propTypes;

export default Notifications;
