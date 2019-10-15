import React, {Component} from "react";
import PropTypes from "prop-types";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";


import styles from "./styles";

const propTypes = {
    errorText: PropTypes.string
};

const defaultProps = {
    errorText: ""
};

class PageLoadError extends Component {

    render() {
        return (
            <View style={styles.pageLoadContainer}>
                <Text style={styles.textStyle}>{this.props.errorText}</Text>
                <View style={styles.iconViewStyle}>
                    <Icon
                        name="exclamation-triangle"
                        type="font-awesome"
                        color="#B92D00"
                        size={20}
                    />
                </View>
            </View>
        );
    }
}

PageLoadError.defaultProps = defaultProps;

PageLoadError.propTypes = propTypes;


export default PageLoadError;
