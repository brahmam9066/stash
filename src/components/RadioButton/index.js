import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";

import styles from "./styles";

const propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string
};

const defaultProps = {
    value: "",
    label: "",
    name: "",
    onPress: () => {},
    id: ""
};

class RadioButton extends Component<{}> {

    render() {
        return (
            <View style={styles.radioButtonCont}>
                <TouchableOpacity onPress={this.props.onPress}
                    accessibilityLabel={this.props.id}
                    testID={this.props.id}>
                    <Icon
                        name={this.props.value === this.props.name ? "radiobox-marked" : "radiobox-blank"}
                        type="material-community"
                        color="#ed1c24"
                        size={28}
                    />
                </TouchableOpacity>
                <Text style={styles.termsPolicyTextStyle}>{this.props.label}</Text>
            </View>
        );
    }
}

RadioButton.defaultProps = defaultProps;

RadioButton.propTypes = propTypes;

export default RadioButton;
