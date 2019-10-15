import React, {Component} from "react";
import PropTypes from "prop-types";
import {TimePickerAndroid, View, Text, TextInput, Image, TouchableOpacity} from "react-native";
import moment from "moment";
import {CalendarIcons} from "../../assets";

import styles from "./styles";

const propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string,
    returnKeyType: PropTypes.string,
    style: PropTypes.object,
    onChangeTime: PropTypes.func,
    onChangeText: PropTypes.func,
    id: PropTypes.string,
    timePickerButtonId: PropTypes.string
};

const defaultProps = {
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    returnKeyType: "next",
    label: "Label",
    style: {},
    onChangeTime: () => { },
    onChangeText: () => { },
    id: "",
    timePickerButtonId: ""
};

class TimePicker extends Component {

    mapElement = (node) => {
        this.timePicker = node;
    }

    OpenTimePicker = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                is24Hour: false // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                this.props.onChangeTime(moment(`${hour }:${minute}`, "hh:mm").format("hh:mm A"));
            }
        } catch ({code, message}) {
            console.warn("Cannot open time picker", message);
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <TouchableOpacity
                    accessibilityLabel={this.props.timePickerButtonId}
                    testID={this.props.timePickerButtonId}
                    onPress={this.props.disabled ? null : this.OpenTimePicker}>
                    <View>
                        <Text style={styles.labelText}>{this.props.label}</Text>
                        <TextInput
                            accessibilityLabel={this.props.id}
                            testID={this.props.id}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholderTextColor="rgba(51, 51, 51, 0.6)"
                            selectionColor="rgb(51, 51, 51)"
                            style={styles.inputComponentStyles}
                            ref={this.mapElement}
                            returnKeyType={this.props.returnKeyType}
                            placeholder={this.props.placeholder}
                            secureTextEntry={this.props.secureTextEntry}
                            keyboardType={this.props.keyboardType}
                            maxLength={this.props.maxLength}
                            value={this.props.value}
                            onChangeText={this.props.onChangeText} />
                        <View style={styles.timeOverlay} />
                    </View>
                    {/* <View style={styles.calendarIconContainer}>
                        <Image style={styles.calendarIconStyle} source={CalendarIcons.iconCalendar} />
                    </View> */}
                </TouchableOpacity>
            </View>
        );
    }
}

TimePicker.defaultProps = defaultProps;

TimePicker.propTypes = propTypes;

export default TimePicker;
