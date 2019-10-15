import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

const propTypes = {
    heading: PropTypes.string,
    eventText: PropTypes.string,
    titleStyle: PropTypes.object,
    subTitleStyle: PropTypes.object,
    eventTextStyle: PropTypes.any,
    onPressEvent: PropTypes.func
};

const defaultProps = {
    heading: "",
    eventText: "",
    titleStyle: {},
    subTitleStyle: {},
    eventTextStyle: {},
    onPressEvent: () => {}
};

class SubTitle extends Component {

    render() {
        return (
            <View style={this.props.subTitleStyle}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={this.props.titleStyle}>{this.props.heading}
                </Text>
                <TouchableOpacity onPress={this.props.onPressEvent}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={this.props.eventTextStyle}>{this.props.eventText}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


SubTitle.propTypes = propTypes;

SubTitle.defaultProps = defaultProps;

export default SubTitle;
