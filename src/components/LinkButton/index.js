import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, TouchableOpacity} from "react-native";

import styles from "./styles";

const propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    textStyle: PropTypes.object,
    id: PropTypes.string
};

const defaultProps = {
    title: "",
    onPress: () => {},
    textStyle: {},
    id: ""
};

class LinkButton extends Component<{}> {

    render() {
        return (
            <TouchableOpacity accessibilityLabel={this.props.id} testID={this.props.id} onPress={this.props.onPress} style={styles.linkButtonCont}>
                <Text style={[styles.linkButtonTextStyle, this.props.textStyle]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

LinkButton.defaultProps = defaultProps;

LinkButton.propTypes = propTypes;

export default LinkButton;
