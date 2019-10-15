import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View, Picker} from "react-native";
import {Icon} from "react-native-elements";

import styles from "./styles";

const propTypes = {
    label: PropTypes.string,
    selectedValue: PropTypes.string,
    onValueChange: PropTypes.func,
    children: PropTypes.array,
    data: PropTypes.array,
    id: PropTypes.any,
    enabled: PropTypes.bool
};

const defaultProps = {
    label: "",
    selectedValue: "",
    onValueChange: () => {},
    children: [],
    data: [],
    id: "",
    enabled: true
};

class ListPicker extends Component<{}> {

    render() {
        return (
            <View style={styles.listPickerContainer}>
                <Text style={styles.labelText}>{this.props.label}</Text>
                <Picker
                    accessibilityLabel={this.props.id}
                    testID={this.props.id}
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onValueChange}
                    enabled={this.props.enabled}
                    style={styles.listPickerStyle}>
                    {this.props.data.length > 0 ? this.renderPickerItems : this.props.children}
                </Picker>
                <Icon
                    name="angle-down"
                    type="font-awesome"
                    size={28}
                    iconStyle={styles.caretStyle}
                    color="#BBBBBB" />
                <View style={styles.listPickerBorder} />
            </View>
        );
    }
}

ListPicker.defaultProps = defaultProps;

ListPicker.propTypes = propTypes;

export default ListPicker;
