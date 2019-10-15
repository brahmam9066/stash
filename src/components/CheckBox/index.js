import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";

import styles from "./styles";

const propTypes = {
    checked: PropTypes.bool,
    title: PropTypes.string,
    onPress: PropTypes.func,
    id: PropTypes.string
};

const defaultProps = {
    checked: false,
    title: "",
    onPress: () => {},
    id: ""
};

class CheckBox extends Component<{}> {

    render() {
        return (
            <View>
                <TouchableOpacity accessibilityLabel={this.props.id} testID={this.props.id} onPress={this.props.onPress} style={styles.checkboxCont}>
                    <Icon
                        name={this.props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
                        type="material-community"
                        color="#ed1c24"
                    />
                    <Text style={styles.termsPolicyTextStyle}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

CheckBox.defaultProps = defaultProps;

CheckBox.propTypes = propTypes;

export default CheckBox;
