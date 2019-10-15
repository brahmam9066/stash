import React, {Component} from "react";
import {Text} from "react-native";
import PropTypes from "prop-types";

const propTypes = {
    text: PropTypes.string,
    value: PropTypes.any,
    textStyle: PropTypes.object,
    labelStyle: PropTypes.object
};

const defaultProps = {
    text: "",
    value: "",
    textStyle: {},
    labelStyle: {}
};

class SubText extends Component {
    render() {
        return (
            <Text
                style={this.props.textStyle}
                numberOfLines={1}
                ellipsizeMode="tail"><Text style={this.props.labelStyle}>{this.props.text} : </Text>{this.props.value}
            </Text>
        );
    }
}


SubText.propTypes = propTypes;

SubText.defaultProps = defaultProps;

export default SubText;
