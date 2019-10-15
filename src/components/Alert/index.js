import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";

import styles from "./styles";

const propTypes = {
    onPressAlert: PropTypes.func,
    alertTitle: PropTypes.any,
    handleRemoveError: PropTypes.func
};

const defaultProps = {
    onPressAlert: () => {},
    alertTitle: "",
    handleRemoveError: () => {}
};

class Alert extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPressAlert} style={styles.alertContainer}>
                    <View style={styles.alertWrapper}>
                        <Icon
                            name="exclamation-triangle"
                            type="font-awesome"
                            color="#ffffff"
                            size={20}
                        />
                        <Text style={styles.textStyle}>{this.props.alertTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

Alert.defaultProps = defaultProps;

Alert.propTypes = propTypes;

export default Alert;
