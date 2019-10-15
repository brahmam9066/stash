import React, {Component} from "react";
import {Text, View} from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const propTypes = {
    sl: PropTypes.any,
    medicine: PropTypes.string,
    frequency: PropTypes.string,
    duration: PropTypes.string,
    route: PropTypes.string,
    tabStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    flexRowStyle: PropTypes.object
};

const defaultProps = {
    sl: "",
    medicine: "",
    frequency: "",
    duration: "",
    route: "",
    tabStyle: {},
    labelStyle: {},
    flexRowStyle: {}
};

class Table extends Component {
    render() {
        return (
            <View style={styles.flexRowStyle}>
                <Text
                    style={[this.props.tabStyle, this.props.labelStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail">{this.props.sl}
                </Text>
                <Text
                    style={[this.props.tabStyle, this.props.labelStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail">{this.props.medicine}
                </Text>
                <Text
                    style={[this.props.tabStyle, this.props.labelStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail">{this.props.frequency}
                </Text>
                <Text
                    style={[this.props.tabStyle, this.props.labelStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail">{this.props.duration}
                </Text>
                <Text
                    style={[this.props.tabStyle, this.props.labelStyle]}
                    numberOfLines={1}
                    ellipsizeMode="tail">{this.props.route}
                </Text>
            </View>

        );
    }
}


Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

export default Table;
