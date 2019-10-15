import PropTypes from "prop-types";
import React, {Component} from "react";
import {TextInput, Text, View, TouchableOpacity} from "react-native";

import styles from "./styles";

const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string,
    isPasswordType: PropTypes.bool,
    editable: PropTypes.bool,
    numberOfLines: PropTypes.number,
    dataList: PropTypes.array,
    onPressListItem: PropTypes.func,
    id: PropTypes.string,
    pickerItemId: PropTypes.string,
    labelText: PropTypes.object,
    listLabelKey: PropTypes.string
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
    dataList: [],
    onPressListItem: () => {},
    id: "",
    pickerItemId: "",
    labelText: {},
    listLabelKey: "name"
};

class AutoComplete extends Component<{}> {

    mapElement = (node) => {
        const {mapElement} = this.props;
        mapElement(node);
    }

    renderAutoSelectList = () => {
        const {dataList} = this.props;
        return dataList.map((item, index) => {
            return (
                <TouchableOpacity
                    accessibilityLabel={`${this.props.pickerItemId}-index`}
                    testID={`${this.props.pickerItemId}-index`}
                    key={index}
                    style={styles.listItemCont}
                    onPress={() => this.props.onPressListItem(item)}>
                    <Text>{item[this.props.listLabelKey]}</Text>
                </TouchableOpacity>
            );
        });
    }

    render() {
        const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing, isPasswordType, editable, numberOfLines, id, onBlur} = this.props;
        return (
            <View>
                <Text style={[styles.labelText, this.props.labelText]}>{this.props.label}</Text>
                <TextInput
                    accessibilityLabel={id}
                    testID={id}
                    style={[styles.inputComponentStyles]}
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
                    onChangeText={onChangeText}/>
                <View style={styles.autocompleteListContainer}>
                    {this.renderAutoSelectList()}
                </View>
            </View>
        );
    }
}

AutoComplete.defaultProps = defaultProps;

AutoComplete.propTypes = propTypes;

export default AutoComplete;
