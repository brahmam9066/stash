import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";

import styles from "./styles";

const propTypes = {
    iconUsermooOn: PropTypes.any,
    text: PropTypes.string,
    textStyle: PropTypes.object,
    boxImageStyle: PropTypes.object,
    boxStyle: PropTypes.any,
    ImageStyle: PropTypes.object,
    onPress: PropTypes.func
};

const defaultProps = {
    iconUsermooOn: "",
    text: "",
    textStyle: {},
    boxImageStyle: {},
    boxStyle: [],
    ImageStyle: {},
    onPress: () => {}
};

class Filter extends Component<{}> {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.boxContainer}>
                    <View style={this.props.boxStyle}>
                        <View style={this.props.boxImageStyle}>
                            <Image source={this.props.iconUsermooOn} style={this.props.ImageStyle} />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={this.props.textStyle}>{this.props.text}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

Filter.defaultProps = defaultProps;

Filter.propTypes = propTypes;

export default Filter;
