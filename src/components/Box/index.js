import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";

import styles from "./styles";

const propTypes = {
    text: PropTypes.string,
    textStyle: PropTypes.object,
    boxStyle: PropTypes.any,
    onPress: PropTypes.func,
    count: PropTypes.any,
    countTextStyle: PropTypes.object
};

const defaultProps = {
    text: "",
    textStyle: {},
    boxStyle: {},
    onPress: () => {},
    countTextStyle: {},
    count: []
};

class Box extends Component<{}> {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.boxContainer}>
                    <View style={this.props.boxStyle}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={this.props.textStyle}>{this.props.text}
                        </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={this.props.countTextStyle}>{this.props.count}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

Box.defaultProps = defaultProps;

Box.propTypes = propTypes;

export default Box;
