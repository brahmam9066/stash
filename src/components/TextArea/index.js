import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View} from "react-native";


import styles from "./styles";

const propTypes = {
    value: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    label: PropTypes.string,
    editable: PropTypes.bool,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    id: PropTypes.id
};

const defaultProps = {
    value: "",
    maxLength: 200,
    keyboardType: "default",
    label: "",
    editable: true,
    onChangeText: () => {},
    placeholder: "",
    id: ""
};

class InputText extends Component<{}> {

    render() {
        const {keyboardType, maxLength, value, editable, placeholder, onChangeText} = this.props;
        return (
            <View>
                <Text style={styles.labelText}>{this.props.label}</Text>
                <TextInput
                    accessibilityLabel={this.props.id}
                    testID={this.props.id}
                    style={[styles.inputComponentStyles]}
                    editable={editable}
                    underlineColorAndroid="transparent"
                    selectionColor="#999999"
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    returnKeyType="next"
                    value={value}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(0,0,0,0.8)"
                    onChangeText={onChangeText} />
            </View>
        );
    }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;
