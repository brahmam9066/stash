import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";

import styles from "./styles";

const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string,
    isPasswordType: PropTypes.bool,
    editable: PropTypes.bool,
    numberOfLines: PropTypes.number,
    labelStyle: PropTypes.any,
    id: PropTypes.string
};

const defaultProps = {
    mapElement: () => {},
    onSubmitEditing: () => {},
    onChangeText: () => {},
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: "",
    isPasswordType: false,
    editable: true,
    numberOfLines: 1,
    labelStyle: {},
    id: ""
};

class InputText extends Component<{}> {

    state = {
        passwordVisible: false,
        selection: {
            start: 0,
            end: 0
        }
    }

    mapElement = (node) => {
        const {mapElement} = this.props;
        mapElement(node);
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => {
            return {
                passwordVisible: !prevState.passwordVisible,
                selection: {
                    start: this.props.value.length,
                    end: this.props.value.length
                }
            };
        });

        const value = `${this.props.value} `;
        this.props.onChangeText(value);
        setTimeout(() => {
            this.props.onChangeText(value.trim());
        }, 0);
    }

    onChangeText = (value) => {
        this.props.onChangeText(value);
        this.setState({
            selection: {
                start: value.length,
                end: value.length
            }
        });
        console.log(value);
    }

    render() {
        const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing, isPasswordType, editable, numberOfLines, id} = this.props;
        if (isPasswordType) {
            return (
                <View>
                    <Text style={[styles.labelText, this.props.labelStyle]}>{this.props.label}</Text>
                    <View style={[styles.inputComponentStyles]}>
                        <TextInput
                            accessibilityLabel={id}
                            testID={id}
                            style={[styles.inputTextBoxStyle]}
                            editable={editable}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder={placeholder}
                            placeholderTextColor="rgba(0,0,0,0.8)"
                            selectionColor="#999999"
                            secureTextEntry={(isPasswordType && !this.state.passwordVisible) ? secureTextEntry : false}
                            keyboardType={keyboardType}
                            maxLength={maxLength}
                            returnKeyType="next"
                            value={value}
                            numberOfLines={numberOfLines}
                            onSubmitEditing={onSubmitEditing}
                            selection={this.state.selection}
                            onChangeText={this.onChangeText} />
                        <TouchableOpacity style={styles.eyeIconContainer} onPress={this.togglePasswordVisibility}>
                            {(this.state.passwordVisible) ? <Icon name="eye" type="font-awesome" size={24} color="#BBBBBB" />
                                : <Icon name="eye-slash" type="font-awesome" size={24} color="#BBBBBB" />}
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
                <Text style={styles.labelText}>{this.props.label}</Text>
                <View style={[styles.inputComponentStyles]}>
                    <TextInput
                        testID={id}
                        accessibilityLabel={id}
                        style={[styles.inputTextBoxStyle]}
                        editable={editable}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder={placeholder}
                        placeholderTextColor="rgba(0,0,0,0.8)"
                        selectionColor="#999999"
                        secureTextEntry={(isPasswordType && !this.state.passwordVisible) ? secureTextEntry : false}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        returnKeyType="next"
                        value={value}
                        numberOfLines={numberOfLines}
                        onSubmitEditing={onSubmitEditing}
                        onChangeText={onChangeText} />
                </View>
            </View>
        );
    }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;
